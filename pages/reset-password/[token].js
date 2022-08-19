import Head from "next/head";
import React from "react";
import ResetPassordLayout from "../../components/Layouts/ResetPasswordLayout";

export default function ResetPassordPage(props) {
  return (
    <>
      <Head>
        <title>Mathias Mortelmans Films | Reset your password</title>
        <meta
          name="description"
          content="Mathias Mortelmans Films | Reset your password"
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ResetPassordLayout />
    </>
  );
}
