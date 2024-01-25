import { useContext } from "react"
import { Box, Stack } from "@mui/material"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import EditIcon from "@mui/icons-material/Edit"

import { Context, MODES } from "../../../module"
import PillButton from "../../../../../../Buttons/pill-button"
import useConfirm from "../../../../../../../hooks/useConfirm"
import CustomModal from "../../../../../../Modals/custom-modal"
import BodyText from "../../../../../../Text/body-text"
import { AppContext } from "../../../../../../../contexts/AppContext"
import apiCall from "../../../../../../../services/apiCalls/apiCall"
import CustomDatePicker from "../../../../../../Inputs/custom-date-picker"
import { convertDateToVeryShortString } from "../../../../../../../services/date-time"

export default function DeliveredBtn() {
  const Confirm = useConfirm()
  const { setSnackMessage, setSnackSeverity } = useContext(AppContext)
  const { state, setState, fetchOrder } = useContext(Context)

  return (
    <>
      <Box my={1}>
        <PillButton
          width="auto"
          preventTransition
          padding=".25rem 1rem"
          startIcon={
            !!state.order?.delivered_date ? <EditIcon /> : <LocalShippingIcon />
          }
          onClick={handleOrderDelivered}
        >
          {!!state.order?.delivered_date
            ? `Livrée le
          ${convertDateToVeryShortString(
            new Date(state.order?.delivered_date)
          )}`
            : "Projet livré ?"}
        </PillButton>
      </Box>

      <CustomModal open={Confirm.open} handleClose={Confirm.handleClose}>
        <Confirm.DialogContent />
      </CustomModal>
    </>
  )

  function handleOrderDelivered() {
    Confirm.setContent({
      title: "Livraison de la commande",
      cancelLabel: "Le projet n'est pas terminé",
      MsgComponent: () => {
        const { state, setState } = useContext(Context)
        const handleCloseConfirm = () => Confirm.setOpen(false)

        return (
          <Stack gap={2}>
            <BodyText>Avez vous livré la commande à votre client ?</BodyText>

            <CustomDatePicker
              label="Commande livrée le"
              value={
                state.orderToUpdate?.delivered_date ||
                state.order?.delivered_date ||
                new Date().toISOString()
              }
              handleChange={(newValue) => {
                setState({
                  ...state,
                  orderToUpdate: {
                    ...state.orderToUpdate,
                    delivered_date: newValue,
                  },
                })
              }}
            />

            <PillButton
              onClick={() => updateOrderAsDelivered(state, handleCloseConfirm)}
            >
              Oui, la commande a été livrée
            </PillButton>
          </Stack>
        )
      },
    })
    Confirm.setOpen(true)
  }

  async function updateOrderAsDelivered(state, handleCloseConfirm) {
    try {
      if (state.order.status === "DRAFT") return
      const res = await apiCall.orders.save({
        ...state.orderToUpdate,
        id: state.order.id,
        items: state.items,
        delivered_date: !!state.orderToUpdate?.delivered_date
          ? new Date(state.orderToUpdate?.delivered_date).toISOString()
          : new Date().toISOString(),
      })
      if (!res?.ok) throw Error("Un problème est survenu")
      setSnackMessage("Votre commande est marquée comme livrée")
      setSnackSeverity("success")
      handleCloseConfirm()
      fetchOrder()
    } catch (err) {
      setSnackSeverity("error")
      setSnackMessage(
        err.message === "missing_fields"
          ? "Certains champs sont manquants dans les conditions et mentions obligatoires."
          : err.message
      )
      if (err.message === "missing_fields")
        setState({ ...state, mode: MODES.EDIT })
      Confirm.setLoading(false)
    }
  }
}
