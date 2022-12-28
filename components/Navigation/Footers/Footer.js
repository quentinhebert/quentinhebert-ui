import { useEffect } from "react"
import { Stack, Typography, Box } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import FacebookIcon from "../../../public/medias/social_icons/facebook.svg"
import InstagramIcon from "../../../public/medias/social_icons/instagram.svg"
import LinkedinIcon from "../../../public/medias/social_icons/linkedin.svg"
import YoutubeIcon from "../../../public/medias/social_icons/youtube.svg"
import SecuredPaymentIcon from "../../../public/medias/warranties/secured-payment-icon.svg"
import PaypalIcon from "../../../public/medias/warranties/paypal-icon.svg"
import CreditCardIcon from "../../../public/medias/warranties/credit-card-icon.svg"
import QualityIcon from "../../../public/medias/warranties/quality-icon.svg"
import MailOutlineIcon from "@mui/icons-material/MailOutline"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import useSWR from "swr"
import getSocialIcon from "../../Other/get-social-icon"
import { fetchers } from "../../../services/public-fetchers"
import SmallText from "../../Text/small-text"
import InTextLink from "../../Links/in-text-link"
import CenteredMaxWidthContainer from "../../Containers/centered-max-width-container"
import MotionDivFadeInOnMount from "../../Animation/motion-div-fade-in-on-mount"
import CustomLink from "../../Links/custom-link"
import ScaleUpOnHoverStack from "../../Animation/scale-up-on-hover-stack"

/********** CONSTANTES **********/
const logoQH = "/logos/logo-qh.png"

const warrantiesButtons = [
  {
    image: SecuredPaymentIcon,
    text: "Paiement sécurisé",
  },
  {
    image: CreditCardIcon,
    text: "Paiement par carte bancaire",
  },
  {
    image: PaypalIcon,
    text: "Paiement par PayPal",
  },
  {
    image: QualityIcon,
    text: "Un gage de qualité",
  },
]

const Credits = ({ text }) => {
  const year = new Date().getFullYear()
  return (
    <Stack
      alignItems="center"
      textAlign="center"
      margin="3rem auto 0"
      padding="0 1rem"
    >
      <SmallText>
        {/* © Quentin Hébert {year} · {text} ·{" "} */}
        <InTextLink href="/terms-of-use" text="CGU" /> ·{" "}
        <InTextLink
          href="/terms-and-conditions"
          text="Mentions légales et CGV"
        />{" "}
        ·{" "}
        <InTextLink
          href="/about/website"
          text="À propos de ce site"
          target="_blank"
        />
      </SmallText>
    </Stack>
  )
}

const Email = ({ email }) => (
  <Typography
    display="flex"
    alignItems="center"
    gap={1}
    color="text.white"
    sx={{ "&:hover": { color: (theme) => theme.palette.text.secondary } }}
  >
    <MailOutlineIcon />
    <InTextLink
      href={`mailto:${email || ""}`}
      text={email || ""}
      letterSpacing={2}
      textTransform="uppercase"
      sx={{ fontSize: "0.9rem" }}
    />
  </Typography>
)

const SocialMedias = ({ items }) => {
  if (!items?.length) return <></>
  return (
    <Stack direction="row" width={"100%"} justifyContent="center" gap={2}>
      {items.map((social, key) => (
        <ScaleUpOnHoverStack key={key}>
          <CustomLink href={social.value} target="_blank">
            <img
              src={getSocialIcon(social.type)}
              style={{ height: "40px", width: "40px" }}
            />
          </CustomLink>
        </ScaleUpOnHoverStack>
      ))}
    </Stack>
  )
}

const LogoQH = ({ logoUrl }) => (
  <ScaleUpOnHoverStack direction="row" justifyContent="center">
    <Link href="/" passHref>
      {/* {logoUrl && <Image src={logoUrl} width="100%" height="80%" />} */}
      {logoUrl && (
        <Box
          component="img"
          src={logoUrl}
          width="80px"
          height="65px"
          zIndex={100000}
        />
      )}
    </Link>
  </ScaleUpOnHoverStack>
)

export default function Footer(props) {
  const { staticData } = props
  const swr = useSWR(`footer`, async () => fetchers.footer(), {
    fallbackData: props.staticData,
    revalidateOnMount: true,
  })
  let data = staticData
  if (!!swr.data) data = swr.data

  /********** STYLE **********/
  const motionDivStyle = {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  }

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const variants = (key) => ({
    visible: {
      opacity: 1,
      transition: { duration: 0.75, delay: key / 5 },
    },
    hidden: { opacity: 0 },
  })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  // if (!data || !data.email || !data.credits || !data.social_medias) return <></>
  return (
    <MotionDivFadeInOnMount>
      <Box
        component="img"
        src="/medias/footer-wave.svg"
        width="100%"
        sx={{
          position: "relative",
          zIndex: 0,
        }}
      />
      <Box
        ref={ref}
        component="footer"
        className="full-width relative"
        paddingTop={10}
        paddingBottom={8}
        zIndex={1}
        sx={{
          margin: { xs: "-1rem 0 0", md: "-3rem 0 0" },
          backgroundColor: "#000",
        }}
      >
        <CenteredMaxWidthContainer>
          {/* FOOTER CONTENT */}
          <Stack
            alignItems="center"
            gap={5}
            sx={{
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* LOGO */}
            <motion.div
              initial="hidden"
              variants={variants(0)}
              animate={controls}
              style={motionDivStyle}
            >
              {data?.logo?.URL && <LogoQH logoUrl={data.logo.URL} />}
            </motion.div>

            {/* EMAIL */}
            <motion.div
              initial="hidden"
              variants={variants(1)}
              animate={controls}
              style={motionDivStyle}
            >
              <Email email={data?.email} />
            </motion.div>

            {/* SOCIAL MEDIAS */}
            <motion.div
              initial="hidden"
              variants={variants(2)}
              animate={controls}
              style={motionDivStyle}
            >
              <SocialMedias items={data?.social_medias} />
            </motion.div>
          </Stack>

          {/* WEBSITE CREDITS */}
          <motion.div
            initial="hidden"
            variants={variants(3)}
            animate={controls}
            style={motionDivStyle}
          >
            <Credits text={data?.credits} />
          </motion.div>
        </CenteredMaxWidthContainer>
      </Box>
    </MotionDivFadeInOnMount>
  )
}
