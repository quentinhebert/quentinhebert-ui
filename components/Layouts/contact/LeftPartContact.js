import * as React from "react"
import { Box, Link, Stack, Typography } from "@mui/material"
import PageTitle from "../../ReusableComponents/titles/page-title"
import SmallTitle from "../../ReusableComponents/titles/small-title"
import ScaleUpOnHoverStack from "../../ReusableComponents/animations/scale-up-on-hover-stack"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import EmailIcon from "@mui/icons-material/Email"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import styles from "../../../styles/TextShine.module.css"
import useSWR from "swr"
import apiCall from "../../../services/apiCalls/apiCall"

const SOCIAL_MEDIAS_ICONS = [
  {
    type: "youtube_url",
    icon: "/medias/social_icons/youtube.svg",
  },
  {
    type: "instagram_url",
    icon: "/medias/social_icons/instagram.svg",
  },
  {
    type: "facebook_url",
    icon: "/medias/social_icons/facebook.svg",
  },
  {
    type: "tiktok_url",
    icon: "/medias/social_icons/tiktok.svg",
  },
  {
    type: "linkedin_url",
    icon: "/medias/social_icons/linkedin.svg",
  },
  {
    type: "snapchat_url",
    icon: "/medias/social_icons/snapchat.svg",
  },
  {
    type: "whatsapp_url",
    icon: "/medias/social_icons/whatsapp.svg",
  },
  {
    type: "pinterest_url",
    icon: "/medias/social_icons/pinterest.svg",
  },
  {
    type: "vimeo_url",
    icon: "/medias/social_icons/vimeo.svg",
  },
  {
    type: "twitter_url",
    icon: "/medias/social_icons/twitter.svg",
  },
]

const fetchUpToDateContact = async () => {
  const res = await apiCall.unauthenticated.getWebsiteContact()
  const jsonRes = await res.json()
  return jsonRes
}

const SocialButton = ({ item }) => {
  const icon = SOCIAL_MEDIAS_ICONS.filter((obj) => obj.type === item.type)[0]
    .icon

  return (
    <Box component="a" href={item.link} target="_blank" rel="noreferrer">
      <ScaleUpOnHoverStack>
        <Box
          component="img"
          src={icon}
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
}

const SocialButtons = ({ socialMedias }) => (
  <Stack
    flexDirection="row"
    alignItems="center"
    gap={1}
    sx={{ marginBottom: "4rem" }}
  >
    {socialMedias &&
      socialMedias.map((item, key) => <SocialButton item={item} key={key} />)}
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
  const { data } = useSWR(
    `/website-contact`,
    async () => fetchUpToDateContact(),
    {
      fallbackData: props,
      revalidateOnMount: true,
    }
  )

  if (!data) return null

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
      <SocialButtons socialMedias={data.social_medias} />

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

export async function getStaticProps({ params }) {
  const {} = params
  const data = await fetchUpToDateContact()
  let notFound = false

  if (data.statusCode === 400 || data.statusCode === 404) notFound = true

  return { props: data, notFound, revalidate: 60 }
}
