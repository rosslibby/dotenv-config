export function rekey(
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
