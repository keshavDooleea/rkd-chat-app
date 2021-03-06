export const isLocal = process.env.NODE_ENV !== "production";
export const RKD_SERVER_URL = isLocal ? "http://localhost:8080/api" : "http://rkd-portfolio-backend.herokuapp.com/api";

export const APP_NAME = "RKD_CHAT_APP";

// socket
export const CHAT_SOCKET_NAMESPACE = "chat";

export const SOCKET_EVENTS = {};
