import React from "react"
import Head from "next/head"
import FilmsIndexLayout from "../../components/Layouts/films/FilmsIndexLayout"

export default function FilmsHomePage() {
  return (
    <>
      <Head>
        <title>Quentin Hébert | Vidéaste Freelance</title>
        <meta
          name="description"
          content="Réalisateur – Cadreur – Monteur : disponible dans toute la France."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://quentinhebert.com/films" />
        <meta
          name="keywords"
          content="Filmmaker, Filmmaking, Videomaker, editor, content creator, wedding filmmaker, france, advertising, corporate videos, corporate filmmaking, vidéaste, mariage, réalisateur, cadreur, monteur, freelance, auto-entrepreneur, indépendant"
        />
        <meta property="og:image" content="/medias/ogimg.png" />
        <meta property="og:url" content="https://quentinhebert.com/films" />
        <meta
          property="og:title"
          content="Quentin Hébert | Vidéaste Freelance"
        />
        <meta
          property="og:description"
          content="Réalisateur – Cadreur – Monteur : disponible dans toute la France."
        />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <FilmsIndexLayout />
    </>
  )
}
