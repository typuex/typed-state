import type { RootState } from './types';
import { check, checks } from './test-utils';


{
  const store = undefined;

  checks([
    check<RootState<typeof store>, never, true>(),
  ]);
}

{
  const store = {};

  checks([
    check<RootState<typeof store>, never, true>(),
  ]);
}

{
  const store = {
    state: {},
  };

  interface Expected {
    state: never;
  }

  checks([
    check<RootState<typeof store>, Expected, true>(),
  ]);
}

{
  const store = {
    modules: {},
  };

  checks([
    check<RootState<typeof store>, never, true>(),
  ]);
}

{
  const store = {
    state: {},
    modules: {},
  };

  interface Expected {
    state: never;
  }

  checks([
    check<RootState<typeof store>, Expected, true>(),
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
    check<RootState<typeof store>, Expected, true>(),
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
    check<RootState<typeof store>, Expected, true>(),
  ]);
}
