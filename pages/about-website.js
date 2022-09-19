import Head from "next/head"
import Navbar from "../components/Navigation/Navbars/navbar"
import Footer from "../components/Navigation/Footers/Footer"
import AboutWebsiteLayout from "../components/Layouts/AboutWebsiteLayout"

export default function AboutWebsitePage() {
  return (
    <>
      <Head>
        <title>Quentin Hébert | À propos du site</title>
        <meta
          name="description"
          content="Quentin Hébert | Quelques infos au sujet de mon site internet..."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <AboutWebsiteLayout />

      <Footer />
    </>
  )
}
