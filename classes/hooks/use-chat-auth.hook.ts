import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IHTTPResponse } from "../interfaces/http.interface";
import { GET } from "../services/http.service";
import { LocalStorageService } from "../services/local-storage.service";

export const useChatAuth = (cb: (res: IHTTPResponse<boolean>) => void, setShouldRenderApp: Dispatch<SetStateAction<boolean>>) => {
  const localStorageService = LocalStorageService.getInstance();
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    validateAuth(localStorageService.getChatToken());
  }, []);

  const validateAuth = (chatToken: string | null) => {
    GET<any>(`chat/token/${chatToken}`)
      .then((response: IHTTPResponse<boolean>) => {
        if (response.status === 400) return setError(response.res.statusText);

        cb(response);
      })
      .catch(() => setError("HTTP GET: invalid token"));
  };

  return [error];
};
