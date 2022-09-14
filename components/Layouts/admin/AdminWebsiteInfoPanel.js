import { Box, Grid, Stack, Typography } from "@mui/material"
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
      <Stack
        direction="column"
        gap={4}
        padding={4}
        paddingTop={"7rem"}
        paddingBottom={"7rem"}
      >
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
        <Stack justifyContent="center" direction="row" gap={4} zIndex={1}>
          <Grid container rowSpacing={4} columnSpacing={4}>
            {CARDS.map((cardItem, key) => (
              <Grid
                item
                xs={10}
                sm={6}
                lg={3}
                key={key}
                sx={{ margin: { xs: "0 auto", sm: "0" } }}
              >
                <CustomCard
                  sx={{
                    background: (theme) => theme.palette.background.main,
                  }}
                >
                  <CustomCardTitle className={styles.shine}>
                    {cardItem.title}
                  </CustomCardTitle>
                  <BodyText lineHeight="1.5rem" fontSize="1rem">
                    {cardItem.description}
                  </BodyText>
                  <EndCardButton
                    text={cardItem.button.text}
                    onClick={cardItem.button.onClick}
                  />
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Stack>

      <CustomModal open={openModal} handleClose={() => setOpenModal(false)}>
        {dialogContent === "navbar" && (
          <AdminNavbarForm handleClose={() => setOpenModal(false)} />
        )}
        {dialogContent === "footer" && (
          <AdminFooterForm handleClose={() => setOpenModal(false)} />
        )}
      </CustomModal>
    </>
  )
}
