import { Stack } from "@mui/material"
import { useState } from "react"
import AdminFooterForm from "../../Forms/admin/admin-footer-form"
import AdminNavbarForm from "../../Forms/admin/admin-navbar-form"
import AdminContactForm from "../../Forms/admin/admin-contact-form"
import AdminLogoForm from "../../Forms/admin/admin-logo-form"
import CustomModal from "../../Modals/custom-modal"
import OneActionCardsGrid from "../../Cards/one-action-cards-grid"
import FixedBackground from "../../Backgrounds/fixed-background"

export default function WebsiteInfoPanel_Main() {
  const [openModal, setOpenModal] = useState(false)
  const [dialogContent, setDialogContent] = useState(null)

  const CARDS = [
    {
      title: "Navbar",
      description: "Modifiez les noms de pages dans la barre de navigation.",
      button: {
        text: "Modifier",
        onClick: () => {
          setOpenModal(true)
          setDialogContent("navbar")
        },
      },
    },
    {
      id: "footer",
      title: "Footer",
      description: "Modifiez les informations du footer (crédits)",
      button: {
        text: "Modifier",
        onClick: () => {
          setOpenModal(true)
          setDialogContent("footer")
        },
      },
    },
    {
      id: "contact",
      title: "Contact",
      description: "Modifiez vos informations de contact.",
      button: {
        text: "Modifier",
        onClick: () => {
          setOpenModal(true)
          setDialogContent("contact")
        },
      },
    },
    {
      id: "logo",
      title: "Logo",
      description: "Modifiez votre logo.",
      button: {
        text: "Modifier",
        onClick: () => {
          setOpenModal(true)
          setDialogContent("logo")
        },
      },
    },
  ]

  return (
    <>
      <FixedBackground url="url(/medias/lines.jpg)" />
      <Stack zIndex={0}>
        <OneActionCardsGrid cards={CARDS} />
      </Stack>

      <CustomModal open={openModal} handleClose={() => setOpenModal(false)}>
        {dialogContent === "navbar" && (
          <AdminNavbarForm handleClose={() => setOpenModal(false)} />
        )}
        {dialogContent === "footer" && (
          <AdminFooterForm handleClose={() => setOpenModal(false)} />
        )}
        {dialogContent === "contact" && (
          <AdminContactForm handleClose={() => setOpenModal(false)} />
        )}
        {dialogContent === "logo" && (
          <AdminLogoForm handleClose={() => setOpenModal(false)} />
        )}
      </CustomModal>
    </>
  )
}
