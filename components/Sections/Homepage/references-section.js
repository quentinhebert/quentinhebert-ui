import {
  Box,
  Grid,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material"
import theme from "../../../config/theme"
import useSWR from "swr"
import apiCall from "../../../services/apiCalls/apiCall"
import AutoPlayCarousel from "../../Carousels/AutoPlayCarousel"
import styles from "../../../styles/TextShine.module.css"
import MediumTitle from "../../Titles/medium-title"
import { useContext, useEffect } from "react"
import { AppContext } from "../../../contexts/AppContext"
import translations from "../../../services/translation"
import { useInView } from "react-intersection-observer"
import { motion, useAnimation } from "framer-motion"

async function fetchUpToDateReferences() {
  const res = await apiCall.references.getAllPublic()
  const jsonRes = await res.json()
  return jsonRes
}

export default function ReferencesSection(props) {
  const { lang } = useContext(AppContext)

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
    // return <AutoPlayCarousel references={references} noOfCards={noOfCards} />

    /********** ANIMATION **********/
    const [ref, inView] = useInView()
    const controls = useAnimation()
    useEffect(() => {
      if (inView) {
        controls.start("visible")
      } else {
        controls.start("hidden")
      }
    }, [controls, inView])

    return (
      <Grid
        container
        ref={ref}
        justifyContent="center"
        p={{ xs: "4rem 0", sm: "4rem 1rem", md: "4rem", lg: "4rem 10rem" }}
      >
        {references.map((r, key) => (
          <Grid
            item
            key={key}
            xs={2}
            sm={1.5}
            xl={1.25}
            sx={{
              borderRadius: { xs: "1rem", lg: "2rem" },
              margin: { xs: ".5rem", sm: ".5rem 1rem" },
              overflow: "hidden",
            }}
          >
            <motion.div
              initial="hidden"
              variants={{
                visible: {
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                    delay: key / 13,
                    ease: [0.32, 0, 0.67, 0],
                  },
                },
                hidden: { opacity: 0 },
              }}
              animate={controls}
              style={{ height: "100%" }}
            >
              <Tooltip title={r.label}>
                <Box
                  width="100%"
                  height="100%"
                  component="img"
                  src={r.logo_url}
                  sx={{
                    objectFit: "cover",
                    objectPosition: "50%",
                    filter: "grayscale(100%)",
                    transition: ".1s ease-in-out",
                    "&:hover": { filter: "grayscale(0)" },
                  }}
                />
              </Tooltip>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <Stack
      className="full-width flex-center"
      sx={{
        background: (theme) =>
          `linear-gradient(${theme.palette.secondary.main} 10%, ${theme.palette.background.black} 60%)`,
        height: "auto",
        padding: "14rem 0 6rem",
        zIndex: 0,
      }}
    >
      <Stack position="relative">
        <Typography variant="h2">
          {translations.homepage.references.title[lang]}
        </Typography>

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
            {translations.homepage.references.subtitle[lang]}
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
