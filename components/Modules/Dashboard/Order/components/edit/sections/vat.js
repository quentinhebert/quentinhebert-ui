import { useContext } from "react"
import { Context, FormCard } from "../../../module"
import PercentIcon from "@mui/icons-material/Percent"
import SwitchButton from "../../../../../../Inputs/switch-button"

export default function VAT() {
  const { state, setState } = useContext(Context)

  return (
    <FormCard title="TVA" step={4} totalSteps={5} icon={<PercentIcon />}>
      <SwitchButton
        checked={state.order.no_vat}
        handleCheck={handleVAT}
        label="TVA non applicable, article 293B du Code Général des Impôts (CGI)"
      />
    </FormCard>
  )

  function handleVAT(bool) {
    let newState = {
      ...state,
      order: {
        ...state.order,
        no_vat: bool,
      },
      orderToUpdate: { ...state.orderToUpdate, no_vat: bool },
    }
    if (bool) {
      const localItems = state.items
      localItems.map((item) => (item.vat = 0))
      newState.items = localItems
    }
    if (!bool) {
      const localItems = state.items
      localItems.map((item) => (item.vat = 20))
      newState.items = localItems
    }
    setState(newState)
  }
}
