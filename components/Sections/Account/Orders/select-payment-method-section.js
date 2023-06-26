import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material"
import apiCall from "../../../../services/apiCalls/apiCall"
import { useRouter } from "next/router"
import CenteredMaxWidthContainer from "../../../Containers/centered-max-width-container"
import PillButton from "../../../Buttons/pill-button"
import CustomCard from "../../../Cards/custom-card"
import EastIcon from "@mui/icons-material/East"
import BodyText from "../../../Text/body-text"
import { zeroPad } from "../../../../services/utils"
import useConfirm from "../../../../hooks/useConfirm"
import { useContext } from "react"
import { UserContext } from "../../../../contexts/UserContext"
import { AppContext } from "../../../../contexts/AppContext"

export default function SelectPaymentMethodSection({
  orderId,
  order,
  setOrder,
  invoiceAddress,
  deliveryAddress,
  handleSelectPm,
}) {
  const router = useRouter()
  const [
    setConfirmTitle,
    setConfirmMsg,
    setNextBtnText,
    setConfirmAction,
    handleOpen,
    ConfirmationDialog,
  ] = useConfirm()
  const { user } = useContext(UserContext)
  const { setSnackMessage, setSnackSeverity } = useContext(AppContext)

  // HANDLERS
  const handleRedirectCheckout = async ({ paymentMethodId }) => {
    console.debug("paymentMethodId", paymentMethodId)
    const res = await apiCall.orders.getCheckoutClientSecret({
      order: { id: orderId },
      invoiceAddress,
      deliveryAddress,
      payment_method: paymentMethodId,
    })
    if (res && res.ok) {
      const jsonRes = await res.json()
      router.push(
        `/account/orders/${orderId}/checkout/${jsonRes.client_secret}`
      )
    }
  }
  const handleDetachPM = async (paymentMethod) => {
    setConfirmTitle(
      !!paymentMethod.card ? "Supprimer la carte" : "Supprimer le compte"
    )
    setConfirmMsg(
      !!paymentMethod.card ? (
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
          {paymentMethod.sepa_debit.last4[0]}{" "}
          {paymentMethod.sepa_debit.last4[1]}
          {paymentMethod.sepa_debit.last4[2]}
          {paymentMethod.sepa_debit.last4[3]}
        </>
      )
    )
    setNextBtnText(
      !!paymentMethod.card
        ? "Oui, supprimer la carte"
        : "Oui, supprimer le compte"
    )
    setConfirmAction(() => async () => await detachPM(paymentMethod))
    handleOpen()
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
    <CenteredMaxWidthContainer gap={4}>
      <CustomCard
        backgroundColor={(theme) => theme.palette.background.main}
        gap={4}
      >
        <Typography variant="h2" color="secondary" textAlign="center">
          Moyen de paiement
        </Typography>

        {!!order.payment_methods?.length && (
          <>
            <Stack className="flex-center gap-10">
              <Typography>Utilisez un moyen de paiement enregistré</Typography>

              <Grid container spacing={2} mt={2} mb={2}>
                {order.payment_methods.map((pm) => {
                  if (pm.type === "card")
                    return (
                      <Grid item xs={12} md={6} xl={4}>
                        <CustomCard gap="0" height="auto" marginBottom="0">
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
                        <CustomCard gap="0" height="auto" marginBottom="0">
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

        <Stack className="flex-center gap-10">
          <PillButton onClick={handleRedirectCheckout} endIcon={<EastIcon />}>
            Carte ou virement bancaire
          </PillButton>
          {/* <PillButton>Paypal</PillButton> */}
        </Stack>
      </CustomCard>

      <ConfirmationDialog />
    </CenteredMaxWidthContainer>
  )
}
