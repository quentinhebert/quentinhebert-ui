import * as React from "react"
import { Box, Link, Stack, Typography, useMediaQuery } from "@mui/material"
import PageTitle from "../../ReusableComponents/titles/page-title"
import SmallTitle from "../../ReusableComponents/titles/small-title"
import ScaleUpOnHoverStack from "../../ReusableComponents/animations/scale-up-on-hover-stack"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import EmailIcon from "@mui/icons-material/Email"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import styles from "../../../styles/TextShine.module.css"

const SOCIAL_MEDIAS = [
  {
    type: "youtube",
    image: "/medias/social_icons/youtube.svg",
    link: "https://www.youtube.com/c/NarcoProd",
  },
  {
    type: "instagram",
    image: "/medias/social_icons/instagram.svg",
    link: "https://www.instagram.com/tarte_a_la_courgette",
  },
  {
    type: "facebook",
    image: "/medias/social_icons/facebook.svg",
    link: "https://www.facebook.com/kioulekiou/",
  },
]

const SocialButton = ({ item }) => (
  <Box component="a" href={item.link} target="_blank" rel="noreferrer">
    <ScaleUpOnHoverStack>
      <Box
        component="img"
        src={item.image}
        alt={item.type}
        sx={{
          color: (theme) => theme.palette.text.white,
          width: "30px",
          height: "30px",
          marginRight: ".5rem",
          "&:hover": { opacity: 0.9 },
        }}
      />
    </ScaleUpOnHoverStack>
  </Box>
)

const SocialButtons = () => (
  <Stack
    flexDirection="row"
    alignItems="center"
    gap={1}
    sx={{ marginBottom: "4rem" }}
  >
    {SOCIAL_MEDIAS.map((item, key) => (
      <SocialButton item={item} key={key} />
    ))}
  </Stack>
)

const ContactLink = ({ href, text, icon }) => (
  <Link
    href={href}
    sx={{
      color: (theme) => theme.palette.text.white,
      display: "flex",
      textDecoration: "none",
    }}
  >
    {icon}
    <Typography className="cool-button" sx={{ marginLeft: "1rem" }}>
      {text}
    </Typography>
  </Link>
)

const LocationText = ({ text, icon }) => (
  <Stack
    display="flex"
    flexDirection="row"
    sx={{ color: (theme) => theme.palette.text.white }}
  >
    {icon}
    <Typography sx={{ marginLeft: "1rem" }}>{text}</Typography>
  </Stack>
)

export default function LeftPartContact(props) {
  return (
    <Stack
      width="100%"
      alignItems={"flex-start"}
      justifyContent="center"
      margin="0 auto"
      gap={2}
    >
      <PageTitle
        text="Contact"
        color={(theme) => theme.palette.secondary.main}
        className={styles.shine}
      />

      <SmallTitle>Suis-moi, je te fuis !</SmallTitle>
      <SocialButtons />

      <SmallTitle>Informations utiles</SmallTitle>
      <Stack sx={{ letterSpacing: "1.5px", gap: "0.7rem" }}>
        <ContactLink
          href="tel:+33 6 11 54 17 75"
          text="06 11 54 17 75"
          icon={<LocalPhoneIcon />}
        />
        <ContactLink
          href="mailto:hello@quentinhebert.com"
          text="hello@quentinhebert.com"
          icon={<EmailIcon />}
        />
        <LocationText
          text="Compiègne, Hauts-De-France"
          icon={<LocationOnIcon />}
        />
        <LocationText
          text="Disponible partout en France"
          icon={<DirectionsCarIcon />}
        />
      </Stack>
    </Stack>
  )
}
