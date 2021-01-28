import type { IsEmpty }  from './utils';


type OnlySubModules<SubModules> =
  [IsEmpty<SubModules>] extends [true]
    ? never
    : {
      [SubModuleKey in keyof SubModules]-?: ModuleState<SubModules[SubModuleKey]>
    } extends infer X
      ? X extends { [SubModuleKey in keyof SubModules]: infer V }
        ? V extends never
          ? never
          : X
        : never
      : never;

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


export type ModuleState<RootModule> =
  RootModule extends { state: infer State; modules: infer SubModules }
    ? SubModulesAndState<SubModules, State>
    // only have state property
    :RootModule extends { state: infer State }
      // empty ({}) state has no value
      ? OnlyState<State>
      // only have modules property
      : RootModule extends { modules: infer SubModules }
        // empty ({}) modules has no value
        ? OnlySubModules<SubModules>
        : never;
