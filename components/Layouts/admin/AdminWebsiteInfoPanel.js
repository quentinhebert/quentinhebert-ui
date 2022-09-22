import { Box, Grid, Stack } from "@mui/material"
import CustomCard from "../../ReusableComponents/cards/custom-card"
import CustomCardTitle from "../../ReusableComponents/cards/custom-card-title"
import EndCardButton from "../../ReusableComponents/cards/end-card-button"
import styles from "../../../styles/TextShine.module.css"
import BodyText from "../../ReusableComponents/text/body-text"
import PageTitle from "../../ReusableComponents/titles/page-title"
import CustomModal from "../../ReusableComponents/modals/custom-modal"
import { useState } from "react"
import AdminFooterForm from "../../Forms/admin/admin-footer-form"
import AdminNavbarForm from "../../Forms/admin/admin-navbar-form"
import AdminContactForm from "../../Forms/admin/admin-contact-form"
import AdminBreadcrumbs from "../../ReusableComponents/navigation/breadcrumbs"
import OneActionCardsGrid from "../../ReusableComponents/cards/one-action-cards-grid"

export default function AdminWebsiteInfoPanel() {
  const [openModal, setOpenModal] = useState(false)
  const [dialogContent, setDialogContent] = useState(null)

  const CARDS = [
    {
      title: "Navbar",
      description: "Modifier les noms de pages dans la barre de navigation.",
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
      description: "Modifier les informations du footer (crédits)",
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
    <>
      <Stack direction="column" gap={2} padding="7rem 2rem">
        <Box
          position="fixed"
          width="100%"
          height="100%"
          zIndex={0}
          sx={{
            backgroundImage: "url(/medias/lines.jpg)",
            backgroundSize: "cover",
          }}
        />
        <PageTitle zIndex={1} text="Gérer les informations du site" />
        <AdminBreadcrumbs panel="admin" />
        <Stack zIndex={0}>
          <OneActionCardsGrid cards={CARDS} />
        </Stack>
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
    </>
  )
}
