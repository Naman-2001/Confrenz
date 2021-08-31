import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { socket } from "../../../services/socket";
import { useRoomClientContext } from "../../../services/RoomClientContext";
import styles from "./chat.module.css";
import ScrollToBottom, {
  useScrollToBottom,
  useSticky,
} from "react-scroll-to-bottom";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const stb = useScrollToBottom();
  const [sticky] = useSticky();

  const { clientId } = useRoomClientContext();

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input) socket.emit("sendMessage", input, () => setInput(""));
  };

  return (
    <div style={{ height: "100%", position: "relative" }}>
      <div
        style={{
          height: "92%",
          padding: "20px",
          overflow: "auto",
          overflowX: "hidden",
        }}
      >
        <ScrollToBottom
          style={{ height: "100%" }}
          followButtonClassName="triangle"
        >
          {messages.map((mes, i) => {
            return (
              <>
                {mes.user.id === clientId ? (
                  <div key={i} className={styles.ownerdiv}>
                    <div className={styles.owner}>{mes.text}</div>
                  </div>
                ) : mes.type === "admin" ? (
                  <div key={i} className={styles.admindiv}>
                    <div className={styles.adminmessage}>{mes.text}</div>
                  </div>
                ) : (
                  <div key={i} className={styles.othersdiv}>
                    <div className={styles.others}>{mes.text}</div>
                    <p style={{ fontSize: "13px", color: "#b9b9b9" }}>
                      {mes.user.guestName}{" "}
                    </p>
                  </div>
                )}
              </>
            );
          })}
          {!sticky && <button onClick={stb}>Click</button>}
        </ScrollToBottom>
      </div>

      <div className={styles.sendmessagebox}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
          className={styles.messageinput}
          placeholder="Hola Felas!"
        />
        <Button onClick={sendMessage} className={styles.sendbutton}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
