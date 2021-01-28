import type { ModuleState } from './types';
import { check, checks } from './test-utils';


{
  const store = undefined;

  checks([
    check<ModuleState<typeof store>, never, true>(),
  ]);
}

{
  const store = {};

  checks([
    check<ModuleState<typeof store>, never, true>(),
  ]);
}

{
  const store = {
    state: {},
  };

  checks([
    check<ModuleState<typeof store>, never, true>(),
  ]);
}

{
  const store = {
    modules: {},
  };

  checks([
    check<ModuleState<typeof store>, never, true>(),
  ]);
}

{
  const store = {
    state: {},
    modules: {},
  };

  checks([
    check<ModuleState<typeof store>, never, true>(),
  ]);
}

{
  const store = {
    state: {
      a: 'a',
    },
  };

  interface Expected {
    a: string;
  }

  checks([
    check<ModuleState<typeof store>, Expected, true>(),
  ]);
}

{
  const store = {
    modules: {
      a: {
        state: {
          b: 'a.b',
        },
      },
    },
  };

  interface Expected {
    a: {
      b: string;
    };
  }

  checks([
    check<ModuleState<typeof store>, Expected, true>(),
  ]);
}

{
  const store = {
    modules: {
      a: {
        state: {},
      },
    },
  };

  checks([
    check<ModuleState<typeof store>, never, true>(),
  ]);
}
