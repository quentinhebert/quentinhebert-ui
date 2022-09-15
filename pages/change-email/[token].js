import { Stack } from "@mui/material"
import Head from "next/head"
import React from "react"
import ChangeEmailLayout from "../../components/Layouts/ChangeEmailLayout"

export default function ChangeEmailPage(props) {
  return (
    <Stack>
      <Head>
        <title>Mathias Mortelmans Films | Change your email</title>
        <meta
          name="description"
          content="Mathias Mortelmans Films | Change your email"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <ChangeEmailLayout />
    </Stack>
  )
}
