import { Stack } from "@mui/material"
import BodyText from "../../Text/body-text"
import { useContext } from "react"
import { AppContext } from "../../../contexts/AppContext"

export default function ChangeLangSection({ preventTransition }) {
  const { lang, toggleLang } = useContext(AppContext)

  return (
    <Stack zIndex={0} alignItems="center" className="row gap-4">
      <BodyText
        preventTransition={preventTransition || false}
        className="pointer"
        sx={{
          borderBottom:
            lang === "fr"
              ? (theme) => `1px solid ${theme.palette.secondary.main}`
              : null,
          paddingBottom: 0.5,
          "&:hover": {
            color: (theme) => theme.palette.secondary.main,
          },
        }}
        onClick={() => toggleLang("fr")}
      >
        FR
      </BodyText>
      <BodyText preventTransition={preventTransition || false}>/</BodyText>
      <BodyText
        preventTransition={preventTransition || false}
        className="pointer"
        sx={{
          borderBottom:
            lang === "en"
              ? (theme) => `1px solid ${theme.palette.secondary.main}`
              : null,
          paddingBottom: 0.5,
          "&:hover": {
            color: (theme) => theme.palette.secondary.main,
          },
        }}
        onClick={() => toggleLang("en")}
      >
        EN
      </BodyText>
    </Stack>
  )
}
