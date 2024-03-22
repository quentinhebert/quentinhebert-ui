import { Stack } from "@mui/material"
import CustomCircularProgress from "./custom-circular-progress"
import BodyText from "../Text/body-text"
import { useContext } from "react"
import { AppContext } from "../../contexts/AppContext"
import translations from "../../services/translation"

export default function PleaseWait() {
  const { lang } = useContext(AppContext)
  return (
    <Stack padding="2rem" alignItems="center" justifyContent="center">
      <Stack
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        gap={4}
      >
        <CustomCircularProgress />
        <BodyText preventTransition={true}>
          {translations.pleaseWait[lang]}
        </BodyText>
      </Stack>
    </Stack>
  )
}
