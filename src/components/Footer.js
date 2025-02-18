import React from "react";
import styles from "./Footer.module.css";

function Footer({ onLoadMore }) {
  return (
    <footer className={styles.footer}>
      <button className={styles.loadMoreButton} onClick={onLoadMore}>
        더보기
      </button>
    </footer>
  );
}

export default Footer;