import React from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';

export default function DevHomePage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Polygones | DEV</title>
        <meta name="description" content="Développeur" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        On est sur la page DEV
      </main>
    </div>
  );
}
