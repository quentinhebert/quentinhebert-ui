import Head from "next/head"
import Custom404Layout from "../components/Layouts/error/Custom404Layout"
import { Stack } from "@mui/material"
import Footer from "../components/Navigation/Footers/Footer"
import Navbar from "../components/Navigation/Navbars/navbar"

export default function Custom404Page() {
  return (
    <Stack minHeight="100vh">
      <Head>
        <title>Quentin Hébert | 404 | Page inexistante</title>
        <meta
          name="description"
          content="Quentin Hébert | 404 | Page inexistante"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <Custom404Layout />

      <Footer />
    </Stack>
  )
}
