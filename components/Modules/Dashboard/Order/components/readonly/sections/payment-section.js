import { useContext, useState } from "react"
import { getNextPaymentDetails } from "../../../../../../../services/orders"
import { Context, FormCard, MODALS, MODES } from "../../../module"
import { PAYMENTSTATES } from "../../../../../../../enums/paymentStates"
import { Stack, Tooltip, Typography } from "@mui/material"
import BodyText from "../../../../../../Text/body-text"
import CustomCard from "../../../../../../Cards/custom-card"
import { formatPrice } from "../../../../../../../services/utils"
import InsertLinkIcon from "@mui/icons-material/InsertLink"
import SimpleCheckIcon from "@mui/icons-material/Check"
import PillButton from "../../../../../../Buttons/pill-button"
import { checkBeforeGen } from "../../../../../../../services/quotations"
import { AppContext } from "../../../../../../../contexts/AppContext"
import Pill from "../../../../../../Text/pill"
import {
  PAYMENT_TYPES,
  STRIPE_PM,
} from "../../../../../../../enums/paymentTypes"
import { formatDayDate } from "../../../../../../../services/date-time"

export function PaymentSection() {
  const { state, setState, handleOpenModal } = useContext(Context)
  const { setSnackMessage, setSnackSeverity } = useContext(AppContext)

  const nextPayment = getNextPaymentDetails({ order: state.order })
  const [paymentEmail, setPaymentEmail] = useState(null)

  // If mission paid, payment section not displayed
  if (state.order.status === "PAYMENT_SUCCEEDED") return <PaymentsList />

  return (
    <>
      <PaymentsList />

      <FormCard textAlign="center">
        <Stack width="100%" maxWidth="500px" margin="auto" gap={2}>
          <CustomCard gap={4} backgroundColor="rgb(0,0,0, 0.6)">
            <Typography>
              Prochain paiement ({nextPayment.paymentStep})
            </Typography>

            <Stack>
              <Typography color="secondary" variant="h2">
                {formatPrice(nextPayment.amount)}€
              </Typography>
              <Typography textTransform="capitalize" color="grey">
                {nextPayment.label} ({nextPayment.percent})
              </Typography>
            </Stack>

            <Stack gap={2}>
              <PillButton
                onClick={handleGeneratePaymentLink}
                textTransform="initial"
                width="auto"
                endIcon={<InsertLinkIcon />}
              >
                Générer un lien de paiement en ligne
              </PillButton>
              <Tooltip
                title={
                  !state.order.client?.id
                    ? "Vous devez assigner un client."
                    : ""
                }
              >
                <div>
                  <PillButton
                    disabled={!state.order.client?.id}
                    textTransform="initial"
                    background="transparent"
                    border={(theme) =>
                      `1px solid ${theme.palette.secondary.main}`
                    }
                    color={(theme) => theme.palette.secondary.main}
                    onClick={() => handleOpenModal(MODALS.TAG)}
                    width="auto"
                    endIcon={<SimpleCheckIcon />}
                  >
                    Marquer le prochain paiement comme réglé
                  </PillButton>
                </div>
              </Tooltip>
            </Stack>
          </CustomCard>
        </Stack>
      </FormCard>
    </>
  )

  async function handleGeneratePaymentLink() {
    const localErrors = checkBeforeGen(state.order)

    setState({ ...state, errors: localErrors })
    const errorsCount = Object.values(localErrors).filter(
      (elt) => elt === true
    ).length

    if (errorsCount === 0 || (errorsCount === 1 && localErrors.client)) {
      setPaymentEmail(state.order.client?.email)
      handleOpenModal(MODALS.PAYMENT)
    } else {
      setSnackMessage(
        `Certains champs sont manquants dans les conditions et mentions obligatoires.`
      )
      setSnackSeverity("error")
      setState({ ...state, mode: MODES.EDIT })
    }
  }
}

function PaymentsList() {
  const { state } = useContext(Context)

  if (!state.order.payments.length) return <></>
  return (
    <FormCard gap={2}>
      <BodyText preventTransition fontSize="1rem" color="grey">
        Récapitulatif des paiements
      </BodyText>

      <Stack gap={1}>
        {state.order.payments.map((payment, key) => {
          const bgColor = (theme) =>
            theme.alert.title[PAYMENTSTATES[payment.status].severity].background
          const color = (theme) =>
            theme.alert.title[PAYMENTSTATES[payment.status].severity].color
          const border = (theme) =>
            `1px solid ${
              theme.alert.title[PAYMENTSTATES[payment.status].severity].color
            }`
          return (
            <Stack
              key={key}
              flexDirection="row"
              gap={1}
              justifyContent="space-between"
              alignItems="center"
              sx={{
                background: "rgb(0,0,0,0.3)",
                padding: ".5rem 1.5rem",
                borderRadius: "20px",
              }}
            >
              <Stack flexDirection="row" gap={2} alignItems="center">
                <Pill
                  preventTransition
                  bgColor={bgColor}
                  border={border}
                  padding="0rem .75rem"
                  lineHeight="0"
                >
                  <BodyText fontSize="1rem" color={color} preventTransition>
                    {PAYMENTSTATES[payment.status].label}
                  </BodyText>
                </Pill>
                <BodyText preventTransition fontSize="1rem">
                  {payment.amount / 100}€
                </BodyText>
                <BodyText preventTransition fontSize="1rem" color="grey">
                  {!!payment.metadata?.type && (
                    <>
                      {STRIPE_PM[payment.metadata?.type]}:{" "}
                      {payment.metadata?.type === "card" &&
                        `**** **** **** ${payment.metadata?.last4}`}
                      {payment.metadata?.type === "sepa_debit" &&
                        `FR** **** **** **** **** ***${
                          payment.metadata?.last4[0]
                        } ${payment.metadata?.last4.slice(1)}`}
                    </>
                  )}
                  {/* FIXME: FR is hard written, should be dynamic */}
                </BodyText>
              </Stack>

              <Stack flexDirection="row" gap={2}>
                <BodyText
                  fontSize="1rem"
                  color="grey"
                  preventTransition
                  fontStyle="italic"
                >
                  {PAYMENT_TYPES[payment.type].label}
                </BodyText>
                <BodyText fontSize="1rem" color="grey" preventTransition>
                  {formatDayDate({ timestamp: payment.created_at })}
                </BodyText>
              </Stack>
            </Stack>
          )
        })}
      </Stack>
    </FormCard>
  )
}
