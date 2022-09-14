import React, { useContext, useState } from "react"
import Head from "next/head"
import Navbar from "../../components/Navigation/Navbars/navbar"
import Footer from "../../components/Navigation/Footers/Footer"
import { USERTYPES } from "../../enums/userTypes"
import { UserContext } from "../../contexts/UserContext"
import AdminIndex from "../../components/Layouts/admin/AdminIndex"
import LoginLayout from "../../components/Layouts/LoginLayout"

export default function AdminManageWebsiteInformations(props) {
  const {} = props

  // Check if user has grant to access that page
  const { user } = useContext(UserContext)

  return (
    <>
      <Head>
        <title>Quentin Hébert | Admin | Gérer les informations du site</title>
        <meta
          name="description"
          content="Page administrateur : gérer les informations du site"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Navbar />

      {!user || user.type !== USERTYPES.ADMIN ? (
        <LoginLayout />
      ) : (
        <AdminIndex />
      )}
      <Footer />
    </>
  )
}
