import { useContext } from "react"
import { Context, MODES } from "../../../module"
import PillButton from "../../../../../Buttons/pill-button"
import useConfirm from "../../../../../../hooks/useConfirm"
import CustomModal from "../../../../../Modals/custom-modal"
import BodyText from "../../../../../Text/body-text"
import AlertInfo from "../../../../../Other/alert-info"
import { AppContext } from "../../../../../../contexts/AppContext"

import CheckIcon from "@mui/icons-material/CheckCircleOutline"
import apiCall from "../../../../../../services/apiCalls/apiCall"

export default function ReadyBtn() {
  const Confirm = useConfirm()
  const { setSnackMessage, setSnackSeverity } = useContext(AppContext)
  const { state, setState, fetchOrder, checkMissingFields } =
    useContext(Context)

  return (
    <>
      <PillButton
        preventTransition
        width="auto"
        padding=".25rem 1rem"
        startIcon={<CheckIcon />}
        display={{ xs: "none", md: "flex" }}
        onClick={handleOrderReady}
      >
        Commande prête ?
      </PillButton>

      <CustomModal open={Confirm.open} handleClose={Confirm.handleClose}>
        <Confirm.DialogContent />
      </CustomModal>
    </>
  )

  function handleOrderReady() {
    Confirm.setContent({
      title: "Marquer la commande comme prête",
      nextBtnText: "Oui, ma commande est prête",
      message: (
        <>
          <BodyText>Voulez-vous vraiment publier la commande ?</BodyText>
          <AlertInfo
            content={{
              show: true,
              title: "Important",
              text: "Une fois publiée, il ne sera plus possible de la modifier.",
              severity: "warning",
            }}
          />
        </>
      ),
      nextAction: updateOrderAsReady(),
    })
    Confirm.setOpen(true)
  }

  async function updateOrderAsReady() {
    try {
      checkMissingFields()

      if (state.order.status !== "DRAFT") return
      const res = await apiCall.orders.save({
        ...state.orderToUpdate,
        status: "WAITING_FOR_PAYMENT",
        items: state.items,
        id: state.order.id,
      })
      if (!res?.ok) throw Error("Un problème est survenu")
      setSnackMessage("Votre commande est en attente de paiement")
      setSnackSeverity("success")
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
    }
  }
}
