import React from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import NavbarFilm from '../../components/Navigation/Navbars/navbar-film';
import Footer from '../../components/Navigation/Footers/Footer';

export default function FilmHomePage() {
  return (
    <>
      <Head>
        <title>Polygones | FILM</title>
        <meta name="description" content="Filmmaker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavbarFilm />

      <main className={styles.main}>
        On est sur la page FILM
      </main>

      <Footer bgColor="#8F3731" />
    </>
  );
}
