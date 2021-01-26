export type { ValuesType } from 'utility-types';

export type DeepReadonly<T> = {
  readonly [K in keyof T]-?: DeepReadonly<T[K]>;
};

export type IsEmpty<State> = keyof State extends never ? true : false;
