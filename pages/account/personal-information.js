import React, { useContext } from "react"
import Head from "next/head"
import Navbar from "../../components/Navigation/Navbars/navbar"
import Footer from "../../components/Navigation/Footers/Footer"
import { USERTYPES } from "../../enums/userTypes"
import { UserContext } from "../../contexts/UserContext"
import { Stack } from "@mui/material"
import LoginLayout from "../../components/Layouts/LoginLayout"
import ChangePersonalInformationLayout from "../../components/Layouts/account/ChangePersonalInformationLayout"

function PersonalInformationPage(props) {
  const {} = props

  // Check if user has grant to access that page
  const { user, setUser } = useContext(UserContext)

  return (
    <Stack>
      <Head>
        <title>Quentin Hébert | Mon compte</title>
        <meta name="description" content="Mon compte" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      {!user ? (
        <LoginLayout />
      ) : (
        <ChangePersonalInformationLayout user={user} setUser={setUser} />
      )}

      <Footer />
    </Stack>
  )
}

export default PersonalInformationPage
