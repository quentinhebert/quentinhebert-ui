import { useContext } from "react"
import CustomDatePicker from "../../../../../../Inputs/custom-date-picker"
import { Context, FormCard } from "../../../module"
import { EditContext } from "../../../edit"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"

export default function DeliveryDate() {
  const { state } = useContext(Context)
  const { handleChangeDate } = useContext(EditContext)

  console.debug("state.errors", state.errors)

  return (
    <FormCard
      title="Livraison"
      step={2}
      totalSteps={5}
      icon={<LocalShippingIcon />}
    >
      <CustomDatePicker
        disablePast
        label="Date de livraison estimée"
        value={state.order.delivery_date}
        handleChange={handleChangeDate("delivery_date")}
        error={state.errors.delivery_date}
      />
    </FormCard>
  )
}
