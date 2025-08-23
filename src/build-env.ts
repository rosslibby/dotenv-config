import path from 'path';
import { config } from 'dotenv';
import { filterByPrefix } from './filter-by-prefix';
import { injectParams } from './inject-params';

type BuildEnvOptions = {
  filename?: string;
  prefix?: string;
};

export function buildEnv({
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
