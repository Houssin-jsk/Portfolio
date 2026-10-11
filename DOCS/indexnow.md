# IndexNow after successful production deployment

## What was inspected

This project deploys `Houssin-jsk/Portfolio` main through Vercel's Git integration.
There was no existing Actions workflow. GitHub's deployments API showed successful
events from `vercel[bot]` with environment exactly `Production`, including the
latest deployed commit. Vercel currently reports `production_environment: false`
even for those records, so that boolean is not used as the production gate.
The existing root text verification file is discovered and validated without
printing its filename, value, key URL, request body, or provider response body.
No new verification key or app endpoint is created.

## How automatic notification works

`.github/workflows/indexnow.yml` runs for successful Vercel Production events,
and offers a manual Actions dispatch using the same journal. It never runs on
push, build, pull-request, preview, pending, failed, or cancelled deployment events.
The script independently rechecks GitHub: latest production deployment, latest
main commit, successful Vercel status, expected project host, and matching checkout.
Stale/out-of-order events fail closed. No Vercel token is needed.

It reads the production canonical sitemap and robots file, then fetches the live
pages with bounded timeouts and sizes. Candidates must return 200 HTML, belong to
the canonical HTTPS www origin, declare that same canonical, allow robots, and
have no meta/header noindex. URLs with queries/fragments are rejected. Currently
only the homepage qualifies; design-preview and About remain excluded.

Meaningful change detection uses visible body text, title/description/Open Graph
text, links, image URLs/alt text, and same-host `/images/` file bytes. It ignores
Next.js build IDs, RSC payloads, CSS classes/styles, decorative SVG, and whitespace.
Script-only/style-only changes do not notify. Script-based tools should expose
their indexable content on the server, or deliberately extend the fingerprint
policy when they are released. The current single `urlset` sitemap is supported;
sitemap indexes need explicit support before use.

The first run creates a baseline with **no submission**. Later new or changed
eligible pages are POSTed to `https://api.indexnow.org/indexnow`. The existing
verification file is checked on the public domain before planning and submission.
The submitted host, keyLocation, key, and urlList follow the
[official protocol](https://www.indexnow.org/documentation).

## Journal and duplicate prevention

Runs are serialized with a single concurrency group. Only URL fingerprints,
deployment identifiers, and receipts are stored, never key material. A pending
journal artifact is uploaded **before** the POST; a separate final artifact is
saved afterwards, including on a failed submission. The next run restores the
newest journal from this workflow's production-gated runs, not unrelated workflows.
Vercel uses SHA deployment refs, so restoration does not assume the workflow run's
branch field literally says main; the planner verifies the actual main commit.
Duplicate webhook delivery, redeploying unchanged content, and rerunning the job
therefore do not repeatedly submit the same fingerprint.

HTTP 200 is accepted; 202 means received with provider key validation pending.
400/403/422/429/5xx cause a failed job with a safe status summary. Raw provider
bodies are never logged. There are no automatic network retries: a lost response
cannot prove whether the provider accepted it. Pending fingerprints suppress
repeat attempts until an operator reviews the failure. This favors duplicate
prevention over blind retry; it is not an exactly-once delivery guarantee.
For a known pre-submission/configuration failure, review the journal and restore
the previous fingerprint before an intentional retry. For timeout/5xx ambiguity,
first establish whether the notification was accepted. Do not simply delete
artifacts to retry; deleting/expiring history leads to a fresh non-submitting baseline.

Artifacts are retained for 90 days (subject to repository policy), and restoration
searches the latest 30 workflow runs. If no journal is retained, the script
baselines without notifying. This prevents repeated full-site submissions but
may skip that first update after history loss; investigate and preserve the last
known journal if reliable notification across a long inactive period is needed.

## Required configuration and activation

- Commit the workflow/scripts/tests/config together on main. GitHub Actions must
  be enabled and allow the pinned official checkout/setup-node/upload-artifact
  actions and artifact uploads. Permissions are contents:read and actions:read.
- The built-in `GITHUB_TOKEN` is scoped only to deployment checks and journal
  retrieval. No new secret is required and no token/key enters client JavaScript.
- `config/indexnow.mjs` holds the verified repository, branch, Production label,
  Vercel project host pattern, canonical origin (from SEO config), and official API.
  Update these explicitly if the deployment setup changes.
- After the next successful production deployment, confirm an actual Actions run
  completes, baseline artifacts exist, and logs say no notification for baseline.
  A later real public content change should report changed URLs and HTTP 200/202.
  An Actions workflow existing in source does not prove automation is active.

## Safe manual commands

Requires Node 24 (or a compatible Node with native TypeScript stripping), network
access to GitHub/canonical site, the existing verification file, and a writable
local `.indexnow/` directory. The scripts perform the same production verification.

```powershell
npm run indexnow:dry-run
npm run indexnow:submit
```

Dry-run does not POST or alter the journal. First manual submission baselines,
subsequent commands notify only actual live content changes. Keep the ignored
`.indexnow/` directory between runs. A lock prevents concurrent local processes.
If a process was killed, review any pending plan before removing its stale lock.
Do not mix independent local/manual state with active CI: use Actions "Run
workflow" instead so retries share the CI journal. The local command is the
fallback if Actions cannot be configured or verified, not a second notification
channel to run alongside it.

## Verification and limits

`npm run test:indexnow` tests URL/robots eligibility, noindex/canonical rejection,
stable fingerprints, meaningful changes, baseline/deduplication, production-event
gates, HTTP handling, uncertainty, and error redaction using mock provider requests.
`npm run indexnow:dry-run` checks the real successful deployment and verification
file without a live IndexNow POST. Also run lint, TypeScript, build, and SEO tests.
No UI, SEO metadata, structured data, sitemap, robots, or domain settings change.
Acceptance by IndexNow does not guarantee indexing or ranking. Google Search
Console is separate and no submission to it is performed.

Local validation: six IndexNow tests, two SEO serialization tests, six SEO HTTP
tests, lint, TypeScript, and production build passed. Workflow YAML was parsed;
official action SHAs were resolved from their release tags. The live dry run
verified production deployment/key and found one eligible page without POSTing
or altering journal state. Existing website/SEO/public sources are unchanged.

Files added: `.github/workflows/indexnow.yml`, `config/indexnow.mjs`,
`scripts/indexnow/core.mjs`, `scripts/indexnow/run.mjs`,
`scripts/indexnow/restore.mjs`, `tests/indexnow.test.mjs`, and this document.
Files updated: `package.json` and `.gitignore`.
