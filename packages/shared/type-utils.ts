// from https://github.com/microsoft/vscode/issues/94679#issuecomment-755194161
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
