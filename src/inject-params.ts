import { findParameters } from './find-params';

export function injectParams(
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
