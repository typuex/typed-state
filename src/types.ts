import type { DeepReadonly, IsEmpty, PickByValueExact }  from './utils';


type SubModuleState<SubModule> = SubModule extends { state: unknown; modules: unknown }
  ? ValidModulesOrStateKeys<SubModule> extends never
    ? never
    : {
      [K in ValidModulesOrStateKeys<SubModule>]-?: K extends keyof SubModule['modules']
        ? SubModuleState<SubModule['modules'][K]>
        : K extends keyof SubModule['state']
          ? SubModule['state'][K]
          : never;
    }
  : SubModule extends { state: unknown }
    ? SubModule['state']
    : SubModule extends { modules: unknown }
      ? ValidModuleKeys<SubModule> extends never
        ? never
        : {
          [K in ValidModuleKeys<SubModule>]-?: K extends keyof SubModule['modules']
            ? SubModuleState<SubModule['modules'][K]>
            : never;
        }
      : never;


type DeepReadonlySubModuleState<SubModule> = SubModule extends { state: unknown; modules: unknown }
  ? ValidModulesOrStateKeys<SubModule> extends never
    ? never
    : {
      readonly [K in ValidModulesOrStateKeys<SubModule>]-?: K extends keyof SubModule['modules']
        ? DeepReadonlySubModuleState<SubModule['modules'][K]>
        : K extends keyof SubModule['state'] ? DeepReadonly<SubModule['state'][K]> : never;
    }
  : SubModule extends { state: unknown }
    ? {
      readonly [K in keyof SubModule['state']]-?:  DeepReadonly<SubModule['state'][K]>;
    }
    : SubModule extends { modules: unknown }
      ? ValidModuleKeys<SubModule> extends never
        ? never
        : {
          readonly [K in ValidModuleKeys<SubModule>]-?: K extends keyof SubModule['modules']
            ? DeepReadonlySubModuleState<SubModule['modules'][K]>
            : never;
        }
      : never;


type HasValidStateDeepDown<Module> = Module extends { state: unknown; modules: unknown }
  ? Exclude<keyof Module['state'], keyof Module['modules']> extends never
    ? ValidModuleKeys<Module> extends never
      ? false
      : PickByValueExact<{
        [K in ValidModuleKeys<Module>]-?: K extends keyof Module['modules']
          ? [HasValidStateDeepDown<Module['modules'][K]>]
          : never;
      }, [true]> extends never
        ? false
        : true
    : true
  : Module extends { modules: unknown }
    ? IsEmpty<Module['modules']> extends true
      ? false
      : ValidModuleKeys<Module> extends never
        ? false
        : PickByValueExact<{
          [K in ValidModuleKeys<Module>]-?: K extends keyof Module['modules']
            ? [HasValidStateDeepDown<Module['modules'][K]>]
            : never;
        }, [true]> extends never
          ? false
          : true
    : Module extends { state: unknown }
      ? IsEmpty<Module['state']> extends true
        ? false
        : true
      : false;


type WithoutStateSubModuleKeys<ModuleSubModules> = keyof PickByValueExact<{
  [K in keyof ModuleSubModules]-?: HasValidStateDeepDown<ModuleSubModules[K]> extends true ? true : [never]
}, [never]>;


type ValidModulesOrStateKeys<Module extends { state: unknown; modules: unknown }> = Exclude<keyof Module['modules'] | keyof Module['state'], WithoutStateSubModuleKeys<Module['modules']>>;
type ValidModuleKeys<Module extends { modules: unknown }> = Exclude<keyof Module['modules'], WithoutStateSubModuleKeys<Module['modules']>>;


export type ModuleState<Root> = Root extends { state: unknown; modules: unknown }
  ? ValidModulesOrStateKeys<Root> extends never
    ? never
    : {
      state: {
        [K in ValidModulesOrStateKeys<Root>]-?: K extends keyof Root['modules']
          ? SubModuleState<Root['modules'][K]>
          : K extends keyof Root['state']
            ? Root['state'][K]
            : never;
      };
    }
  : Root extends { state: unknown }
    ? {
      state: {
        [K in keyof Root['state']]-?: Root['state'][K];
      };
    }
    : Root extends { modules: unknown }
      ? ValidModuleKeys<Root> extends never
        ? never
        : {
          state: {
            [K in ValidModuleKeys<Root>]-?: K extends keyof Root['modules']
              ? SubModuleState<Root['modules'][K]>
              : never
          };
        }
      : never;


export type DeepReadonlyModuleState<Root> = Root extends { readonly state: unknown; readonly modules: unknown }
  ? ValidModulesOrStateKeys<Root> extends never
    ? never
    : {
      readonly state: {
        readonly [K in ValidModulesOrStateKeys<Root>]-?: K extends keyof Root['modules']
          ? DeepReadonlySubModuleState<Root['modules'][K]>
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
      ? ValidModuleKeys<Root> extends never
        ? never:
        {
          readonly state: {
            readonly [K in ValidModuleKeys<Root>]-?: K extends keyof Root['modules']
              ? DeepReadonlySubModuleState<Root['modules'][K]>
              : never
          };
        }
      : never;
