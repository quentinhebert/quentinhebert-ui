import { Stack } from "@mui/material"
import TermsAndConditionsSection from "../Sections/TermsAndConditions/terms-and-conditions-section"

export default function TermsAndConditions_Main(props) {
  const { staticData } = props

  return (
    <Stack flexGrow={1}>
      <TermsAndConditionsSection staticData={staticData} />
    </Stack>
  )
}
