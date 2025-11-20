export type BuildEnvOptions = {
  filename?: string;
  prefix?: string;
};
export type EnvVars = Record<string, string>;
export type EnvCollection = Record<string, EnvVars>;
