import { APP_NAME } from "../utils/config";

const localStorageKeys = {
  chatToken: APP_NAME + "_user_token",
};

export class LocalStorageService {
  private static instance: LocalStorageService | null;

  static getInstance = (): LocalStorageService => {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService();
    }

    return LocalStorageService.instance;
  };

  private getValue = (key: string) => window.localStorage.getItem(key);
  private setValue = (key: string, value: string) => window.localStorage.setItem(key, value);
  private deleteValue = (key: string) => window.localStorage.removeItem(key);

  // user for chat
  saveChatToken = (chatToken: string) => this.setValue(localStorageKeys.chatToken, chatToken);
  getChatToken = () => this.getValue(localStorageKeys.chatToken);
  deleteChatToken = () => this.deleteValue(localStorageKeys.chatToken);
}
