import path from 'path';
import { config } from 'dotenv';
import { autoPrefix, filterByPrefix, injectParams } from './utils';

type BuildEnvOptions = {
  filename?: string;
  prefix?: string;
};

function autoEnv(
  prefix?: string,
): Record<string, Record<string, string>> {
  const vars: Record<string, string> = {};
  config({ processEnv: vars });
  return autoPrefix(vars, prefix);
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
