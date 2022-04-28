export const isLocal = process.env.NODE_ENV !== "production";
export const RKD_SERVER_URL = isLocal ? "http://localhost:8080" : "https://www.rkdooleea.com/api";

export const APP_NAME = "RKD_CHAT_APP";
