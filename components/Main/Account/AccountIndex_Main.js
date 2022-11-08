import OneActionCardsGrid from "../../Cards/one-action-cards-grid"

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

export default function AccountIndex_Main({}) {
  return <OneActionCardsGrid cards={CARDS} />
}
