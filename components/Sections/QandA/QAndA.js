import { Stack } from "@mui/material"
import { useContext } from "react"
import { AppContext } from "../../../contexts/AppContext"
import useSWR from "swr"
import { fetchers } from "../../../services/public-fetchers"
import PageTitle from "../../Titles/page-title"
import translations from "../../../services/translation"
import { ParseJsx, formatText } from "./q-and-a--style"

export default function QAndASection({ staticData, ...props }) {
  const { lang } = useContext(AppContext)

  // SWR
  const swr = useSWR(`QandA`, async () => fetchers.QandA(), {
    fallbackData: staticData,
    revalidateOnMount: true,
  })
  let data = staticData
  if (!!swr.data) data = swr.data

  return (
    <Stack gap={2} padding="0 2rem">
      <PageTitle text={translations.QandA.title[lang]} />
      <ParseJsx jsx={formatText(data.q_and_a)} />
    </Stack>
  )
}
