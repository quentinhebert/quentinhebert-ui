import React, { useContext } from "react"
import Head from "next/head"
import Navbar from "../../components/Navigation/Navbars/navbar"
import Footer from "../../components/Navigation/Footers/Footer"
import Redirect from "../../components/Navigation/redirect"
import { UserContext } from "../../contexts/UserContext"
import AccountIndex from "../../components/Layouts/account/AccountIndex"
import { Stack } from "@mui/material"
import LoginLayout from "../../components/Layouts/LoginLayout"

function AccountIndexPage(props) {
  const {} = props

  // Check if user has grant to access that page
  const { user } = useContext(UserContext)

  return (
    <Stack minHeight="100vh">
      <Head>
        <title>
          Quentin Hébert | Mon compte | Mes informations personnelles
        </title>
        <meta name="description" content="Mon compte" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      {!user ? <LoginLayout /> : <AccountIndex user={user} />}

      <Footer />
    </Stack>
  )
}

export default AccountIndexPage
