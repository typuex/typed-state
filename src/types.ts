import type { IsEmpty }  from './utils';


type OnlySubModules<SubModules> =
  [IsEmpty<SubModules>] extends [true]
    ? never
    : {
      [SubModuleKey in keyof SubModules]-?: ModuleState<SubModules[SubModuleKey]>
    };


type OnlyState<State> = [IsEmpty<State>] extends [true] ? never : State;


// IDEA: here `Merge` or `Override`-like types can be used.
type SubModulesAndState<SubModules, State> =
  [IsEmpty<State>] extends [true]
    ? never
    : [IsEmpty<SubModules>] extends [true]
      ? never
      : {
        [Key in (keyof State | keyof SubModules)]-?:
        Key extends keyof SubModules
          ? ModuleState<SubModules[Key]>
          : Key extends keyof State
            ? State[Key]
            :never
      };

/**
 * Returns keys of O with values other than `never`.
 *
 * Credit: https://github.com/millsp/ts-toolbelt/blob/8915a03251e275d06117eb93833dd86adeec50ba/src/Object/FilterKeys.ts#L7-L12
 */
type NeverKeys<O> = {
  [K in keyof O]-?: {
    0: never;
    1: K;
  }[O[K] extends never ? 1 : 0]
}[keyof O];

type NonNeverKeys<O> = Exclude<keyof O, NeverKeys<O>>;


export type ModuleState<RootModule> =
  RootModule extends { state: infer State; modules: infer SubModules }
    ? SubModulesAndState<SubModules, State>
    // only have state property
    : RootModule extends { state: infer State }
      // empty ({}) state has no value
      ? OnlyState<State>
      // only have modules property
      : RootModule extends { modules: infer SubModules }
        // empty ({}) modules has no value
        ? [IsEmpty<SubModules>] extends [true]
          ? never
          : OnlySubModules<SubModules> extends infer X
            ? { [K in NonNeverKeys<X>]: X[K] } extends infer I
              ? [IsEmpty<I>] extends [false]
                ? I
                : never
              : never
            : never
        : never;
