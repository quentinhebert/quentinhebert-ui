import { Stack } from "@mui/material"
import PageTitle from "../../Titles/page-title"
import { formatText, ParseJsx } from "./terms-of-use--style"

export default function TermsOfUseSection({ staticData }) {
  return (
    <Stack gap={2}>
      <PageTitle text="Conditions Générales d'Utilisation" />
      <ParseJsx jsx={formatText(staticData)} />
    </Stack>
  )
}
