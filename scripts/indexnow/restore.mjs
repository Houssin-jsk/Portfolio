// Restore the newest durable pending/final journal from this workflow only.
import { mkdir, writeFile, unlink } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { indexNowConfig as config } from '../../config/indexnow.mjs';
import { latestJournal } from './core.mjs';

const directory = '.indexnow';
async function api(path, binary = false) {
  const response = await fetch(`https://api.github.com/repos/${config.repository}/${path}`, {
    headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, Accept: 'application/vnd.github+json' },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error('Journal retrieval failed.');
  return binary ? Buffer.from(await response.arrayBuffer()) : response.json();
}
try {
  if (!process.env.GITHUB_TOKEN || process.env.GITHUB_REPOSITORY !== config.repository) throw new Error('Invalid workflow context.');
  await mkdir(directory, { recursive: true });
  const workflow = await api('actions/workflows/indexnow.yml');
  // Vercel deployments use a SHA ref, so deployment_status runs need not have
  // head_branch literally "main". The workflow and planner enforce main's SHA.
  const runs = await api(`actions/workflows/${workflow.id}/runs?per_page=30`);
  const artifacts = [];
  for (const run of runs.workflow_runs) {
    // Include prior attempts of the current run: a rerun must retain its receipts.
    if (!['deployment_status', 'workflow_dispatch'].includes(run.event) || run.head_repository?.full_name !== config.repository) continue;
    const list = await api(`actions/runs/${run.id}/artifacts?per_page=100`);
    artifacts.push(...list.artifacts.map(item => ({ ...item, runId: run.id })));
  }
  const artifact = latestJournal(artifacts);
  if (!artifact) { console.log('IndexNow: no retained journal; next phase will baseline without notifying.'); }
  else {
    const archive = `${directory}/journal.zip`;
    await writeFile(archive, await api(`actions/artifacts/${artifact.id}/zip`, true), { mode: 0o600 });
    const state = JSON.parse(execFileSync('unzip', ['-p', archive, 'state.json'], { maxBuffer: 2000000, encoding: 'utf8' }));
    if (state.schema !== 1 || state.origin !== config.origin || !state.initialized) throw new Error('Invalid journal.');
    await writeFile(`${directory}/state.json`, JSON.stringify(state), { mode: 0o600 });
    await unlink(archive);
    console.log('IndexNow: notification journal restored.');
  }
} catch {
  console.error('IndexNow journal could not be safely restored; submission aborted.'); process.exitCode = 1;
}
