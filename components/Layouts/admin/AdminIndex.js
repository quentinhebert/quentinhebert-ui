import { Grid, Stack, Typography } from "@mui/material"
import CustomCard from "../../ReusableComponents/cards/custom-card"
import CustomCardTitle from "../../ReusableComponents/cards/custom-card-title"
import EndCardButton from "../../ReusableComponents/cards/end-card-button"
import styles from "../../../styles/TextShine.module.css"
import BodyText from "../../ReusableComponents/text/body-text"
import PageTitle from "../../ReusableComponents/titles/page-title"

const CARDS = [
  {
    title: "Utilisateurs",
    description:
      "Ajoutez, modifiez et supprimez ou ou des utilisateurs de votre site.",
    button: { text: "Gérer les utilisateurs", href: "/admin/manage-users" },
  },
  {
    title: "Contenu",
    description: "Ajoutez, modifiez et supprimez du contenu de votre site.",
    button: { text: "Gérer le contenu", href: "/admin/manage-content" },
  },
  {
    title: "Fichiers",
    description:
      "Ajoutez, modifiez et supprimez ou ou des utilisateurs de votre site.",
    button: { text: "Gérer les fichiers", href: "/admin/manage-files" },
  },
  {
    title: "Informations",
    description: "Modifiez les informations de votre site.",
    button: { text: "Gérer les utilisateurs", href: "/admin/manage-users" },
  },
]

export default function AdminIndex() {
  return (
    <Stack direction="column" marginTop={"65px"} gap={4} padding={4}>
      <PageTitle text="Dashboard" />
      <Stack
        justifyContent="center"
        direction="row"
        gap={4}
        sx={{
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        <Grid container rowSpacing={2} columnSpacing={6}>
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
