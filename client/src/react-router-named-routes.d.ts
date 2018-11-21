/**
 * Type declaration for react-router-named-routes module.
 */
declare module "react-router-named-routes" {
  /**
   * The only function we use is for react-router v4, that is formatRoute.
   */
  export function formatRoute(
    route: string,
    params: Record<string, any>
  ): string;
}
