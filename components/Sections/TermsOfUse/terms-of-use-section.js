import { Stack } from "@mui/material"
import PageTitle from "../../Titles/page-title"
import { formatText, ParseJsx } from "./terms-of-use--style"
import { fetchers } from "../../../services/public-fetchers"
import useSWR from "swr"

export default function TermsOfUseSection({ staticData }) {
  const swr = useSWR(`termsOfUse`, async () => fetchers.termsOfUse(), {
    fallbackData: staticData,
    revalidateOnMount: true,
  })
  let data = staticData
  if (!!swr.data) data = swr.data

  return (
    <Stack gap={2} padding="0 2rem">
      <PageTitle text="Conditions Générales d'Utilisation" />
      <ParseJsx jsx={formatText(data)} />
    </Stack>
  )
}
