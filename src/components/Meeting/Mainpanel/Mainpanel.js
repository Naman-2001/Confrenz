import React, { useState } from "react";
import Chat from "../Chat/Chat";
import Notes from "../Notes/Notes";
import Tabpanel from "../Tabpanel/Tabpanel";
import Voiceroom from "../VoiceRoom/Voiceroom";
import styles from "./mainpanel.module.css";
const Mainpanel = () => {
  const [activeTab, setActiveTab] = useState("notes");

  const handleTab = (value) => {
    setActiveTab(value);
  };

  return (
    <div style={{ height: "100%", position: "relative" }}>
      <Tabpanel activeTab={activeTab} handleTab={handleTab} />
      <div
        style={{ height: "94%" }}
        className={activeTab === "notes" ? styles.active : styles.inactive}
      >
        <Notes />
      </div>

      <div
        style={{ height: "94%" }}
        className={activeTab === "chats" ? styles.active : styles.inactive}
      >
        <Chat />
      </div>

      <div
        style={{ height: "94%" }}
        className={activeTab === "meet" ? styles.active : styles.inactive}
      >
        <Voiceroom />
      </div>
    </div>
  );
};

export default Mainpanel;
