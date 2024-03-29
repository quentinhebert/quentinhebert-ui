import { Stack, Typography } from "@mui/material"
import { formatText, ParseJsx } from "./terms-and-conditions--style"
import { fetchers } from "../../../services/public-fetchers"
import useSWR from "swr"
import styles from "../../../styles/TextShine.module.css"
import { useContext } from "react"
import { AppContext } from "../../../contexts/AppContext"
import translations from "../../../services/translation"

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

  const { lang } = useContext(AppContext)

  return (
    <Stack gap={10}>
      <Typography color="secondary" variant="h1" textAlign="center">
        {translations.termsAndConditions.title[lang]}
      </Typography>

      <Stack color="#fff">
        <Typography variant="h2" className={styles.shine}>
          {translations.termsAndConditions.legalNotice[lang]}
        </Typography>
        <Typography fontWeight="bold">{data.terms.terms_fullname}</Typography>
        <Typography>{data.terms.terms_email}</Typography>
        <Typography>{data.terms.terms_phone}</Typography>
        <Typography>
          {data.terms.terms_line1 ? `${data.terms.terms_line1}, ` : null}
          {data.terms.terms_line2 ? `${data.terms.terms_line2}, ` : null}
          {data.terms.terms_postal_code
            ? `${data.terms.terms_postal_code} `
            : null}
          {data.terms.terms_city ? `${data.terms.terms_city}, ` : " "}
          {data.terms.terms_country}
        </Typography>
        <Typography>SIRET {data.terms.siret}</Typography>
        <Typography>RCS {data.terms.rcs}</Typography>
        <p />
        <Typography>Hébergeur du Site :</Typography>
        <Typography>
          <strong>Netlify, Inc.</strong>
        </Typography>
        <Typography>
          <em>
            44 Montgomery Street, Suite 300, San Francisco, California 94104
          </em>
        </Typography>
      </Stack>

      <Stack>
        <Typography variant="h2" color="#fff" className={styles.shine}>
          {translations.termsAndConditions.terms[lang]}
        </Typography>
        <ParseJsx jsx={formatText(data.conditions)} />
      </Stack>
    </Stack>
  )
}
