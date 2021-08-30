import BeatLoader from "react-spinners/BeatLoader";
import React, { useState } from "react";
import styles from "./beatload.module.css";

const BeatLoad = () => {
  return (
    <div className={styles.loadwrapper}>
      <BeatLoader color={"#f4af1b"} loading={true} size={30} />
    </div>
  );
};

export default BeatLoad;
