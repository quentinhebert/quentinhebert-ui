import { useContext } from "react"
import { Context, FormCard } from "../../../module"
import { Stack } from "@mui/material"
import DualInputLine from "../../../../../../Containers/dual-input-line"
import CustomFilledInput from "../../../../../../Inputs/custom-filled-input"
import CustomDatePicker from "../../../../../../Inputs/custom-date-picker"
import WorkHistoryIcon from "@mui/icons-material/WorkHistory"
import { EditContext } from "../../../edit"

export default function MissionDate() {
  const { state, setState } = useContext(Context)
  const { handleChange, handleChangeDate } = useContext(EditContext)

  return (
    <FormCard
      title="Prestation"
      step={1}
      totalSteps={5}
      icon={<WorkHistoryIcon />}
    >
      <DualInputLine>
        <Stack sx={{ width: { xs: "100%", md: "50%" } }}>
          <CustomDatePicker
            disablePast
            label="Date de la prestation"
            value={state.order.date}
            handleChange={handleChangeDate("date")}
            error={state.errors.date}
          />
        </Stack>
        <CustomFilledInput
          width={{ xs: "100%", md: "50%" }}
          value={state.order.duration}
          onChange={handleChange("duration")}
          label="Durée estimée (optionnel)"
          placeholder="1 jour de tournage et 3 jours de montage"
        />
      </DualInputLine>
    </FormCard>
  )
}
