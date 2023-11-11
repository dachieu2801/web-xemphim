import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Banner from "../components/Banner/Banner";
import styles from './Header.module.css'


function Header() {

  return (
    <header className={styles.app}>
      <NavBar />
      <Banner />
    </header>
  );
}

export default Header


