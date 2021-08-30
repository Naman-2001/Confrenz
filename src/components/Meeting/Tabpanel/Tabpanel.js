import React from "react";
import { Grid } from "@material-ui/core";
import styles from "./tabpanel.module.css";

const Tabpanel = ({ handleTab, activeTab }) => {
  return (
    <div className={styles.tabswrapper}>
      <div className={styles.tab} style={{color:activeTab==="notes" ? "#1f222e":"white",background:activeTab==="notes" ? "white":"#1f222e"}} onClick={() => handleTab("notes")}>
        <p>Notes</p>
      </div>
      <div className={styles.tab} style={{color:activeTab==="chats" ? "#1f222e":"white",background:activeTab==="chats" ? "white":"#1f222e"}} onClick={() => handleTab("chats")}>
        <p>Chats</p>
      </div>
      <div className={styles.tab} style={{color:activeTab==="meet" ? "#1f222e":"white",background:activeTab==="meet" ? "white":"#1f222e"}} onClick={() => handleTab("meet")}>
        <p>Meet</p>
      </div>
    </div>
  );
};

export default Tabpanel;
