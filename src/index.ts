import path from 'path';
import { config } from 'dotenv';

type BuildEnvOptions = {
  filename?: string;
  prefix?: string;
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

function rekey(
  key: string,
  prefix: string = '',
): string {
  const trim = prefix.length;
  key = key.substring(trim);
  return key.toLowerCase().split('_')
    .reduce((acc, str, i) => {
      if (i === 0) return str;
      return acc + str.substring(0, 1).toUpperCase() + str.substring(1);
    }, '');
}

function filterByPrefix(
  env: Record<string, string>,
  prefix?: string,
): Record<string, string> {
  return Object.entries(env)
    .filter(
      ([key]) => prefix ? key.startsWith(prefix) : true
    ).reduce((acc, [key, value]) => ({
      ...acc,
      [rekey(key, prefix)]: value,
    }), {});
}

type FoundParams = {
  key: string;
  value: string;
  params?: Record<string, string>;
};

function findParameters(
  [key, value]: [string, string],
): FoundParams {
  const params = Array.from(value.matchAll(/{{([^}]+)}}/g))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return {
    key,
    value,
    ...(Object.keys(params).length ? { params } : {}),
  };
}


function injectParams(
  env: Record<string, string>,
): Record<string, string> {
  const values = Object.entries(env).map(findParameters);
  return values.reduce(
    (acc, { key, value, params }) => {
      if (!params) {
        return acc;
      }

      const valueWithParams = Object.entries(params)
        .reduce((paramAcc, [pkey, pval]) => {
          const injection = env[pval];
          return paramAcc.replace(pkey, injection);
        }, value);

      return { ...acc, [key]: valueWithParams };
    },
  env);
}

export default buildEnv;
export { buildEnv };
