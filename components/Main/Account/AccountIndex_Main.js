import BtnCardsGrid from "../../Cards/btn-cards-grid"

const CARDS = [
  {
    title: "Informations personnelles",
    button: { text: "Accéder", href: "/account/personal-information" },
  },
  {
    title: "Sécurité",
    button: { text: "Accéder", href: "/account/security" },
  },
]

export default function AccountIndex_Main({}) {
  return <BtnCardsGrid cards={CARDS} />
}
