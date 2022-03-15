import React from "react";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import NavbarDev from "../../components/Navigation/Navbars/navbar-dev";
import Footer from "../../components/Navigation/Footers/Footer";

export default function DevHomePage() {
  return (
    <>
      <Head>
        <title>Polygones | DEV</title>
        <meta name="description" content="Développeur" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarDev />

      <main className={styles.main}>On est sur la page DEV</main>
      <Footer bgColor="#3A81CC" />
    </>
  );
}
