import Head from "next/head";
import React from "react";
import EmailConfirmationLayout from "../../components/Layouts/EmailConfirmationLayout";

export default function EmailConfirmationPage(props) {
  return (
    <>
      <Head>
        <title>Mathias Mortelmans Films | Confirm your email</title>
        <meta
          name="description"
          content="Mathias Mortelmans Films | Confirm your email"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <EmailConfirmationLayout />
    </>
  );
}
