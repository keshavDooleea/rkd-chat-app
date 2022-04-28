import { IHTTPResponse } from "../interfaces/http.interface";
import { RKD_SERVER_URL } from "../utils/config";

export const POST = async <T, D>(endpoint: string, data: T): Promise<IHTTPResponse<D>> => {
  const res = await fetch(`${RKD_SERVER_URL}/${endpoint}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });

  return {
    status: res.status,
    data: (await res.json()) as D,
    res,
  } as IHTTPResponse<D>;
};

export const GET = async <D>(endpoint: string): Promise<IHTTPResponse<D>> => {
  const res = await fetch(`${RKD_SERVER_URL}/${endpoint}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });

  return {
    status: res.status,
    data: (await res.json()) as D,
    res,
  } as IHTTPResponse<D>;
};

export const HTTP_CODES = {
  success: 200,
  error: 500,
  forbidden: 403,
};
