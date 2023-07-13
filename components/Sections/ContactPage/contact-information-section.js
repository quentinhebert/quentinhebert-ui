import { Box, Link, Stack, Typography } from "@mui/material"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import EmailIcon from "@mui/icons-material/Email"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import useSWR from "swr"
import Image from "next/image"
import getSocialIcon from "../../Other/get-social-icon"
import { motion } from "framer-motion"
import { fetchers } from "../../../services/public-fetchers"
import PageTitle from "../../Titles/page-title"
import SmallTitle from "../../Titles/small-title"
import ScaleUpOnHoverStack from "../../Animation/scale-up-on-hover-stack"
import StaggerParent from "../../Animation/stagger-parent"
import { fadeVariant, moveLeftVariants } from "../../Animation/variants"
import MotionDivOnMount from "../../Animation/motion-div-on-mount"
import { useContext } from "react"
import { AppContext } from "../../../contexts/AppContext"
import translations from "../../../services/translation"

export default function ContactInformationSection(props) {
  const { staticData } = props
  const swr = useSWR(`websiteContact`, async () => fetchers.websiteContact(), {
    fallbackData: props.staticData,
    revalidateOnMount: true,
  })
  let data = staticData
  if (!!swr.data) data = swr.data

  const { lang } = useContext(AppContext)

  // if (!data || !data.social_medias || !data.contact || !data.address)
  //   return <></>

  return (
    <Stack
      width="100%"
      alignItems={"flex-start"}
      justifyContent="center"
      margin="0 auto"
      paddingRight={10}
      gap={8}
    >
      <PageTitle
        text="Contact"
        color={(theme) => theme.palette.secondary.main}
      />

      <Stack gap={2}>
        <MotionDivOnMount
          visible={fadeVariant.visible}
          hidden={fadeVariant.hidden}
          delay={0.75}
        >
          <SmallTitle>{translations.contact.socialNetworks[lang]}</SmallTitle>
        </MotionDivOnMount>
        <SocialButtons socialMedias={data?.social_medias} />
      </Stack>

      <Stack gap={2}>
        <MotionDivOnMount
          visible={fadeVariant.visible}
          hidden={fadeVariant.hidden}
          delay={1}
        >
          <SmallTitle>{translations.contact.links[lang]}</SmallTitle>
        </MotionDivOnMount>

        <StaggerParent
          className="flex column"
          staggerChildren={0.6}
          style={{
            letterSpacing: "1.5px",
            gap: "0.7rem",
          }}
        >
          <ContactLinks contact={data?.contact} />

          <AddressSection addressItems={data?.address} />
        </StaggerParent>
      </Stack>
    </Stack>
  )
}

function SocialButton({ item }) {
  return (
    <Box component="a" href={item.value} target="_blank" rel="noreferrer">
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
function SocialButtons({ socialMedias }) {
  if (!socialMedias || !socialMedias.length) return <></>
  return (
    <Stack>
      <StaggerParent className="flex row gap-10" staggerChildren={0.6}>
        {socialMedias.map((item, key) => (
          <SocialButton item={item} key={key} />
        ))}
      </StaggerParent>
    </Stack>
  )
}
function ContactLink({ href, text, icon }) {
  return (
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
}
function ContactLinks({ contact }) {
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
function LocationText({ text, icon }) {
  return (
    <Stack
      display="flex"
      flexDirection="row"
      sx={{ color: (theme) => theme.palette.text.white }}
    >
      {icon || null}
      <Typography sx={{ marginLeft: "1rem" }}>{text}</Typography>
    </Stack>
  )
}
function AddressSection({ addressItems }) {
  const { lang } = useContext(AppContext)

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
  const mobilityTransltionEn = addressItems.filter(
    (elt) => elt.type === "mobility_translation_en"
  )[0]?.value

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
          {lang === "en" && (
            <LocationText
              text={mobilityTransltionEn}
              icon={<DirectionsCarIcon />}
            />
          )}
          {lang !== "en" && (
            <LocationText text={mobility} icon={<DirectionsCarIcon />} />
          )}
        </motion.div>
      )}
    </>
  )
}
