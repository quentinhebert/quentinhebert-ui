import { Stack } from "@mui/material"
import ContactInformationSection from "../Sections/ContactPage/contact-information-section"
import ContactForm from "../Forms/contact-form"
import CenteredMaxWidthContainer from "../Containers/centered-max-width-container"
import MotionDivOnMount from "../Animation/motion-div-on-mount"
import { ignoreNavbar } from "../../styles/helper"

export default function Contact_Main(props) {
  const { staticData } = props

  return (
    <Root>
      <MotionDivOnMount
        visible={{
          opacity: 1,
          x: 0,
        }}
        hidden={{ opacity: 0, x: -50 }}
      >
        <ContactInformationSection staticData={staticData} />
      </MotionDivOnMount>

      <MotionDivOnMount
        visible={{
          opacity: 1,
          x: 0,
        }}
        hidden={{ opacity: 0, x: 50 }}
      >
        <ContactForm
          defaultDirection="column"
          defaultService="film"
          showServicesBoxes={true}
        />
      </MotionDivOnMount>
    </Root>
  )
}

function Root(props) {
  return (
    <Stack
      overflow="hidden"
      sx={{
        ...ignoreNavbar,
        background: (theme) => theme.palette.background.black,
      }}
    >
      <CenteredMaxWidthContainer
        pixels="1200px"
        percents="80%"
        margin="4rem auto"
        alignItems="start"
        gap={{ xs: 8, lg: 0 }}
        flexDirection={{ xs: "column", lg: "row" }}
        {...props}
      />
    </Stack>
  )
}
