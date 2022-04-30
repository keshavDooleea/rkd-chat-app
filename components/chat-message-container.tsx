import { useEffect, useState } from "react";
import { ChatMessage, IChatMessage } from "../classes/chat-message";
import { IChatMessageContainer } from "../classes/interfaces/props";
import chatStyles from "../styles/Chat.module.css";

export const ChatMessageContainer = ({ chatSocket, selectedRoom, setSelectedRoom }: IChatMessageContainer) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");

  useEffect(() => {
    setMessages([]);
    chatSocket?.emit("getAUserMessage", { userId: selectedRoom }, (messages: IChatMessage[]) => {
      messages.map((msg) => setMessages((previousMsges) => [...previousMsges, new ChatMessage(msg)]));
    });
  }, [selectedRoom]);

  const sendNewMessage = () => {};

  return (
    <main className={chatStyles.chatMessageContainer}>
      <header>
        <div className="flex-row">
          <small className="subtitle">User ID:</small>
          <p className="title">{selectedRoom}</p>
        </div>
        <button onClick={() => setSelectedRoom("")}>close</button>
      </header>
      <div className={chatStyles.chatContainerBody}>
        {messages.map((message) => (
          <div key={message.getId()} className={`${chatStyles.msgRow} ${message.getAuthor() === "RKD" ? chatStyles.RKD : chatStyles.user}`}>
            <small className="subtitle">
              <span>{message.getFormattedDate()}</span>
              <span className={chatStyles.msgRowId}>- {message.getId()}</span>
            </small>
            <p className="title">{message.getMessage()}</p>
          </div>
        ))}
      </div>
      <form className={chatStyles.chatForm} autoComplete="off">
        <input type="text" id={chatStyles.chatMsgInput} placeholder="Chat" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />

        <button id={chatStyles.sendChatBtn} onClick={sendNewMessage}>
          Send
        </button>
      </form>
    </main>
  );
};
