import OneActionCardsGrid from "../../ReusableComponents/cards/one-action-cards-grid"
import AccountPagesLayout from "../AccountPagesLayout"

const CARDS = [
  {
    title: "Informations personnelles",
    description:
      "Modifiez vos informations personnelles (avatar, e-mail, téléphone...).",
    button: { text: "Accéder", href: "/account/personal-information" },
  },
  {
    title: "Sécurité",
    description:
      "Gérez vos sessions de connexion, modifiez votre mot de passe...",
    button: { text: "Accéder", href: "/account/security" },
  },
]

export default function AccountIndex(props) {
  const {} = props

  return (
    <AccountPagesLayout title="Mon compte" noBreadcrumbs>
      <OneActionCardsGrid cards={CARDS} />
    </AccountPagesLayout>
  )
}
