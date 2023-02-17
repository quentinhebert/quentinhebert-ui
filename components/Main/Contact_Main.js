import { Stack, useMediaQuery } from "@mui/material"
import ContactInformationSection from "../Sections/ContactPage/contact-information-section"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import ContactForm from "../Forms/contact-form"
import { useEffect } from "react"
import CenteredMaxWidthContainer from "../Containers/centered-max-width-container"
import FixedBackground from "../Backgrounds/fixed-background"
import MotionDivOnMount from "../Animation/motion-div-on-mount"

export default function Contact_Main(props) {
  const { staticData } = props

  return (
    <Stack overflow="hidden" sx={{ marginTop: "-82px" }}>
      <FixedBackground background="#000" />

      <CenteredMaxWidthContainer pixels="1200px" percents="80%">
        <Stack
          alignItems="start"
          margin="calc(65px + 4rem) 0"
          sx={{
            gap: { xs: 8, lg: 0 },
            flexDirection: { xs: "column", lg: "row" },
          }}
        >
          <MotionDivOnMount
            visible={{
              opacity: 1,
              x: 0,
            }}
            hidden={{ opacity: 0, x: -200 }}
          >
            <ContactInformationSection staticData={staticData} />
          </MotionDivOnMount>

          <MotionDivOnMount
            visible={{
              opacity: 1,
              x: 0,
            }}
            hidden={{ opacity: 0, x: 200 }}
            delay={0.15}
          >
            <ContactForm defaultDirection="column" />
          </MotionDivOnMount>
        </Stack>
      </CenteredMaxWidthContainer>
    </Stack>
  )
}
