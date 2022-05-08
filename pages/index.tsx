import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useChatAuth } from "../classes/hooks/use-chat-auth.hook";
import { IAuthResponse, IChatAuthResponse, IHTTPResponse } from "../classes/interfaces/http.interface";
import { POST } from "../classes/services/http.service";
import { LocalStorageService } from "../classes/services/local-storage.service";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const localStorageService = LocalStorageService.getInstance();
  const [authPassword, setAuthPassword] = useState<string>();
  const [error, setError] = useState<string | null>();
  const router = useRouter();
  const [shouldRenderApp, setShouldRenderApp] = useState<boolean>(false);

  const checkPasswordResponseCallback = (response: IHTTPResponse<IAuthResponse>) => {
    if (response.data && response.data.isValid) {
      navigateToChat();
    } else {
      setShouldRenderApp(true);
      localStorageService.deleteChatToken();
    }
  };

  const [getAuthError] = useChatAuth(checkPasswordResponseCallback, setShouldRenderApp);
  const navigateToChat = () => router.push("chat");

  useEffect(() => setError(getAuthError as string), [getAuthError]);

  const checkPassword = async () => {
    await POST<any, IChatAuthResponse>("chat/auth", { password: authPassword })
      .then((response: IHTTPResponse<IChatAuthResponse>) => {
        if (response.status === 400) return setError(response.res.statusText);

        localStorageService.saveChatToken(response.data.chatToken);
        navigateToChat();
      })
      .catch(() => setError("error authenticating to chat controller"));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!authPassword) return setError("Invalid password entered");

    setError(null);
    await checkPassword();
  };

  return (
    <>
      <Head>
        <title>RKD Chat App</title>
        <meta name="RKD Chat App" content="Chat Application" />
        <link rel="icon" href="/dooleea.svg" />
      </Head>

      {shouldRenderApp && (
        <>
          <form className={styles.authContainer} onSubmit={onSubmit}>
            <h1 className="subtitle">Enter auth password</h1>
            <input type="password" autoComplete="off" placeholder="password" onChange={(e) => setAuthPassword(e.target.value)} />
            <button>Log in</button>
          </form>

          {error && (
            <div className={styles.errorContainer} onClick={() => setError(null)}>
              <p>{error}</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
