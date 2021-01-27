/**
 * Type helpers to make testing generated types possible.
 * Used in `*.spec.ts` files.
 *
 * Credit: https://github.com/millsp/ts-toolbelt/blob/master/src/Test.ts
 */
type Equals<A1, A2> = (<A>() => A extends A2 ? true : false) extends (<A>() => A extends A1 ? true : false)
  ? true
  : false;

export declare function check<Type, Expect, Outcome extends boolean> (): Equals<Equals<Type, Expect>, Outcome>;

export declare function checks (toBeChecked: true[]): void;
