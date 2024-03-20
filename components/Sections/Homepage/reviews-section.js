import { Stack, Typography, useMediaQuery } from "@mui/material"
import theme from "../../../config/theme"
import useSWR from "swr"
import apiCall from "../../../services/apiCalls/apiCall"
import { useContext } from "react"
import { AppContext } from "../../../contexts/AppContext"
import translations from "../../../services/translation"

async function fetchUpToDateReviews() {
  const res = await apiCall.reviews.getAll()
  const jsonRes = await res.json()
  return jsonRes
}

export default function ReviewsSection(props) {
  const { lang } = useContext(AppContext)

  const { data } = useSWR(`reviews`, async () => fetchUpToDateReviews(), {
    fallbackData: props,
    revalidateOnMount: true,
  })

  const reviews = data

  /********** STYLE **********/
  const sm = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Stack
      className="full-width flex-center"
      sx={{
        background: "#000",
        height: "auto",
        padding: "6rem 0",
        zIndex: 0,
      }}
    >
      <Typography variant="h2" color="secondary">
        {translations.homepage.reviews.title[lang]}
      </Typography>
    </Stack>
  )
}

export async function getStaticProps({ params }) {
  const {} = params
  const data = await fetchUpToDateReviews()
  let notFound = false

  if (data.statusCode === 400 || data.statusCode === 404) notFound = true

  return { props: data, notFound, revalidate: 60 }
}
