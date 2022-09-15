import React, { useContext } from "react"
import Head from "next/head"
import Navbar from "../../components/Navigation/Navbars/navbar"
import Footer from "../../components/Navigation/Footers/Footer"
import { USERTYPES } from "../../enums/userTypes"
import Redirect from "../../components/Navigation/redirect"
import { UserContext } from "../../contexts/UserContext"
import AdminFilesPanel from "../../components/Layouts/admin/AdminFilesPanel"
import { Stack, Typography } from "@mui/material"

export default function AdminFilesManagementPage(props) {
  const {} = props

  // Check if user has grant to access that page
  const { user } = useContext(UserContext)
  if (!user || user.type !== USERTYPES.ADMIN) return <Redirect />

  return (
    <Stack>
      <Head>
        <title>Mathias Mortelmans | Files</title>
        <meta name="description" content="All files of your website" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Navbar />

      <AdminFilesPanel />
      <Footer bgColor="#272727" />
    </Stack>
  )
}
