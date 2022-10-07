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
import SmallText from "../../ReusableComponents/text/small-text"
import InTextLink from "../../ReusableComponents/text/in-text-link"
import CenteredMaxWidthContainer from "../../ReusableComponents/containers/centered-max-width-container"
import CustomLink from "../../ReusableComponents/custom-link"
import ScaleUpOnHoverStack from "../../ReusableComponents/animations/scale-up-on-hover-stack"
import apiCall from "../../../services/apiCalls/apiCall"
import useSWR from "swr"
import MotionDivFadeInOnMount from "../../ReusableComponents/animations/motion-div-fade-in-on-mount"

async function fetchUpToDateFooter() {
  const res = await apiCall.unauthenticated.getFooter()
  const jsonRes = await res.json()
  return jsonRes
}

/********** CONSTANTES **********/
const logoQH = "/logos/logo-qh.png"

function getIcon(type) {
  switch (type) {
    case "youtube_url":
      return YoutubeIcon
    case "facebook_url":
      return FacebookIcon
    case "instagram_url":
      return InstagramIcon
    default:
      return ""
  }
}

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
        © Quentin Hébert {year} · {text} ·{" "}
        <InTextLink
          href="/about-website"
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
  return (
    <Stack direction="row" width={"100%"} justifyContent="center" gap={2}>
      {items.map((social, key) => (
        <ScaleUpOnHoverStack key={key}>
          <CustomLink href={social.value} target="_blank">
            <Image src={getIcon(social.type)} height="40%" width="40%" />
          </CustomLink>
        </ScaleUpOnHoverStack>
      ))}
    </Stack>
  )
}

const LogoQH = () => (
  <ScaleUpOnHoverStack direction="row" justifyContent="center">
    <Link href="/" passHref>
      <Box component="a">
        <Image src={logoQH} width="100%" height="80%" />
      </Box>
    </Link>
  </ScaleUpOnHoverStack>
)

export default function Footer(props) {
  const { data } = useSWR(`/footer`, async () => fetchUpToDateFooter(), {
    fallbackData: props,
    revalidateOnMount: true,
  })

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

  if (!data || !data.email || !data.credits || !data.social_medias) return <></>
  return (
    <MotionDivFadeInOnMount>
      <Box
        ref={ref}
        component="footer"
        className="full-width relative no-margin"
        paddingTop={10}
        paddingBottom={4}
        zIndex={1}
        sx={{
          backgroundColor: "transparent",
          backgroundImage: "url(/medias/footer-wave.svg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
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
              <LogoQH />
            </motion.div>

            {/* EMAIL */}
            <motion.div
              initial="hidden"
              variants={variants(1)}
              animate={controls}
              style={motionDivStyle}
            >
              <Email email={data.email} />
            </motion.div>

            {/* SOCIAL MEDIAS */}
            <motion.div
              initial="hidden"
              variants={variants(2)}
              animate={controls}
              style={motionDivStyle}
            >
              <SocialMedias items={data.social_medias} />
            </motion.div>
          </Stack>

          {/* WEBSITE CREDITS */}
          <motion.div
            initial="hidden"
            variants={variants(3)}
            animate={controls}
            style={motionDivStyle}
          >
            <Credits text={data.credits} />
          </motion.div>
        </CenteredMaxWidthContainer>
      </Box>
    </MotionDivFadeInOnMount>
  )
}

export async function getStaticProps({ params }) {
  const {} = params
  const data = await fetchUpToDateFooter()
  let notFound = false

  if (data.statusCode === 400 || data.statusCode === 404) notFound = true

  return { props: data, notFound, revalidate: 60 }
}
