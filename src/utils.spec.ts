import type { IsEmpty, DeepReadonly } from './utils';
import { check, checks } from './test-utils';

{
  checks([
    // eslint-disable-next-line @typescript-eslint/ban-types
    check<IsEmpty<{}>, true, true>(),
    check<IsEmpty<{ key: string }>, false, true>(),
    check<IsEmpty<{ key: undefined }>, false, true>(),
    check<IsEmpty<{ key?: number }>, false, true>(),
    check<IsEmpty<{ key: never }>, false, true>(),
  ]);
}

{
  checks([
    check<DeepReadonly<{ key: string }>, { readonly key: string }, true>(),
    check<DeepReadonly<{ key: { nested: number } }>, { readonly key: { readonly nested: number } }, true>(),
  ]);

  interface Before {
    key: {
      a: {
        aa: boolean;
      };
      b: {
        bb: {
          bbb: boolean;
        };
      };
    };
  }

  interface After {
    readonly key: {
      readonly a: {
        readonly aa: boolean;
      };
      readonly b: {
        readonly bb: {
          readonly bbb: boolean;
        };
      };
    };
  }

  checks([
    check<DeepReadonly<Before>, After, true>(),
  ]);
}
