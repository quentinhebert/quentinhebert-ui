import { useContext } from "react"
import dynamic from "next/dynamic"

import { Context, MODALS } from "../../../module"
import CustomModal from "../../../../../../Modals/custom-modal"

const ModalEditItem = dynamic(() => import("./modal-edit-item"))
const ModalSave = dynamic(() => import("./modal-save"))
const ModalPayment = dynamic(() => import("./modal-payment"))
const ModalTagAsPaid = dynamic(() => import("./modal-tag-as-paid"))
const ModalSendQuote = dynamic(() => import("./modal-send-quote"))
const ModalCreateItem = dynamic(() => import("./modal-create-item"))
const ModalClient = dynamic(() => import("./modal-client"))

export default function Modals() {
  const { state, handleCloseModal } = useContext(Context)
  return (
    <CustomModal open={state.openModal} handleClose={handleCloseModal} gap={4}>
      <ModalContent />
    </CustomModal>
  )
}

function ModalContent() {
  const { state } = useContext(Context)
  switch (state.modal) {
    case MODALS.CREATE_ITEM:
      return <ModalCreateItem />
    case MODALS.EDIT_ITEM:
      return <ModalEditItem />
    case MODALS.ASSIGN:
      return <ModalClient />
    case MODALS.SEND:
      return <ModalSendQuote />
    case MODALS.PAYMENT:
      return <ModalPayment />
    case MODALS.TAG:
      return <ModalTagAsPaid />
    default: // MODALS.SAVE
      return <ModalSave />
  }
}
