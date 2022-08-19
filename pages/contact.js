import React, { useContext, useState } from "react";
import Head from "next/head";
import { UserContext } from "../contexts/UserContext";
import ContactLayout from "../components/Layouts/contact/ContactLayout";
import { useRouter } from "next/router";

function ContactPage(props) {
  const {} = props;

  return (
    <>
      <Head>
        <title>Mathias Mortelmans | Contact</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="Contact me! I'm a belgian creative filmmaker for weddings, corporate, nightlife videos, and so much more!"
        />
        <link rel="canonical" href="https://mathiasmortelmans.com" />
        <meta
          name="keywords"
          content="Filmmaker, Filmmaking, Videomaker, editor, content creator, wedding filmmaker, belgium, advertising, corporate videos, corporate filmmaking"
        />
        <meta property="og:image" content="/medias/ogimg.png" />
        <meta property="og:url" content="https://mathiasmortelmans.com" />
        <meta
          property="og:title"
          content="Mathias Mortelmans Films | Contact"
        />
        <meta
          property="og:description"
          content="Contact me! I'm belgian creative filmmaker for weddings, corporate, nightlife videos, and so much more !"
        />
        <meta property="og:type" content="website" />
      </Head>

      <ContactLayout />
    </>
  );
}

export default ContactPage;
