import React from "react"
import Head from "next/head"
import IndexLayout from "../components/Layouts/IndexLayout"

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Quentin Hébert | Freelance</title>
        <meta
          name="description"
          content="Vidéaste et Développeur web en Freelance."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mathiasmortelmans.com" />
        <meta
          name="keywords"
          content="Filmmaker, Filmmaking, Videomaker, editor, content creator, wedding filmmaker, belgium, advertising, corporate videos, corporate filmmaking"
        />
        <meta property="og:image" content="/medias/ogimg.png" />
        <meta property="og:url" content="https://mathiasmortelmans.com" />
        <meta property="og:title" content="Mathias Mortelmans Films | Home" />
        <meta
          property="og:description"
          content="Belgian creative filmmaker for weddings, corporate, nightlife videos, and so much more !"
        />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <IndexLayout />
    </>
  )
}
