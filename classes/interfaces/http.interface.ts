export interface IHTTPResponse<T> {
  status: number;
  data: T;
  res: Response;
}

export interface IChatAuthResponse {
  chatToken: string;
}
