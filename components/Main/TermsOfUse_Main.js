import { Stack } from "@mui/material"
import TermsOfUseSection from "../Sections/TermsOfUse/terms-of-use-section"

export default function TermsOfUse_Main(props) {
  const { staticData } = props

  return (
    <Stack flexGrow={1} gap={4}>
      <TermsOfUseSection staticData={staticData} />
    </Stack>
  )
}
