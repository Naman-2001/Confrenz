import PropagateLoader from "react-spinners/PropagateLoader";
import React, { useState } from "react";
import styles from "./beatload.module.css";

const PropagateLoad = () => {
  return (
    <div className={styles.loadwrapper}>
      <PropagateLoader
        color={"#F4AF1B"}
        loading={true}
        size={8}
        css={{ marginBottom: "9px" }}
      />
    </div>
  );
};

export default PropagateLoad;
