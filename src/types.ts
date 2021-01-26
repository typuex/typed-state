import type { DeepReadonly, IsEmpty, ValuesType, PickByValueExact }  from './utils';


type SubModuleState<SubModule> = SubModule extends { state: unknown; modules: unknown }
  ? {
    [K in ExcludeWithoutStateKeys<SubModule>]-?: K extends keyof SubModule['modules']
      ? SubModuleState<SubModule['modules'][K]>
      : K extends keyof SubModule['state'] ? SubModule['state'][K] : never;
  }
  : SubModule extends { state: unknown }
    ? {
      [K in keyof SubModule['state']]-?: SubModule['state'][K];
    }
    : SubModule extends { modules: unknown }
      ? {
        [K in keyof SubModule['modules']]-?: SubModuleState<SubModule['modules'][K]>
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
    ? IsEmpty<Module['modules']> extends true
      ? false
      : SubModulesHaveValidStateDeepDown<Module>
    : Module extends { state: unknown }
      ? IsEmpty<Module['state']> extends true
        ? false
        : true
      : false;


type WithoutStateSubModuleKeys<ModuleSubModules> = keyof PickByValueExact<{
  [K in keyof ModuleSubModules]-?: HasValidStateDeepDown<ModuleSubModules[K]> extends true ? true : [never]
}, [never]>;


type ExcludeWithoutStateKeys<Module extends { state: unknown; modules: unknown }> = Exclude<keyof Module['modules'] | keyof Module['state'], WithoutStateSubModuleKeys<Module['modules']>>;


export type ModuleState<Root> = Root extends { state: unknown; modules: unknown }
  ? {
    state: {
      [K in ExcludeWithoutStateKeys<Root>]-?: K extends keyof Root['modules']
        ? SubModuleState<Root['modules'][K]>
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
          [K in keyof Root['modules']]-?: SubModuleState<Root['modules'][K]>
        };
      }
      : never;


export type DeepReadonlyModuleState<Root> = Root extends { readonly state: unknown; readonly modules: unknown }
  ? {
    readonly state: {
      readonly [K in ExcludeWithoutStateKeys<Root>]-?: K extends keyof Root['modules']
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
