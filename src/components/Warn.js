import React from "react";
import styles from "./Warn.module.css";

const Warn = ({ message }) => {
  return (
    <div className={styles.warn}>
      <p>{message}</p>
    </div>
  );
};

export default Warn;