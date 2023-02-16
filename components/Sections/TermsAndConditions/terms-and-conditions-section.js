import { Stack, Typography } from "@mui/material"
import PageTitle from "../../Titles/page-title"
import { formatText, ParseJsx } from "./terms-and-conditions--style"
import { fetchers } from "../../../services/public-fetchers"
import useSWR from "swr"
import styles from "../../../styles/TextShine.module.css"

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
    <Stack gap={10}>
      <Typography color="secondary" variant="h1" textAlign="center">
        Mentions légales et CGV
      </Typography>

      <Stack gap={2}>
        <Typography variant="h2" color="#fff" className={styles.shine}>
          Mentions Légales
        </Typography>
        <ParseJsx jsx={formatText(data.terms)} />
      </Stack>

      <Stack>
        <Typography variant="h2" color="#fff" className={styles.shine}>
          Conditions Générales de Vente
        </Typography>
        <ParseJsx jsx={formatText(data.conditions)} />
      </Stack>
    </Stack>
  )
}
