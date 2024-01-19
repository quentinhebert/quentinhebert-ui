import { Stack } from "@mui/material"
import ClientAutocomplete from "../../../../../Forms/admin/client-autocomplete"
import CustomForm from "../../../../../Forms/custom-form"
import QuotationClientFieldsForm from "../../../../../Forms/quotations/quotation-client-fields-form"
import SwitchButton from "../../../../../Inputs/switch-button"
import { ModalTitle } from "../../../../../Modals/Modal-Components/modal-title"
import CancelButton from "../../../../../Buttons/cancel-button"
import PillButton from "../../../../../Buttons/pill-button"
import { useContext, useState } from "react"
import { Context } from "../../../module"
import apiCall from "../../../../../../services/apiCalls/apiCall"
import { AppContext } from "../../../../../../contexts/AppContext"

export default function ModalClient() {
  const { state, setState, fetchOrder, handleCloseModal } = useContext(Context)
  const { setSnackMessage, setSnackSeverity } = useContext(AppContext)

  const [newClient, setNewClient] = useState(false)
  const [assignValue, setAssignValue] = useState({})
  const [assignInputValue, setAssignInputValue] = useState("")

  return (
    <>
      <ModalTitle>Assigner la commande à un client</ModalTitle>

      <SwitchButton
        checked={newClient}
        handleCheck={toggleNewClient}
        label="Nouveau client"
      />

      {newClient ? (
        <QuotationClientFieldsForm
          orderId={order.id}
          handleFinish={async () => {
            handleCloseModal()
            fetchOrder()
          }}
          isAdmin
        />
      ) : (
        <CustomForm gap={4}>
          <ClientAutocomplete
            value={assignValue}
            setValue={setAssignValue}
            inputValue={assignInputValue}
            setInputValue={setAssignInputValue}
            defaultValue={state.order.client}
            placeholder="Prénom, Nom ou E-mail"
          />
          <Stack className="row" gap={2}>
            <CancelButton handleCancel={handleCloseModal} />
            <PillButton onClick={handleAssign}>Assigner</PillButton>
          </Stack>
        </CustomForm>
      )}
    </>
  )

  function toggleNewClient(newValue) {
    setNewClient(newValue)
  }
  async function handleAssign() {
    const res = await apiCall.orders.assignClient({
      id: state.order.id,
      clientId: assignValue?.id || null,
    })
    if (res && res.ok) {
      fetchOrder() // including handleCloseModal
      setSnackMessage("Le client a été modifié avec succès")
      setSnackSeverity("success")
    } else {
      setSnackMessage("Une erreur est survenue")
      setSnackSeverity("error")
    }
  }
}
