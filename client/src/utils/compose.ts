import React from "react";

type RC<P> = React.SFC<P> | React.ComponentClass<P>;

type HOC<O, P> = (C: RC<O>) => RC<P>;

/**
 * Overload for a single HOC
 */
export function compose<T1, T2>(h1: HOC<T1, T2>): HOC<T1, T2>;

/**
 * Overload for two hocs
 */
export function compose<T1, T2, T3>(
  h1: HOC<T1, T2>,
  h2: HOC<T2, T3>
): HOC<T1, T3>;

/**
 * Compose Function
 *
 * Used to compose HOCs with sane typing.
 */
export function compose<P>(...hocs: Array<HOC<any, any>>): HOC<any, any> {
  return hocs.reduce((f, g) => (...args) => f(g(...args)));
}
