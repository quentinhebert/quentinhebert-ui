import { Box, Grid, Stack, Typography } from "@mui/material"
import CustomCard from "../../ReusableComponents/cards/custom-card"
import CustomCardTitle from "../../ReusableComponents/cards/custom-card-title"
import EndCardButton from "../../ReusableComponents/cards/end-card-button"
import styles from "../../../styles/TextShine.module.css"
import BodyText from "../../ReusableComponents/text/body-text"
import PageTitle from "../../ReusableComponents/titles/page-title"

const CARDS = [
  {
    title: "Informations",
    description:
      "Modifiez les informations de votre site (descriptions, footer, barre de navigation...).",
    button: { text: "Gérer", href: "/admin/manage-website-informations" },
  },
  {
    title: "Contenu",
    description: "Ajoutez, modifiez et supprimez du contenu de votre site.",
    button: { text: "Gérer", href: "/admin/manage-content" },
  },
  {
    title: "Utilisateurs",
    description:
      "Ajoutez, modifiez et supprimez ou ou des utilisateurs de votre site.",
    button: { text: "Gérer", href: "/admin/manage-users" },
  },
  {
    title: "Fichiers",
    description:
      "Ajoutez, modifiez et supprimez ou ou des utilisateurs de votre site.",
    button: { text: "Gérer", href: "/admin/manage-files" },
  },
]

export default function AdminIndex() {
  return (
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
      <PageTitle zIndex={1} text="Dashboard" />
      <Stack
        justifyContent="center"
        direction="row"
        gap={4}
        zIndex={1}
        sx={{
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        <Grid container rowSpacing={4} columnSpacing={4}>
          {CARDS.map((cardItem, key) => (
            <Grid item xs={10} sm={6} lg={3} key={key} margin="0 auto">
              <CustomCard
                sx={{
                  background: (theme) =>
                    `linear-gradient(100deg, ${theme.palette.background.main} 0%, rgb(0,0,0,1) 80%)`,
                }}
              >
                <CustomCardTitle className={styles.shine} color="secondary">
                  {cardItem.title}
                </CustomCardTitle>
                <BodyText lineHeight="1.5rem" fontSize="1rem">
                  {cardItem.description}
                </BodyText>
                <EndCardButton
                  text={cardItem.button.text}
                  href={cardItem.button.href}
                />
              </CustomCard>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  )
}
