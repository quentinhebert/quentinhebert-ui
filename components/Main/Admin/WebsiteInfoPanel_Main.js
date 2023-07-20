import { Stack } from "@mui/material"
import { useState } from "react"
import AdminFooterForm from "../../Forms/admin/admin-footer-form"
import AdminNavbarForm from "../../Forms/admin/admin-navbar-form"
import AdminContactForm from "../../Forms/admin/admin-contact-form"
import AdminLogoForm from "../../Forms/admin/admin-logo-form"
import AdminTermsOfUseForm from "../../Forms/admin/admin-terms-of-use-form"
import AdminTermsAndConditionsForm from "../../Forms/admin/admin-terms-and-conditions-form"
import CustomModal from "../../Modals/custom-modal"
import OneActionCardsGrid from "../../Cards/one-action-cards-grid"
import FixedBackground from "../../Backgrounds/fixed-background"
import CenteredMaxWidthContainer from "../../Containers/centered-max-width-container"
import AdminQandAForm from "../../Forms/admin/admin-q-and-a-form"
import AdminIntroVideoForm from "../../Forms/admin/admin-intro-video-form"

export default function WebsiteInfoPanel_Main() {
  const [openModal, setOpenModal] = useState(false)
  const [modalFullscreen, setModalFullscreen] = useState(false)
  const [dialogContent, setDialogContent] = useState(null)

  const handleClose = () => {
    setOpenModal(false)
    setModalFullscreen(false)
  }

  const CARDS = [
    {
      title: "Navbar",
      description: "Modifiez les noms de pages dans la barre de navigation.",
      button: {
        text: "Modifier",
        onClick: () => {
          setOpenModal(true)
          setModalFullscreen(true)
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
          setModalFullscreen(true)
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
          setModalFullscreen(true)
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
          setModalFullscreen(true)
          setDialogContent("logo")
        },
      },
    },
    {
      id: "terms_of_use",
      title: "CGU",
      description: "Modifiez vos Conditions Générales d'Utilisation (CGU).",
      button: {
        text: "Modifier",
        onClick: () => {
          setOpenModal(true)
          setModalFullscreen(true)
          setDialogContent("terms_of_use")
        },
      },
    },
    {
      id: "terms_and_conditions",
      title: "Mentions Légales",
      description:
        "Modifiez vos mentions légales, vos Conditions Générales de Vente (CGV), SIRET, et RCS.",
      button: {
        text: "Modifier",
        onClick: () => {
          setOpenModal(true)
          setModalFullscreen(true)
          setDialogContent("terms_and_conditions")
        },
      },
    },
    {
      id: "q_and_a",
      title: "FAQ",
      description: "Modifiez vos Questions/Réponses.",
      button: {
        text: "Modifier",
        onClick: () => {
          setOpenModal(true)
          setModalFullscreen(true)
          setDialogContent("q_and_a")
        },
      },
    },
    {
      id: "introduction_video",
      title: "Vidéo de présentation",
      description:
        "Indiquez l'URL Youtube ou Vimeo de votre vidéo de présentation.",
      button: {
        text: "Modifier",
        onClick: () => {
          setOpenModal(true)
          setModalFullscreen(false)
          setDialogContent("introduction_video")
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

      <CustomModal
        open={openModal}
        handleClose={handleClose}
        fullscreen={modalFullscreen ? true : null}
      >
        <CenteredMaxWidthContainer>
          {dialogContent === "navbar" && (
            <AdminNavbarForm handleClose={handleClose} />
          )}
          {dialogContent === "footer" && (
            <AdminFooterForm handleClose={handleClose} />
          )}
          {dialogContent === "contact" && (
            <AdminContactForm handleClose={handleClose} />
          )}
          {dialogContent === "logo" && (
            <AdminLogoForm handleClose={handleClose} />
          )}
          {dialogContent === "terms_of_use" && (
            <AdminTermsOfUseForm handleClose={handleClose} />
          )}
          {dialogContent === "terms_and_conditions" && (
            <AdminTermsAndConditionsForm handleClose={handleClose} />
          )}
          {dialogContent === "q_and_a" && (
            <AdminQandAForm handleClose={handleClose} />
          )}
          {dialogContent === "introduction_video" && (
            <AdminIntroVideoForm handleClose={handleClose} />
          )}
        </CenteredMaxWidthContainer>
      </CustomModal>
    </>
  )
}
