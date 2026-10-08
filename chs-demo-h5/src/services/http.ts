export interface HttpOptions {
  data?: UniApp.RequestOptions['data'];
  header?: Record<string, string>;
  method?: UniApp.RequestOptions['method'];
  path: string;
  timeout?: number;
}

export class HttpError extends Error {
  constructor(
    message: string,
    readonly statusCode?: number,
    readonly response?: unknown,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api';

export function request<TResponse>(options: HttpOptions): Promise<TResponse> {
  return new Promise((resolve, reject) => {
    uni.request({
      data: options.data,
      fail: (error) => reject(new HttpError(error.errMsg)),
      header: options.header,
      method: options.method || 'GET',
      success: (response) => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          resolve(response.data as TResponse);
          return;
        }
        reject(
          new HttpError(
            `接口请求失败（${response.statusCode}）`,
            response.statusCode,
            response.data,
          ),
        );
      },
      timeout: options.timeout || 15000,
      url: `${apiBaseUrl}${options.path}`,
    });
  });
}
