import React from "react";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Navbar from "../../components/Navigation/Navbars/navbar";
import Footer from "../../components/Navigation/Footers/Footer";

export default function DevHomePage() {
  return (
    <>
      <Head>
        <title>Polygones | DEV</title>
        <meta name="description" content="Développeur" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar dev />

      <main className={styles.main}>On est sur la page DEV</main>
      <Footer bgColor="#3A81CC" />
    </>
  );
}
