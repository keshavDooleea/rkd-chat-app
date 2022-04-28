import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { LocalStorageService } from "../services/local-storage.service";
import { RKD_SERVER_URL } from "../utils/config";

export const useSocket = (namespace: string) => {
  const localStorageService = LocalStorageService.getInstance();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const userToken = localStorageService.getChatToken();

    const newSocket = io(`${RKD_SERVER_URL}/${namespace}`, {
      transports: ["websocket"],
      query: { userToken: JSON.stringify(userToken), isRKD: true },
    });

    setSocket(newSocket);
    addListeners(newSocket);
    console.log(`Connected to ${namespace} socket`);

    return () => {
      removeListeners(newSocket);
      newSocket.close();
      console.log(`Closed ${namespace} socket`);
    };
  }, [setSocket]);

  const addListeners = (newSocket: Socket) => {};

  const removeListeners = (newSocket: Socket) => {};

  return [socket];
};
