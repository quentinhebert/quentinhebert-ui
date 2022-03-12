import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
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
        <Link href="/dev">DEV</Link>
        <Link href="/film">FILM</Link>
      </main>
    </div>
  );
}
