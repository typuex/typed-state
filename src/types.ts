import type { DeepReadonly, IsEmpty, ValuesType }  from './utils';


type NeverIncludedModuleState<Root> = Root extends { state: unknown; modules: unknown }
  ? {
    [K in (keyof Root['modules'] | keyof Root['state'])]-?: K extends keyof Root['modules']
      ? NeverIncludedModuleState<Root['modules'][K]>
      : K extends keyof Root['state'] ? Root['state'][K] : never;
  }
  : Root extends { state: unknown }
    ? {
      [K in keyof Root['state']]-?: Root['state'][K];
    }
    : Root extends { modules: unknown }
      ? {
        [K in keyof Root['modules']]-?: NeverIncludedModuleState<Root['modules'][K]>
      }
      : never;


type SubModulesHaveValidStateDeepDown<Module extends { modules: unknown }> = ValuesType<{
  [K in keyof Module['modules']]-?: HasValidStateDeepDown<Module['modules'][K]>;
}> extends true
  ? true
  : false;


type HasValidStateDeepDown<Module> = Module extends { state: unknown; modules: unknown }
  ? Exclude<keyof Module['state'], keyof Module['modules']> extends never
    ? SubModulesHaveValidStateDeepDown<Module>
    : true
  : Module extends { modules: unknown }
    ? SubModulesHaveValidStateDeepDown<Module>
    : Module extends { state: unknown }
      ? (IsEmpty<Module['state']> extends true ? false : true)
      : false;


type WithoutStateSubModuleKeys<ModuleSubModules> = Extract<keyof ModuleSubModules, keyof  {
  [K in keyof ModuleSubModules]-?: HasValidStateDeepDown<ModuleSubModules[K]> extends true ? true : never
}>;


type WithStateSubModuleKeys<Module extends { state: unknown; modules: unknown }> = Exclude<(keyof Module['modules'] | keyof Module['state']), WithoutStateSubModuleKeys<Module['modules']>>;


export type ModuleState<Root> = Root extends { state: unknown; modules: unknown }
  ? {
    state: {
      [K in WithStateSubModuleKeys<Root>]-?: K extends keyof Root['modules']
        ? NeverIncludedModuleState<Root['modules'][K]>
        : K extends keyof Root['state'] ? Root['state'][K] : never;
    };
  }
  : Root extends { state: unknown }
    ? {
      state: {
        [K in keyof Root['state']]-?: Root['state'][K];
      };
    }
    : Root extends { modules: unknown }
      ? {
        state: {
          [K in keyof Root['modules']]-?: NeverIncludedModuleState<Root['modules'][K]>
        };
      }
      : never;


export type DeepReadonlyModuleState<Root> = Root extends { readonly state: unknown; readonly modules: unknown }
  ? {
    readonly state: {
      readonly [K in (keyof Root['modules'] | keyof Root['state'])]-?: K extends keyof Root['modules']
        ? DeepReadonlyModuleState<Root['modules'][K]>
        : K extends keyof Root['state'] ? DeepReadonly<Root['state'][K]> : never;
    };
  }
  : Root extends { readonly state: unknown }
    ? {
      readonly state: {
        readonly [K in keyof Root['state']]-?: DeepReadonly<Root['state'][K]>;
      };
    }
    : Root extends { readonly modules: unknown }
      ? {
        readonly state: {
          readonly [K in keyof Root['modules']]-?: DeepReadonlyModuleState<Root['modules'][K]>
        };
      }
      : never;
