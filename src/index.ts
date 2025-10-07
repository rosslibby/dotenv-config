import path from 'path';
import { config } from 'dotenv';
import { BuildEnvOptions, EnvCollection } from './types';
import { autoPrefix, filterByPrefix, injectParams } from './utils';

function autoEnv(): EnvCollection {
  const vars: Record<string, string> = {};
  config({ processEnv: vars });
  return autoPrefix(vars);
};

function buildEnv({
  filename,
  prefix,
}: BuildEnvOptions): Record<string, string> {
  const envVars: Record<string, string> = {};
  const filepath = filename && path.resolve(process.cwd(), filename);
  config({
    ...(filepath ? { path: filepath } : {}),
    processEnv: envVars,
  });
  const filtered = filterByPrefix(envVars, prefix);
  const paramaterized = injectParams(filtered);
  return paramaterized;
}

export default buildEnv;
export { autoEnv, buildEnv };
