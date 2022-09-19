import React, { useContext, useState } from "react"
import Head from "next/head"
import ContactLayout from "../components/Layouts/contact/ContactLayout"

function ContactPage(props) {
  const {} = props

  return (
    <>
      <Head>
        <title>Quentin Hébert | Contact</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="Contactez-moi si vous avez un projet et que vous souhaitez collaborer !"
        />
        <link rel="canonical" href="https://quentinhebert.com" />
        <meta
          name="keywords"
          content="Filmmaker, Filmmaking, Videomaker, editor, content creator, wedding filmmaker, france, advertising, corporate videos, corporate filmmaking"
        />
        <meta property="og:image" content="/medias/ogimg.png" />
        <meta property="og:url" content="https://quentinhebert.com" />
        <meta property="og:title" content="Quentin Hébert | Contact" />
        <meta
          property="og:description"
          content="Contactez-moi si vous avez un projet et que vous souhaitez collaborer !"
        />
        <meta property="og:type" content="website" />
      </Head>

      <ContactLayout />
    </>
  )
}

export default ContactPage
