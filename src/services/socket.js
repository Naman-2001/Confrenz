import io from "socket.io-client";
// import { SERVER_URL } from "config.keys";
// https://colabdraw-backend.herokuapp.com/
export const socket = io("https://colabdraw-backend.herokuapp.com/", {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10001,
  transports: ["websocket"],
});
