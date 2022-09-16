import { Stack } from "@mui/material"
import PageTitle from "../../ReusableComponents/titles/page-title"
import OneActionCardsGrid from "../../ReusableComponents/cards/one-action-cards-grid"

const CARDS = [
  {
    title: "Informations personnelles",
    description:
      "Modifiez vos informations personnelles (avatar, e-mail, téléphone...).",
    button: { text: "Accéder", href: "/account/personal-information" },
  },
]

export default function AccountIndex(props) {
  const {} = props

  return (
    <Stack
      flexGrow={1}
      direction="column"
      gap={4}
      padding={4}
      paddingTop={"7rem"}
      paddingBottom={"7rem"}
    >
      <PageTitle zIndex={1} text="Mon compte" />

      <OneActionCardsGrid cards={CARDS} />
    </Stack>
  )
}
