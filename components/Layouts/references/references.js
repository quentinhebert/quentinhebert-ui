import { Stack, Typography, useMediaQuery } from "@mui/material"
import theme from "../../../config/theme"
import useSWR from "swr"
import apiCall from "../../../services/apiCalls/apiCall"
import AutoPlayCarousel from "./AutoPlayCarousel"
import MediumTitle from "../../ReusableComponents/titles/medium-title"
import styles from "../../../styles/TextShine.module.css"

async function fetchUpToDateReferences() {
  const res = await apiCall.unauthenticated.getReferences()
  const jsonRes = await res.json()
  return jsonRes
}

export default function References(props) {
  const { data } = useSWR(
    `/references`,
    async () => fetchUpToDateReferences(),
    {
      fallbackData: props,
      revalidateOnMount: true,
    }
  )

  const references = data

  /********** STYLE **********/
  const md = useMediaQuery(theme.breakpoints.down("md"))
  const sm = useMediaQuery(theme.breakpoints.down("sm"))

  const noOfCards = md ? (sm ? 3 : 4) : 6

  const ReferencesImgList = () => {
    if (!references.length) return <></>
    return <AutoPlayCarousel references={references} noOfCards={noOfCards} />
  }

  return (
    <Stack
      className="full-width flex-center"
      sx={{ backgroundColor: "red", height: "100vh" }}
    >
      <MediumTitle
        textAlign="center"
        className={styles.shine}
        marginBottom="2rem"
      >
        Ils m'ont fait confiance
      </MediumTitle>
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
