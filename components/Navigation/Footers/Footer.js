import * as React from "react"
import {
  Button,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  Box,
} from "@mui/material"
import theme from "../../../config/theme"
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
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice"
import Grow from "@mui/material/Grow"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

/********** CONSTANTES **********/
const logoUrl = "/logos/logo.svg"

const socialMedias = [
  {
    type: "youtube",
    image: YoutubeIcon,
    link: "https://www.youtube.com/c/NarcoProd",
  },
  {
    type: "instagram",
    image: InstagramIcon,
    link: "https://www.instagram.com/tarte_a_la_courgette",
  },
  {
    type: "facebook",
    image: FacebookIcon,
    link: "https://www.facebook.com/kioulekiou/",
  },
]

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

const Credits = () => {
  return (
    <Stack
      alignItems="center"
      textAlign="center"
      margin="3rem auto 0"
      padding="0 0.5rem"
    >
      <Typography
        fontSize="0.75rem"
        color={theme.palette.text.light}
        letterSpacing={1.5}
      >
        © Quentin Hébert 2022 – Site web developpé par Quentin Hébert -{" "}
        <Box
          component="a"
          href="/about-website"
          target="_blank"
          sx={{ "&:hover": { color: (theme) => theme.palette.text.secondary } }}
        >
          Plus d'informations
        </Box>
      </Typography>
    </Stack>
  )
}

export default function Footer(props) {
  // const bgColor = theme.palette.background.main;
  const bgColor = theme.palette.background.main
  const md = useMediaQuery(theme.breakpoints.down("md"))

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const variants = (key) => {
    if (key < 3)
      return {
        visible: {
          opacity: 1,
          scaleX: 1,
          transition: { duration: 0.7, delay: key / 10 },
        },
        hidden: { opacity: 0, scaleX: 0 },
      }
    return {
      visible: {
        opacity: 1,
        transition: { duration: 0.7, delay: key / 10 },
      },
      hidden: { opacity: 0 },
    }
  }
  const controls = useAnimation()

  React.useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  return (
    <Box
      component="footer"
      width={"100%"}
      paddingTop={10}
      paddingBottom={2}
      sx={{
        backgroundImage: "url(/medias/footer-wave.svg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      ref={ref}
    >
      <Stack
        direction={md ? "column" : "row"}
        width={"80%"}
        maxWidth={{ lg: "880px", xl: "1050px" }}
        margin="auto"
        justifyContent="space-between"
        alignItems="center"
        gap={4}
      >
        <motion.div
          initial="hidden"
          variants={variants(0)}
          animate={controls}
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Stack direction="row" justifyContent="center">
            <Link href="/" passHref>
              <Box
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  },
                }}
              >
                <Image src={logoUrl} width="150%" height="80%" />
              </Box>
            </Link>
          </Stack>
        </motion.div>

        <motion.div
          initial="hidden"
          variants={variants(1)}
          animate={controls}
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <Grow
            in
            style={{ transformOrigin: "0 0 0" }}
            {...(true ? { timeout: 1750 } : {})}
          >
            <Stack height="100%" justifyContent={"space-between"} gap={2}>
              <Button
                href="mailto:contact@quentinhebert.com"
                variant="text"
                size="large"
                startIcon={<LocalPostOfficeIcon />}
                sx={{
                  textTransform: "initial",
                  fontStyle: "italic",
                  textDecoration: "none",
                  fontFamily: "Arial, sans-serif",
                  color: "#FFF",
                }}
              >
                contact@quentinhebert.com
              </Button>
            </Stack>
          </Grow>
        </motion.div>

        <motion.div
          initial="hidden"
          variants={variants(2)}
          animate={controls}
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <Stack direction="row" width={"100%"} justifyContent="center">
            {socialMedias.map((social, key) => (
              <Box
                component="a"
                key={key}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                style={{ cursor: "pointer", margin: "0 0.5rem" }}
              >
                <Image src={social.image} height="40%" width="40%" />
              </Box>
            ))}
          </Stack>
        </motion.div>
      </Stack>

      <motion.div
        initial="hidden"
        variants={variants(3)}
        animate={controls}
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Credits />
      </motion.div>
    </Box>
  )
}
