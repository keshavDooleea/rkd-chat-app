import { IChatMessage } from "../chat-message";
import { LocalStorageService } from "./local-storage.service";

export class ChatService {
  private static instance: ChatService;

  constructor() {
    this.localStorageService = LocalStorageService.getInstance();
  }

  static getInstance = () => {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }

    return ChatService.instance;
  };

  addNewMessage = (message: IChatMessage) => {};
}
