import React from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';

export default function FilmHomePage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Polygones | FILM</title>
        <meta name="description" content="Filmmaker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        On est sur la page FILM
      </main>
    </div>
  );
}
