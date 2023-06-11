import React from "react";
import styles from "../styles/loader.module.scss";

export const Loading = () => {

  return (
  <div className="position-absolute-center">
    <div className={styles.clock_loader}></div>
  </div>)
}

