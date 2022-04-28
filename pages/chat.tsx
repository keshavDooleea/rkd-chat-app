import { useRouter } from "next/router";
import { useState } from "react";
import { useChatAuth } from "../classes/hooks/use-chat-auth.hook";
import { useSocket } from "../classes/hooks/use-socket";
import { IHTTPResponse } from "../classes/interfaces/http.interface";
import { CHAT_SOCKET_NAMESPACE } from "../classes/utils/config";

export default function ChatPage() {
  const validateChatAuthToken = (response: IHTTPResponse<boolean>) => {
    const router = useRouter();

    if (!response.data) {
      router.push("/");
    } else {
      setShouldRenderApp(true);
    }
  };

  const [shouldRenderApp, setShouldRenderApp] = useState<boolean>(false);
  const [getAuthError] = useChatAuth(validateChatAuthToken, setShouldRenderApp);
  const [chatSocket] = useSocket(CHAT_SOCKET_NAMESPACE);

  return <>{shouldRenderApp && <div>CHATTT</div>}</>;
}
