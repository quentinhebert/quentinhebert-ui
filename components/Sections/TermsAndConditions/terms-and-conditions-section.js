import { Stack } from "@mui/material"
import PageTitle from "../../Titles/page-title"
import { formatText, ParseJsx } from "./terms-and-conditions--style"
import { fetchers } from "../../../services/public-fetchers"
import useSWR from "swr"

export default function TermsAndConditionsSection({ staticData }) {
  const swr = useSWR(
    `termsAndConditions`,
    async () => fetchers.termsAndConditions(),
    {
      fallbackData: staticData,
      revalidateOnMount: true,
    }
  )
  let data = staticData
  if (!!swr.data) data = swr.data

  return (
    <Stack gap={4}>
      <Stack gap={2}>
        <PageTitle text="Mentions Légales" />
        <ParseJsx jsx={formatText(data.terms)} />
      </Stack>

      <Stack>
        <PageTitle text="Conditions Générales de Vente" />
        <ParseJsx jsx={formatText(data.conditions)} />
      </Stack>
    </Stack>
  )
}
