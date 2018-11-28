import { History } from "history";
import qs from "query-string";
import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * Provides access to the query params as an object
 *
 * This function is used internally in useQueryParam.
 */
export const useQueryParams = (
  history: History
): [qs.OutputParams, (params: qs.InputParams) => void] => {
  const [location, updateLocation] = useState(history.location);
  const queryParams = useMemo(() => qs.parse(location.search), [
    location.search
  ]);
  const updateQueryParams = useCallback(
    params =>
      history.push({
        pathname: location.pathname,
        search: qs.stringify(params)
      }),
    [location]
  );

  useEffect(() => history.listen(updateLocation), []);

  return [queryParams, updateQueryParams];
};

/**
 * React hook to access and update query params
 */
export const useQueryParam = (
  history: History,
  name: string
): [string | string[] | undefined, (value: any) => void] => {
  const [params, updateQueryParams] = useQueryParams(history);
  const setParam = useCallback(
    value => updateQueryParams({ ...params, [name]: value }),
    [params]
  );

  return [params[name], setParam];
};
