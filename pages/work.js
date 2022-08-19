import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import WorkLayout from "../components/Layouts/WorkLayout.js";

export default function WorkPage(props) {
  return (
    <>
      <Head>
        <title>MM Films | My work</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="Belgian creative filmmaker for weddings, corporate, nightlife videos, and so much more !"
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
          content="Mathias Mortelmans Films | My work"
        />
        <meta
          property="og:description"
          content="Belgian creative filmmaker for weddings, corporate, nightlife videos, and so much more !"
        />
        <meta property="og:type" content="website" />
      </Head>

      <WorkLayout />
    </>
  );
}
