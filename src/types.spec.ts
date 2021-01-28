import type { RootState } from './types';
import { check, checks } from './test-utils';


{
  const store = undefined;

  checks([
    check<RootState<typeof store>, never, true>(),
  ]);
}
