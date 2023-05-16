import { Button } from "@mui/material"
import NextLink from "../../Helpers/next-link"
import { useRouter } from "next/router"
import translations from "../../../services/translation"
import { useContext } from "react"
import { AppContext } from "../../../contexts/AppContext"

export default function ContactBtnSection({ isReduced }) {
  const { lang } = useContext(AppContext)

  const router = useRouter()
  const page = router.asPath

  const contactActivePage = page === "/contact"

  return (
    <NextLink href="/contact">
      <Button
        variant="outlined"
        sx={{
          textTransform: "initial",
          fontFamily: "trophy",
          fontSize: { xs: "0.5rem", md: "0.6rem" },
          background: "#000",
          borderRadius: "30px",
          color: contactActivePage
            ? (theme) => theme.palette.secondary.main
            : "#fff",
          borderColor: contactActivePage
            ? (theme) => theme.palette.secondary.main
            : "#fff",
          padding: { xs: "0.5rem 0.9rem", md: "0.5rem 1rem" },
          letterSpacing: 1,
          transition: ".1s ease",
          "&:hover": {
            background: "#000",
            color: (theme) => theme.palette.secondary.main,
            borderColor: (theme) => theme.palette.secondary.main,
          },
        }}
      >
        {translations.navbar.contactMe[lang]}
      </Button>
    </NextLink>
  )
}
