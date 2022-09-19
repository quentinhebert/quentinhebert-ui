import { Stack } from "@mui/material"
import Head from "next/head"
import Custom401Layout from "../components/Layouts/error/Custom401Layout"
import Footer from "../components/Navigation/Footers/Footer"
import Navbar from "../components/Navigation/Navbars/navbar"

export default function Custom401Page() {
  return (
    <Stack minHeight="100vh">
      <Head>
        <title>Quentin Hébert | 401 | Accès non autorisé</title>
        <meta
          name="description"
          content="Quentin Hébert | 401 | Accès non autorisé"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <Custom401Layout />

      <Footer />
    </Stack>
  )
}
