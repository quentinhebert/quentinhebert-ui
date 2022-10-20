import { Box, Stack } from "@mui/material"
import PageTitle from "../../ReusableComponents/titles/page-title"
import CustomModal from "../../ReusableComponents/modals/custom-modal"
import { useState } from "react"
import AdminFooterForm from "../../Forms/admin/admin-footer-form"
import AdminNavbarForm from "../../Forms/admin/admin-navbar-form"
import AdminContactForm from "../../Forms/admin/admin-contact-form"
import AdminBreadcrumbs from "../../ReusableComponents/navigation/breadcrumbs"
import OneActionCardsGrid from "../../ReusableComponents/cards/one-action-cards-grid"
import AdminPagesLayout from "../AdminPagesLayout"
import FixedBackground from "../../ReusableComponents/backgrounds/fixed-background"

export default function AdminWebsiteInfoPanel() {
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
  ]

  return (
    <AdminPagesLayout title="Gérer les informations du site">
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
      </CustomModal>
    </AdminPagesLayout>
  )
}
