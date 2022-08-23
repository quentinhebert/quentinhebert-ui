import React from "react"
import Head from "next/head"
import WebsitesIndexLayout from "../../components/Layouts/websites/WebsitesIndexLayout"

export default function WebsitesHomePage() {
  return (
    <>
      <Head>
        <title>Quentin Hébert | Développeur Freelance</title>
        <meta
          name="description"
          content="Développeur Web Freelance : disponible dans toute la France."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://quentinhebert.com/websites" />
        <meta
          name="keywords"
          content="Web, Developper, JavaScript, Full-Stack, Website, Creator, Digital, Internet, Site, Sites, Site vitrine, Front-End, Frontend, Back-End, Backend"
        />
        <meta property="og:image" content="/medias/ogimg.png" />
        <meta property="og:url" content="https://quentinhebert.com/websites" />
        <meta
          property="og:title"
          content="Quentin Hébert | Vidéaste Freelance"
        />
        <meta
          property="og:description"
          content="Développeur Web Freelance : disponible dans toute la France."
        />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <WebsitesIndexLayout />
    </>
  )
}