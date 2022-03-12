import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Polygones</title>
        <meta name="description" content="Société de développeurs et filmmakers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <a href="/dev">DEV</a>
        <a href="/film">FILM</a>
      </main>
    </div>
  );
}
