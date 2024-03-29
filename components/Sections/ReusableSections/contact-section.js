import { Stack, Typography } from "@mui/material"
import CenteredMaxWidthContainer from "../../Containers/centered-max-width-container"
import { moveRightVariants } from "../../Animation/variants"

import dynamic from "next/dynamic"
import MotionDivOnMount from "../../Animation/motion-div-on-mount"
import { useContext } from "react"
import { AppContext } from "../../../contexts/AppContext"
import translations from "../../../services/translation"
const ContactForm = dynamic(() => import("../../Forms/contact-form"), {
  ssr: false,
})

export default function ContactSection({ defaultService, topRef, ...props }) {
  const { lang } = useContext(AppContext)
  return (
    <>
      <Stack ref={topRef} sx={{ scrollMarginTop: "60px" }} />
      <Stack
        width="100%"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        padding="5rem 0"
        zIndex={1}
        position="relative"
        bgcolor="background.black"
        sx={{
          overflow: "hidden",
        }}
      >
        <CenteredMaxWidthContainer pixels="800px" percents="80%" gap={2}>
          <MotionDivOnMount
            visible={moveRightVariants.visible}
            hidden={moveRightVariants.hidden}
          >
            <Typography variant="h2" color="secondary">
              {translations.contact.catchPhrase[lang]}
            </Typography>
          </MotionDivOnMount>

          <MotionDivOnMount
            visible={moveRightVariants.visible}
            hidden={moveRightVariants.hidden}
            style={{ width: "100%" }}
          >
            <ContactForm defaultService={defaultService} />
          </MotionDivOnMount>
        </CenteredMaxWidthContainer>
      </Stack>
    </>
  )
}
