import { buildEnv } from './build-env';

export default buildEnv;
export { buildEnv };

console.log(buildEnv({ prefix: 'MONGO_' }));
