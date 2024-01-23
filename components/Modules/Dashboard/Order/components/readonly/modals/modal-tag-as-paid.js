import { useContext, useState } from "react"
import { ModalTitle } from "../../../../../../Modals/Modal-Components/modal-title"
import DoneIcon from "@mui/icons-material/Done"
import apiCall from "../../../../../../../services/apiCalls/apiCall"
import { Context } from "../../../module"
import BodyText from "../../../../../../Text/body-text"
import CustomForm from "../../../../../../Forms/custom-form"
import CustomRadio from "../../../../../../Inputs/custom-radio"
import { Stack } from "@mui/material"
import CancelTextButton from "../../../../../../Buttons/cancel-text-button"
import PillButton from "../../../../../../Buttons/pill-button"
import { AppContext } from "../../../../../../../contexts/AppContext"

export default function ModalTagAsPaid() {
  const { state, setState } = useContext(Context)
  const { setSnackMessage, setSnackSeverity } = useContext(AppContext)
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_OPTIONS[0].id)
  const [processing, setProcessing] = useState(false)

  return (
    <>
      <ModalTitle alignItems="center" display="flex" gap={1}>
        <DoneIcon /> Marquer le prochain paiement comme réglé
      </ModalTitle>
      <BodyText preventTransition fontSize="1rem">
        Quel a été le moyen de paiement utilisé ?
      </BodyText>

      <CustomForm gap={4}>
        <CustomRadio options={PAYMENT_OPTIONS} setValue={setPaymentMethod} />

        <Stack className="row" gap={2} alignSelf="end" alignItems="center">
          <CancelTextButton
            handleCancel={() => setState({ ...state, openModal: false })}
          />
          <PillButton onClick={handleTag} disabled={processing}>
            {processing ? "Patientez..." : "Marquer comme payé"}
          </PillButton>
        </Stack>
      </CustomForm>
    </>
  )

  async function handleTag() {
    setProcessing(true)
    const res = await apiCall.orders.tagAsPaid({
      orderId: state.order.id,
      paymentMethod,
    })
    if (res && res.ok) {
      setSnackMessage("La commande a bien été marquée comme payée !")
      setSnackSeverity("success")
      fetchOrder()
      handleCloseModal()
    } else {
      setSnackMessage("Erreur")
      setSnackSeverity("error")
    }
    setProcessing(false)
  }
}

const PAYMENT_OPTIONS = [
  { id: "CASH", label: "Espèces" },
  { id: "CHECK", label: "Chèque" },
  { id: "TRANSFER", label: "Virement" },
  { id: "CARD", label: "CB" },
]
