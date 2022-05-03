export type ChatAuthor = "RKD" | "User";

export interface IUnreadChat {
  userId: string;
  unreadCount: number;
}

export interface IChatMessage {
  _id: string;
  userId: string;
  message: string;
  createdAt: Date;
  author: ChatAuthor;
}

export class ChatMessage {
  private messageAttributes: IChatMessage = {} as IChatMessage;

  constructor(newMessage: IChatMessage) {
    this.messageAttributes = newMessage;
  }

  getId = () => this.messageAttributes._id;
  getUserId = () => this.messageAttributes.userId;
  getMessage = () => this.messageAttributes.message;
  getCreatedAt = () => this.messageAttributes.createdAt;
  getAuthor = () => this.messageAttributes.author;

  isAuthorRKD = () => this.messageAttributes.author === "RKD";

  getFormattedDate = () => {
    const date = new Date(this.messageAttributes.createdAt);
    return date.toLocaleString("en-CA", {
      month: "short",
      weekday: "short",
      year: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  };
}
