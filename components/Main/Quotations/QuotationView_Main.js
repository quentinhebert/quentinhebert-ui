import { Stack } from "@mui/material"
import { useRouter } from "next/router"
import { useContext, useEffect, useRef, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import PillButton from "../../Buttons/pill-button"
import CustomForm from "../../Forms/custom-form"
import QuotationClientFieldsForm from "../../Forms/quotations/quotation-client-fields-form"
import CustomFilledInput from "../../Inputs/custom-filled-input"
import AlertInfo from "../../Other/alert-info"
import BodyText from "../../Text/body-text"
import PageTitle from "../../Titles/page-title"
import EastIcon from "@mui/icons-material/East"
import { UserContext } from "../../../contexts/UserContext"
import { USERTYPES } from "../../../enums/userTypes"
import PleaseWait from "../../Helpers/please-wait"
import QuotationReadOnlySection from "../../Sections/Orders/order-read-only-section"
import CenteredMaxWidthContainer from "../../Containers/centered-max-width-container"

export default function QuotationView_Main({}) {
  const router = useRouter()
  const id = router.query.id
  const defaultEmail = router.query.default_email

  const { user } = useContext(UserContext)

  const [email, setEmail] = useState(defaultEmail || "")
  const [access, setAccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [quotation, setQuotation] = useState({
    id: id,
    label: "",
    created_at: null,
    last_update: null,
    status: "",
    recipient_emails: [],
    payment_options: {},
    items: [],
    client: null,
  })

  const handleSubmit = async () => {
    if (!email || !id) return
    const res = await apiCall.quotations.view({ id, email })
    if (res && res.ok) {
      setAccess(true)
      const jsonRes = await res.json()
      setQuotation(jsonRes)
    }
  }

  const fetchQuotation = async () => {
    if (!user || !user.email || !id) return
    setLoading(true)
    const auth =
      user && (user.type === USERTYPES.ADMIN || user.type === USERTYPES.CLIENT)
    const res = await apiCall.quotations.view({ id, email: user.email, auth })
    if (res && res.ok) {
      setAccess(true)
      const jsonRes = await res.json()
      setQuotation(jsonRes)
    }
    setLoading(false)
  }

  const handleRefuse = async () => {
    const res = await apiCall.quotations.refuse(quotation)
    if (res && res.ok) {
      window.opener = null
      window.open("", "_self")
      window.close()
    }
  }

  useEffect(() => {
    fetchQuotation()
  }, [user, id])
  useEffect(() => {
    if (!!defaultEmail) handleSubmit()
  }, [defaultEmail])

  if (loading)
    return (
      <Stack padding="100px 1rem" gap={4}>
        <PleaseWait />
      </Stack>
    )

  if (!access)
    return (
      <Stack padding="2rem" gap={4}>
        <PageTitle text="Aperçu du devis" />
        <BodyText>
          Afin d'accéder au devis, veuillez renseigner votre adresse e-mail
          (l'adresse e-mail sur laquelle vous avez reçu le lien du devis).
        </BodyText>

        <CustomForm>
          <Stack className="row gap-10 full-width flex-center">
            <Stack maxWidth="300px">
              <CustomFilledInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Mon adresse e-mail"
              />
            </Stack>
            <PillButton type="submit" onClick={handleSubmit}>
              Voir le devis
            </PillButton>
          </Stack>
        </CustomForm>
      </Stack>
    )

  return (
    <Stack padding="2rem" gap={2} width="100%">
      <PageTitle text="1. Récapitulatif du devis" />
      <AlertInfo
        content={{
          show: true,
          severity: "info",
          text: "Pour que le devis ait une valeur juridique et commerciale, il doit être généré avec les informations du client (étape 2.), être imprimé en deux exemplaires et être signé par les deux parties.",
        }}
      />

      <QuotationReadOnlySection items={quotation.items} quotation={quotation} />

      <PillButton onClick={handleRefuse}>Refuser</PillButton>
      <PillButton onClick={handleRefuse}>Suivant</PillButton>

      <Stack marginTop={4} gap={2}>
        <PageTitle text="2. Récapitulatif du client" />
        <BodyText>{">"} Envoyer ce formulaire directement au client</BodyText>

        <AlertInfo
          content={{
            show: true,
            severity: "info",
            text: "Les informations suivantes ci-dessous sont nécessaires la génération du devis définitif. Ce sont les mentions légales obligatoires à faire apparaître sur un devis.",
          }}
        />
        <CenteredMaxWidthContainer>
          <QuotationClientFieldsForm defaultClient={quotation.client} />
        </CenteredMaxWidthContainer>
      </Stack>

      <Stack marginTop={4} gap={2}>
        <PageTitle text="3. Générer le PDF" />
      </Stack>
    </Stack>
  )
}
