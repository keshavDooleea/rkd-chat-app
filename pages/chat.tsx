import { useRouter } from "next/router";
import { useState } from "react";
import { useChatAuth } from "../classes/hooks/use-chat-auth.hook";
import { IHTTPResponse } from "../classes/interfaces/http.interface";

export default function ChatPage() {
  const router = useRouter();
  const [shouldRenderApp, setShouldRenderApp] = useState<boolean>(false);

  const validateChatAuthToken = (response: IHTTPResponse<boolean>) => {
    if (!response.data) {
      router.push("/");
    } else {
      setShouldRenderApp(true);
    }
  };

  const [getAuthError] = useChatAuth(validateChatAuthToken, setShouldRenderApp);

  return <>{shouldRenderApp && <div>CHATTT</div>}</>;
}
