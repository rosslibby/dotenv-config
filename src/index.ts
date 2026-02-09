import path from 'path';
import { config } from 'dotenv';
import { BuildEnvOptions, EnvCollection, EnvVars } from './types';
import { autoPrefix, filterByPrefix, injectParams } from './utils';
import { client, env, getEnv } from './client';

function autoEnv(): EnvCollection {
  const vars: EnvVars = {};
  config({ processEnv: vars, quiet: true });
  return autoPrefix(vars);
};

function buildEnv({
  filename,
  prefix,
}: BuildEnvOptions): EnvVars {
  const envVars: EnvVars = {};
  const filepath = filename && path.resolve(process.cwd(), filename);
  config({
    ...(filepath ? { path: filepath } : {}),
    processEnv: envVars,
    quiet: true,
  });
  const filtered = filterByPrefix(envVars, prefix);
  const paramaterized = injectParams(filtered);
  return paramaterized;
}

export default buildEnv;
export { autoEnv, buildEnv, client, env, getEnv };
