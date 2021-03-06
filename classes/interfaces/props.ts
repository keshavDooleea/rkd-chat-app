import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";
import { ChatMessage } from "../chat-message";

export interface IChatSocket {
  chatSocket: Socket | null;
}

export interface IChatSidebar extends IChatSocket {
  roomsId: string[];
  selectedRoom: string;
  setRoomsId: Dispatch<SetStateAction<string[]>>;
  setSelectedRoom: Dispatch<SetStateAction<string>>;
  unreadMsgMap: Map<string, number>;
}

export interface IChatMessageContainer extends IChatSocket {
  selectedRoom: string;
  setSelectedRoom: Dispatch<SetStateAction<string>>;
  messages: ChatMessage[];
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
}
