import { Stack, useMediaQuery } from "@mui/material"
import theme from "../../../config/theme"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import BicolorTitle from "../../ReusableComponents/bicolor-title"
import useSWR from "swr"
import apiCall from "../../../services/apiCalls/apiCall"
import AutoPlayCarousel from "./AutoPlayCarousel"

async function fetchUpToDateReferences() {
  const res = await apiCall.unauthenticated.getReferences()
  const jsonRes = await res.json()
  return jsonRes
}

export default function References(props) {
  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const variants = (key) => {
    return {
      visible: {
        opacity: 1,
        scaleX: 1,
        transition: { duration: 0.5, delay: key / 10 },
      },
      hidden: { opacity: 0, scaleX: 0 },
    }
  }
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  const { data, error, mutate } = useSWR(
    `/references`,
    async () => fetchUpToDateReferences(),
    {
      fallbackData: props,
      revalidateOnMount: true,
    }
  )

  if (!data) return <Loading />
  const references = data

  /********** STYLE **********/
  const md = useMediaQuery(theme.breakpoints.down("md"))
  const sm = useMediaQuery(theme.breakpoints.down("sm"))

  const noOfCards = md ? (sm ? 3 : 4) : 8

  const ReferencesImgList = () => {
    if (!references.length) return <></>
    return <AutoPlayCarousel references={references} noOfCards={noOfCards} />
  }

  return (
    <Stack
      width="100%"
      bgcolor={theme.palette.background.main}
      alignItems="center"
      ref={ref}
    >
      <BicolorTitle
        secondaryText="My"
        secondaryColor={theme.palette.text.secondary}
        mainText="References"
        mainColor={theme.palette.text.light}
        bgColor={theme.palette.background.main}
        padding="2rem"
      />
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
