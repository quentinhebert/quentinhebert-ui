import { Stack, Typography, useMediaQuery } from "@mui/material"
import theme from "../../../config/theme"
import useSWR from "swr"
import apiCall from "../../../services/apiCalls/apiCall"
import AutoPlayCarousel from "../../Carousels/AutoPlayCarousel"
import styles from "../../../styles/TextShine.module.css"
import MediumTitle from "../../Titles/medium-title"

async function fetchUpToDateReferences() {
  const res = await apiCall.references.getAllPublic()
  const jsonRes = await res.json()
  return jsonRes
}

export default function ReferencesSection(props) {
  const { data } = useSWR(`references`, async () => fetchUpToDateReferences(), {
    fallbackData: props,
    revalidateOnMount: true,
  })

  const references = data

  /********** STYLE **********/
  const md = useMediaQuery(theme.breakpoints.down("md"))
  const sm = useMediaQuery(theme.breakpoints.down("sm"))
  const lg = useMediaQuery(theme.breakpoints.down("lg"))

  const noOfCards = lg ? (sm ? 3 : 4) : 6

  const ReferencesImgList = () => {
    if (!references.length) return <></>
    return <AutoPlayCarousel references={references} noOfCards={noOfCards} />
  }

  return (
    <Stack
      className="full-width flex-center"
      sx={{
        // backgroundColor: "#000",
        background: (theme) =>
          `linear-gradient(${theme.palette.secondary.main} 15%, #000 50%)`,
        height: "auto",
        padding: "6rem 0 12rem",
        zIndex: 0,
      }}
    >
      <Stack position="relative">
        <Typography variant="h2">Ils m'ont fait confiance</Typography>

        <Stack
          sx={{
            padding: "0rem 1rem .25rem",
            borderRadius: "50px",
            background: (theme) => theme.palette.background.secondary,
            boxShadow: "0px 10px 30px 4px rgb(0,0,0,0.5)",
            rotate: "-5deg",
            position: "absolute",
            bottom: "-.6rem",
            right: { xs: "-2rem", md: "-5rem" },
          }}
        >
          <Typography
            fontFamily="Kardust"
            color="#000"
            sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
          >
            Merci à eux !
          </Typography>
        </Stack>
      </Stack>

      <Stack
        paddingBottom="2rem"
        width="100%"
        flexDirection={sm ? "column" : "row"}
        overflow="hidden"
        justifyContent="center"
        alignItems="center"
      >
        <ReferencesImgList />
      </Stack>
    </Stack>
  )
}

export async function getStaticProps({ params }) {
  const {} = params
  const data = await fetchUpToDateReferences()
  let notFound = false

  if (data.statusCode === 400 || data.statusCode === 404) notFound = true

  return { props: data, notFound, revalidate: 60 }
}
