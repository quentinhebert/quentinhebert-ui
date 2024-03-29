import { Button, Divider, Grid, Stack, Typography } from "@mui/material"
import apiCall from "../../../../services/apiCalls/apiCall"
import { useRouter } from "next/router"
import PillButton from "../../../Buttons/pill-button"
import CustomCard from "../../../Cards/custom-card"
import BodyText from "../../../Text/body-text"
import { zeroPad } from "../../../../services/utils"
import useConfirm from "../../../../hooks/useConfirm"
import { useContext, useState } from "react"
import { UserContext } from "../../../../contexts/UserContext"
import { AppContext } from "../../../../contexts/AppContext"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
import { Paypal } from "grommet-icons"
import PleaseWait from "../../../Helpers/please-wait"
import CustomModal from "../../../Modals/custom-modal"

export default function SelectPaymentMethodSection({
  orderId,
  order,
  setOrder,
  invoiceAddress,
  deliveryAddress,
  handleSelectPm,
}) {
  const router = useRouter()
  const ConfirmationDialog = useConfirm()
  const { user } = useContext(UserContext)
  const { setSnackMessage, setSnackSeverity } = useContext(AppContext)

  const [loading, setLoading] = useState(false)

  // HANDLERS
  const handleRedirectCheckout =
    (paymentMethodType) =>
    async ({ paymentMethodId }) => {
      setLoading(true)
      const res = await apiCall.orders.getCheckoutClientSecret({
        order: { id: orderId },
        invoiceAddress,
        deliveryAddress,
        payment_method: paymentMethodId,
        payment_method_type: paymentMethodType,
      })
      if (res && res.ok) {
        const jsonRes = await res.json()
        router.push(
          `/account/orders/${orderId}/checkout/${jsonRes.client_secret}`
        )
      }
      setLoading(false)
    }
  const handleDetachPM = async (paymentMethod) => {
    const title = !!paymentMethod.card
      ? "Supprimer la carte"
      : "Supprimer le compte"

    const message = !!paymentMethod.card ? (
      <>
        Êtes-vous sûr de vouloir supprimer la carte ci-dessous ?
        <p />
        Num. **** **** **** {paymentMethod.card.last4}
        <br />
        Exp. {zeroPad(paymentMethod.card.exp_month, 2)}/
        {paymentMethod.card.exp_year}
      </>
    ) : (
      <>
        Êtes-vous sûr de vouloir supprimer le compte bancaire ci-dessous ?
        <p />
        IBAN {paymentMethod.sepa_debit.country} ** **** **** **** ***
        {paymentMethod.sepa_debit.last4[0]} {paymentMethod.sepa_debit.last4[1]}
        {paymentMethod.sepa_debit.last4[2]}
        {paymentMethod.sepa_debit.last4[3]}
      </>
    )
    const nextBtnText = !!paymentMethod.card
      ? "Oui, supprimer la carte"
      : "Oui, supprimer le compte"
    const nextAction = async () => await detachPM(paymentMethod)
    ConfirmationDialog.setContent({ title, message, nextAction, nextBtnText })
    ConfirmationDialog.handleOpen()
  }
  const detachPM = async (paymentMethod) => {
    const res = await apiCall.users.paymentMethod.detach({
      user,
      payment_method: paymentMethod,
    })
    if (res && res.ok) {
      const localPM = order.payment_methods.filter(
        (pm) => pm.id !== paymentMethod.id
      )
      setOrder({ ...order, payment_methods: localPM })
      setSnackSeverity("success")
      setSnackMessage("La carte a bien été supprimée")
    } else {
      setSnackSeverity("error")
      setSnackMessage("La carte n'a pas pu être supprimée")
    }
  }

  return (
    <>
      <CustomCard
        borderRadius="20px"
        padding={{ xs: "2rem 1rem", md: "2rem" }}
        backgroundColor={(theme) => theme.palette.background.main}
        gap={4}
      >
        <Typography variant="h2" color="secondary" textAlign="center">
          Moyen de paiement
        </Typography>

        {!!order.payment_methods?.filter(
          (pm) => pm.type === "card" || pm.type === "sepa_debit"
        )?.length && (
          <>
            <Stack className="flex-center gap-10">
              <Typography>Utilisez un moyen de paiement enregistré</Typography>

              <Grid container spacing={2} mt={2} mb={2}>
                {order.payment_methods.map((pm) => {
                  if (pm.type === "card")
                    return (
                      <Grid item xs={12} sm={6} lg={6} xl={4}>
                        <CustomCard gap="0" height="100%" marginBottom="0">
                          <BodyText
                            textTransform="uppercase"
                            textAlign="right"
                            fontWeight="bold"
                          >
                            {pm.card.brand}
                          </BodyText>
                          <Grid container mt={2}>
                            <Grid item xs={2} textAlign="left">
                              <BodyText color="grey" fontSize="0.7rem">
                                Num.
                              </BodyText>
                            </Grid>
                            <Grid item xs={10} textAlign="right">
                              <BodyText>
                                **** **** **** {pm.card.last4}
                              </BodyText>
                            </Grid>
                          </Grid>
                          <Grid container>
                            <Grid item xs={2} textAlign="left">
                              <BodyText color="grey" fontSize="0.7rem">
                                Exp.
                              </BodyText>
                            </Grid>
                            <Grid item xs={10} textAlign="right">
                              <BodyText>
                                {zeroPad(pm.card.exp_month, 2)}/
                                {pm.card.exp_year}
                              </BodyText>
                            </Grid>
                          </Grid>

                          <PillButton
                            onClick={() => handleSelectPm(pm)}
                            padding=".25rem .75rem"
                            borderRadius="20px"
                            margin="2rem 0 0"
                          >
                            Utiliser cette carte
                          </PillButton>

                          <Button
                            variant="text"
                            sx={{
                              mt: 1,
                              textTransform: "initial",
                              borderRadius: "30px",
                              color: (theme) => theme.palette.error.main,
                              "&:hover": {
                                background: "transparent",
                                textDecoration: "underline",
                              },
                            }}
                            onClick={() => handleDetachPM(pm)}
                          >
                            Supprimer la carte
                          </Button>
                        </CustomCard>
                      </Grid>
                    )
                  if (pm.type === "sepa_debit")
                    return (
                      <Grid item xs={12} md={6} xl={4}>
                        <CustomCard gap="0" height="100%" marginBottom="0">
                          <BodyText
                            textTransform="uppercase"
                            textAlign="right"
                            fontWeight="bold"
                          >
                            Compte bancaire
                          </BodyText>
                          <Grid container mt={2}>
                            <Grid item xs={2} textAlign="left">
                              <BodyText color="grey" fontSize="0.7rem">
                                IBAN
                              </BodyText>
                            </Grid>
                            <Grid item xs={10} textAlign="right">
                              <BodyText>
                                {pm.sepa_debit.country} **** **** ****{" "}
                                {pm.sepa_debit.last4}
                              </BodyText>
                            </Grid>
                          </Grid>

                          <Stack flexGrow={1} />

                          <PillButton
                            onClick={() => handleSelectPm(pm)}
                            padding=".25rem .75rem"
                            borderRadius="30px"
                            margin="2rem 0 0"
                          >
                            Prélever ce compte
                          </PillButton>

                          <Button
                            variant="text"
                            sx={{
                              mt: 1,
                              textTransform: "initial",
                              borderRadius: "30px",
                              color: (theme) => theme.palette.error.main,
                              "&:hover": {
                                background: "transparent",
                                textDecoration: "underline",
                              },
                            }}
                            onClick={() => handleDetachPM(pm)}
                          >
                            Supprimer le compte
                          </Button>
                        </CustomCard>
                      </Grid>
                    )
                })}
              </Grid>
            </Stack>

            <Divider>
              <Typography>OU</Typography>
            </Divider>

            <Typography>Utilisez un autre moyen de paiement</Typography>
          </>
        )}

        <Stack className="flex-center">
          {loading ? (
            <PleaseWait />
          ) : (
            <Stack maxWidth="400px" margin="0 auto" gap={1}>
              <PillButton
                preventTransitionOut
                width="100%"
                onClick={handleRedirectCheckout("card")}
                startIcon={<CreditCardIcon />}
              >
                Carte bancaire
              </PillButton>
              <PillButton
                preventTransitionOut
                width="100%"
                onClick={handleRedirectCheckout("sepa_debit")}
                startIcon={<AccountBalanceIcon />}
              >
                Prélèvement bancaire
              </PillButton>
              <PillButton
                preventTransitionOut
                width="100%"
                onClick={handleRedirectCheckout("paypal")}
                startIcon={<Paypal color="#000" />}
              >
                Paypal
              </PillButton>
            </Stack>
          )}
        </Stack>
      </CustomCard>

      <CustomModal
        open={ConfirmationDialog.open}
        handleClose={ConfirmationDialog.handleClose}
      >
        <ConfirmationDialog.DialogContent />
      </CustomModal>
    </>
  )
}
