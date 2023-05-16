import { Stack } from "@mui/material"
import PageTitle from "../../Titles/page-title"
import { formatText, ParseJsx } from "./terms-of-use--style"
import { fetchers } from "../../../services/public-fetchers"
import useSWR from "swr"
import translations from "../../../services/translation"
import { useContext } from "react"
import { AppContext } from "../../../contexts/AppContext"

export default function TermsOfUseSection({ staticData }) {
  const swr = useSWR(`termsOfUse`, async () => fetchers.termsOfUse(), {
    fallbackData: staticData,
    revalidateOnMount: true,
  })
  let data = staticData
  if (!!swr.data) data = swr.data

  const { lang } = useContext(AppContext)

  return (
    <Stack gap={2}>
      <PageTitle text={translations.termsOfUse.title[lang]} />
      <ParseJsx jsx={formatText(data)} />
    </Stack>
  )
}
