export function toJSON<T>(f: FormData) {
  const o = {};

  f.forEach((v, k) => o[k] = v);

  return o as T;
}
