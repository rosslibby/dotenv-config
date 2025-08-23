import { rekey } from './re-key';

export function filterByPrefix(
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
