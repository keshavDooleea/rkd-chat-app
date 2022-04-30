import { useRouter } from "next/router";
import { useState } from "react";
import { useChatAuth } from "../classes/hooks/use-chat-auth.hook";
import { useSocket } from "../classes/hooks/use-socket";
import { IHTTPResponse } from "../classes/interfaces/http.interface";
import { CHAT_SOCKET_NAMESPACE } from "../classes/utils/config";
import { ChatMessageContainer } from "../components/chat-message-container";
import { ChatSidebar } from "../components/chat-sidebar";
import chatStyles from "../styles/Chat.module.css";

export default function ChatPage() {
  const router = useRouter();

  const validateChatAuthToken = (response: IHTTPResponse<boolean>) => {
    if (!response.data) {
      router.push("/");
    } else {
      setShouldRenderApp(true);
    }
  };

  const [shouldRenderApp, setShouldRenderApp] = useState<boolean>(false);
  const [_] = useChatAuth(validateChatAuthToken, setShouldRenderApp);
  const [chatSocket] = useSocket(CHAT_SOCKET_NAMESPACE);
  const [roomsId, setRoomsId] = useState<string[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>("");

  return (
    <>
      {shouldRenderApp && (
        <div className={chatStyles.chatHomePage}>
          <ChatSidebar chatSocket={chatSocket} roomsId={roomsId} setRoomsId={setRoomsId} setSelectedRoom={setSelectedRoom} />
          {selectedRoom && <ChatMessageContainer chatSocket={chatSocket} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />}
        </div>
      )}
    </>
  );
}
