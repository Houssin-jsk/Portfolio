import { seoConfig } from './seo.ts';

export const indexNowConfig = Object.freeze({
  origin: seoConfig.origin,
  repository: 'Houssin-jsk/Portfolio',
  branch: 'main',
  productionEnvironment: 'Production',
  deploymentActor: 'vercel[bot]',
  deploymentHostSuffix: '-houssin-jsks-projects.vercel.app',
  deploymentHostPrefix: 'el-houssaine-portfolio-',
  endpoint: 'https://api.indexnow.org/indexnow',
});
