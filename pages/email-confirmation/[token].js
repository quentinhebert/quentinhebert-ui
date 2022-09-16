import { Stack } from "@mui/material"
import Head from "next/head"
import React from "react"
import EmailConfirmationLayout from "../../components/Layouts/EmailConfirmationLayout"

export default function EmailConfirmationPage(props) {
  return (
    <Stack>
      <Head>
        <title>Quentin Hébert | Confirmez votre e-mail</title>
        <meta
          name="description"
          content="Quentin Hébert | Confirmez votre e-mail"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <EmailConfirmationLayout />
    </Stack>
  )
}
