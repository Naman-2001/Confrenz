import React from "react";
import { Grid } from "@material-ui/core";
import styles from "./tabpanel.module.css";

const Tabpanel = ({ handleTab, activeTab }) => {
  return (
    <div className={styles.tabswrapper}>
      <div className={styles.tab} style={{color:activeTab==="main" ? "#1f222e":"white",background:activeTab==="main" ? "white":"#1f222e"}} onClick={() => handleTab("main")}>
        <p>main</p>
      </div>
      <div className={styles.tab} style={{color:activeTab==="whiteboard" ? "#1f222e":"white",background:activeTab==="whiteboard" ? "white":"#1f222e"}} onClick={() => handleTab("whiteboard")}>
        <p>Whiteboard</p>
      </div>
    </div>
  );
};

export default Tabpanel;
