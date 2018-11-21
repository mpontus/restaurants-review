import { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios";

/**
 * Api Gateway
 *
 * Individual API methods use ApiGateway instance to make
 * authenticated calls to the API server.
 */
export class ApiGateway {
  /**
   * Security token
   *
   * Controls the token attached to the authorization header as part
   * of the bearer authentication scheme.
   */
  private securityToken: string | null = null;

  /**
   * Constructor
   */
  constructor(private readonly axios: AxiosInstance) {
    this.axios.interceptors.request.use(config => {
      if (this.securityToken === null) {
        return config;
      }

      config.headers.common.Authorization = `Bearer ${this.securityToken}`;

      return config;
    });
  }

  /**
   * Attach given token to API requests
   */
  public setAuthToken(token: string | null) {
    this.securityToken = token;
  }

  /**
   * Proxy generic request to axios client
   */
  public request<T = any>(config: AxiosRequestConfig): AxiosPromise<T> {
    return this.axios.request(config);
  }

  /**
   * Proxy GET request to axios client
   */
  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.axios.get(url, config);
  }

  /**
   * Proxy DELETE request to axios client
   */
  public delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.axios.delete(url, config);
  }

  /**
   * Proxy HEAD request to axios client
   */
  public head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.axios.head(url, config);
  }

  /**
   * Proxy POST request to axios client
   */
  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.axios.post(url, data, config);
  }

  /**
   * Proxy PUT request to axios client
   */
  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.axios.put(url, data, config);
  }

  /**
   * Proxy PATCH request to axios client
   */
  public patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.axios.patch(url, data, config);
  }
}
