type FoundParams = {
  key: string;
  value: string;
  params?: Record<string, string>;
};

export function findParameters(
  [key, value]: [string, string],
): FoundParams {
  const params = value.matchAll(/{{([^}]+)}}/g)
    .toArray()
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return {
    key,
    value,
    ...(Object.keys(params).length ? { params } : {}),
  };
}
