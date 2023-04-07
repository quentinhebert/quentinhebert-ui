import { Stack, Typography } from "@mui/material"
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
import CloseIcon from "@mui/icons-material/Close"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import { UserContext } from "../../../contexts/UserContext"
import { USERTYPES } from "../../../enums/userTypes"
import PleaseWait from "../../Helpers/please-wait"
import OrderReadOnlySection from "../../Sections/Orders/order-read-only-section"
import CenteredMaxWidthContainer from "../../Containers/centered-max-width-container"
import PriceDetails from "../../Sections/Account/Orders/price-details"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const CTAButton = ({ color, boxShadow, sx, ...props }) => (
  <Stack
    width="100%"
    className="flex-center row gap-10"
    sx={{
      color,
      padding: "1rem 2rem",
      transition: ".2s ease-in-out",
      borderRadius: "30px",
      cursor: "pointer",
      "&:hover": {
        boxShadow,
      },
      ...sx,
    }}
    {...props}
  />
)

export default function QuotationView_Main({}) {
  const router = useRouter()
  const id = router.query.id
  const defaultEmail = router.query.default_email

  const { user } = useContext(UserContext)

  const [step, setStep] = useState(1)
  const [email, setEmail] = useState(null)
  const [access, setAccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [order, setOrder] = useState({
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

  const handleNext = () => setStep(2)
  const handlePrevious = () => setStep(1)
  const handleSubmit = async () => {
    if ((!email && !defaultEmail) || !id) return
    const res = await apiCall.quotations.view({
      id,
      email: email || defaultEmail,
    })
    if (res && res.ok) {
      setAccess(true)
      const jsonRes = await res.json()
      setOrder(jsonRes)
    }
  }
  const toggleShowDetails = () => {
    if (showDetails) setShowDetails(false)
    else setShowDetails(true)
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
      setOrder(jsonRes)
    }
    setLoading(false)
  }

  const handleRefuse = async () => {
    const res = await apiCall.quotations.refuse(order)
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
    if (defaultEmail) handleSubmit()
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
    <Stack padding="2rem" gap="2rem" width="100%">
      {step === 1 && (
        <Stack gap={4}>
          <PageTitle text="1. Votre devis" />
          <Typography color="#fff" variant="h5">
            {order.label}
          </Typography>
          <Stack gap={4}>
            <PriceDetails order={order} items={order.items} />
            <Stack
              color="#fff"
              className="row flex-center pointer"
              gap={2}
              onClick={toggleShowDetails}
            >
              <Typography
                className="cool-button"
                variant="h4"
                sx={{
                  "&:hover": { color: (theme) => theme.palette.secondary.main },
                }}
              >
                Voir les détails
              </Typography>
              <ExpandMoreIcon
                sx={{
                  fontSize: "2rem",
                  transition: ".2s ease",
                  rotate: showDetails ? "180deg" : 0,
                }}
              />
            </Stack>
            <Stack>
              {showDetails && (
                <OrderReadOnlySection
                  items={order.items}
                  order={order}
                  hidePriceDetails
                />
              )}
            </Stack>
          </Stack>
        </Stack>
      )}

      {/********* BUTTONS *********/}
      <Stack
        className="full-width"
        gap={4}
        color="#fff"
        sx={{ flexDirection: "column-reverse" }}
      >
        <CTAButton
          color={(theme) => theme.alert.title.error.color}
          boxShadow={(theme) => `0 0 10px 6px ${theme.alert.title.error.color}`}
          onClick={handleRefuse}
        >
          <Typography variant="h6">Refuser ce devis</Typography>
          <CloseIcon sx={{ fontSize: "2rem" }} />
        </CTAButton>
        <CTAButton
          boxShadow={(theme) =>
            `0 0 10px 6px ${theme.alert.title.success.color}`
          }
          color={(theme) => theme.alert.title.success.color}
          sx={{
            "&& > .MuiSvgIcon-root": { transition: ".15s ease-in-out" },
            boxShadow: (theme) =>
              `0 0 15px 6px ${theme.alert.title.success.color}`,
            "&:hover": {
              boxShadow: (theme) =>
                `0 0 15px 10px ${theme.alert.title.success.color}`,
              "&& > .MuiSvgIcon-root": { translate: "15px" },
            },
          }}
        >
          <Typography variant="h6">
            Accepter le devis et passer à l'étape suivante
          </Typography>
          <ArrowRightAltIcon sx={{ fontSize: "2rem" }} />
        </CTAButton>
      </Stack>

      {step === 2 && (
        <Stack marginTop={4} gap={2}>
          <PageTitle text="2. Vos informations" />

          <AlertInfo
            content={{
              show: true,
              severity: "info",
              text: "Veuillez renseigner vos informations afin de compléter le devis. Les champs ci-dessous correspondent aux mentions légales obligatoires du devis.",
            }}
          />
          <CenteredMaxWidthContainer>
            <QuotationClientFieldsForm defaultClient={order.client} />
          </CenteredMaxWidthContainer>
        </Stack>
      )}
    </Stack>
  )
}
