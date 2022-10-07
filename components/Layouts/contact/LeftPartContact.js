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
import Image from "next/image"
import youtubeIcon from "../../../public/medias/social_icons/youtube.svg"
import facebookIcon from "../../../public/medias/social_icons/facebook.svg"
import instagramIcon from "../../../public/medias/social_icons/instagram.svg"
import tiktokIcon from "../../../public/medias/social_icons/tiktok.svg"
import linkedinIcon from "../../../public/medias/social_icons/linkedin.svg"
import snapchatIcon from "../../../public/medias/social_icons/snapchat.svg"
import pinterestIcon from "../../../public/medias/social_icons/pinterest.svg"
import whatsappIcon from "../../../public/medias/social_icons/whatsapp.svg"
import vimeoIcon from "../../../public/medias/social_icons/vimeo.svg"
import twitterIcon from "../../../public/medias/social_icons/twitter.svg"
import MotionDivDownOnMount from "../../ReusableComponents/animations/motion-div-down-on-mount"

const SOCIAL_MEDIAS_ICONS = [
  {
    type: "youtube_url",
    icon: youtubeIcon,
  },
  {
    type: "instagram_url",
    icon: instagramIcon,
  },
  {
    type: "facebook_url",
    icon: facebookIcon,
  },
  {
    type: "tiktok_url",
    icon: tiktokIcon,
  },
  {
    type: "linkedin_url",
    icon: linkedinIcon,
  },
  {
    type: "snapchat_url",
    icon: snapchatIcon,
  },
  {
    type: "whatsapp_url",
    icon: whatsappIcon,
  },
  {
    type: "pinterest_url",
    icon: pinterestIcon,
  },
  {
    type: "vimeo_url",
    icon: vimeoIcon,
  },
  {
    type: "twitter_url",
    icon: twitterIcon,
  },
]

const fetchUpToDateContact = async () => {
  const res = await apiCall.unauthenticated.getWebsiteContact()
  const jsonRes = await res.json()
  return jsonRes
}

const SocialButton = ({ item, delay }) => {
  const icon = SOCIAL_MEDIAS_ICONS.filter((obj) => obj.type === item.type)[0]
    .icon
  return (
    <Box component="a" href={item.link} target="_blank" rel="noreferrer">
      <MotionDivDownOnMount delay={0.25 + delay / 5}>
        <ScaleUpOnHoverStack>
          <Box sx={{ marginRight: ".5rem" }}>
            <Image src={icon} width="30" height="30" priority />
          </Box>
        </ScaleUpOnHoverStack>
      </MotionDivDownOnMount>
    </Box>
  )
}

const SocialButtons = ({ socialMedias }) => {
  if (!socialMedias || !socialMedias.length) return <></>
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      gap={1}
      sx={{ marginBottom: "4rem" }}
    >
      {socialMedias.map((item, key) => (
        <SocialButton item={item} key={key} delay={key} />
      ))}
    </Stack>
  )
}

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

const ContactLinks = ({ contact }) => {
  if (!contact || !contact.length) return <></>

  return contact.map((item, key) => {
    let prefix
    const ICONS = {
      phone: <LocalPhoneIcon />,
      email: <EmailIcon />,
    }
    if (item.type === "phone") prefix = "tel"
    if (item.type === "email") prefix = "mailto"

    if (item.show || item.show === null)
      return (
        <ContactLink
          key={key}
          href={`${prefix}:${item.value}`}
          text={item.value}
          icon={ICONS[item.type]}
        />
      )
  })
}

const LocationText = ({ text, icon }) => (
  <Stack
    display="flex"
    flexDirection="row"
    sx={{ color: (theme) => theme.palette.text.white }}
  >
    {icon || null}
    <Typography sx={{ marginLeft: "1rem" }}>{text}</Typography>
  </Stack>
)

const AddressSection = ({ addressItems }) => {
  if (!addressItems?.length) return <></>

  // Get data values
  let parsedAddress = ""
  const line1 = addressItems.filter((elt) => elt.type === "address_line_1")[0]
    ?.value
  const line2 = addressItems.filter((elt) => elt.type === "address_line_2")[0]
    ?.value
  const postalCode = addressItems.filter(
    (elt) => elt.type === "address_postal_code"
  )[0]?.value
  const city = addressItems.filter((elt) => elt.type === "address_city")[0]
    ?.value
  const region = addressItems.filter((elt) => elt.type === "address_region")[0]
    ?.value
  const country = addressItems.filter(
    (elt) => elt.type === "address_country"
  )?.value
  const mobility = addressItems.filter((elt) => elt.type === "mobility")[0]
    ?.value

  // Parse the address from data
  if (line1) parsedAddress += `${line1},`
  if (line2) parsedAddress += ` ${line2},`
  if (city) parsedAddress += ` ${city}`
  if (postalCode) parsedAddress += ` ${postalCode}`
  if (region) parsedAddress += `, ${region}`
  if (country) parsedAddress += `, ${country}`

  return (
    <>
      <LocationText text={parsedAddress} icon={<LocationOnIcon />} />
      {mobility && (
        <LocationText text={mobility} icon={<DirectionsCarIcon />} />
      )}
    </>
  )
}

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
      paddingRight={10}
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
        <ContactLinks contact={data.contact} />

        <AddressSection addressItems={data.address} />
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
