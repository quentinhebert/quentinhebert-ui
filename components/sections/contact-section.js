import React, { useEffect, useRef, useState } from "react"
import Navbar from "../Navigation/Navbars/navbar"
import Footer from "../Navigation/Footers/Footer"
import CommercialBand from "./commercial-band"
import { Box, Stack, Typography } from "@mui/material"
import ScrollToTopBtn from "../Navigation/scroll-to-top"
import theme from "../../config/theme"
import References from "../Layouts/references/references"
import IndexHeroScreen from "./index-hero-screen"
import CarRentalIcon from "@mui/icons-material/CarRental"
import ContactForm from "../Forms/contact-form"

export default function ContactSection(props) {
  const {} = props

  const topRef = useRef()
  const categoriesRef = useRef()
  const refsForScroll = {
    portfolio: categoriesRef,
  }
  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{
        backgroundColor: (theme) => theme.palette.secondary.main,
        padding: "2rem",
      }}
    >
      <Stack justifyContent="center" alignItems="center" flexDirection="row">
        <Typography
          variant="h2"
          textAlign="center"
          color="background.main"
          textTransform="uppercase"
          fontWeight="bold"
          display="flex"
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
            letterSpacing: { xs: "1px", sm: "1.5px", md: "2px" },
          }}
        >
          Allumez le contact
        </Typography>
        <CarRentalIcon
          sx={{
            display: "flex",
            width: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            height: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            marginLeft: { xs: "0.75rem", md: "1rem" },
          }}
        />
      </Stack>
      <ContactForm />
    </Stack>
  )
}
