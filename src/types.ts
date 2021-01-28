import type { IsEmpty }  from './utils';


export type RootState<RootModule> =
  // only have state property
  RootModule extends { state: infer State }
    // empty ({}) state has no value
    ? [IsEmpty<State>] extends [true] ? never : State
    // only have modules property
    : RootModule extends { modules: infer SubModules }
      // empty ({}) modules has no value
      ? [IsEmpty<SubModules>] extends [true]
        ? never
        : {
          [SubModuleKey in keyof SubModules]-?: RootState<SubModules[SubModuleKey]>
        } extends infer X
          ? X extends { [SubModuleKey in keyof SubModules]: infer V }
            ? V extends never
              ? never
              : X
            : never
          : never
      : never;
