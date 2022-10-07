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
import getSocialIcon from "../../Other/get-social-icon"
import { motion } from "framer-motion"
import StaggerParent from "../../ReusableComponents/animations/stagger-parent"
import { moveLeftVariants } from "../../ReusableComponents/animations/variants"

const fetchUpToDateContact = async () => {
  const res = await apiCall.unauthenticated.getWebsiteContact()
  const jsonRes = await res.json()
  return jsonRes
}

const SocialButton = ({ item }) => {
  return (
    <Box component="a" href={item.link} target="_blank" rel="noreferrer">
      <motion.div variants={moveLeftVariants}>
        <ScaleUpOnHoverStack>
          <Box sx={{ marginRight: ".5rem" }}>
            <Image
              src={getSocialIcon(item.type)}
              width="30"
              height="30"
              priority
            />
          </Box>
        </ScaleUpOnHoverStack>
      </motion.div>
    </Box>
  )
}

const SocialButtons = ({ socialMedias }) => {
  if (!socialMedias || !socialMedias.length) return <></>
  return (
    <Stack sx={{ marginBottom: "4rem" }}>
      <StaggerParent className="flex row flex-center gap-10">
        {socialMedias.map((item, key) => (
          <SocialButton item={item} key={key} />
        ))}
      </StaggerParent>
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
        <motion.div
          key={key}
          className="full-width"
          variants={moveLeftVariants}
        >
          <ContactLink
            href={`${prefix}:${item.value}`}
            text={item.value}
            icon={ICONS[item.type]}
          />
        </motion.div>
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
      <motion.div className="full-width" variants={moveLeftVariants}>
        <LocationText text={parsedAddress} icon={<LocationOnIcon />} />
      </motion.div>

      {mobility && (
        <motion.div className="full-width" variants={moveLeftVariants}>
          <LocationText text={mobility} icon={<DirectionsCarIcon />} />
        </motion.div>
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

  if (!data || !data.social_medias || !data.contact || !data.address)
    return <></>

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

      <StaggerParent
        className="flex column"
        staggerChildren={0.6}
        style={{
          letterSpacing: "1.5px",
          gap: "0.7rem",
        }}
      >
        <ContactLinks contact={data.contact} />

        <AddressSection addressItems={data.address} />
      </StaggerParent>
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
