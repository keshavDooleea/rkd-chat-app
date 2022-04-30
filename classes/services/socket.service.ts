import { LocalStorageService } from "./local-storage.service";

export class SocketService {
  private static instance: SocketService;
  private localStorageService: LocalStorageService;

  constructor() {
    this.localStorageService = LocalStorageService.getInstance();
  }

  static getInstance = () => {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }

    return SocketService.instance;
  };

  getSocketBody<T>(data?: T) {
    return {
      data,
      userToken: this.localStorageService.getChatToken(),
    };
  }
}
