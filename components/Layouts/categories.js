import * as React from "react"
import { Stack, useMediaQuery } from "@mui/material"
import theme from "../../config/theme"
import MultirowGallery from "../sections/multirow-gallery"
import BicolorTitleBand from "../sections/bicolor-title-band"
import apiCall from "../../services/apiCalls/apiCall"
import useSWR from "swr"
import Loading from "../Other/loading"

async function fetchUpToDateCategories() {
  const res = await apiCall.unauthenticated.getPublicCategories()
  const jsonRes = await res.json()
  return jsonRes
}

export default function Catgeories(props) {
  const {} = props

  const { data, error, mutate } = useSWR(
    `/`,
    async () => fetchUpToDateCategories(),
    {
      fallbackData: props,
      revalidateOnMount: true,
    }
  )

  if (!data) return <Loading />

  const [categoriesLine1, setCategoriesLine1] = React.useState([])
  const [categoriesLine2, setCategoriesLine2] = React.useState([])

  const isMobileOrTablet = useMediaQuery((theme) =>
    theme.breakpoints.down("sm")
  )

  // React.useEffect(() => {
  //   if (data && data.length) {
  //     const categories = [data[0], data[1], data[2]]
  //     const categoriesL2 = [data[3], data[4]]

  //     setCategoriesLine1(categories)
  //     setCategoriesLine2(categoriesL2)
  //   }
  // }, [data])

  React.useEffect(() => {
    if (data && data.length) {
      setCategoriesLine1(data)
    }
  }, [data])

  return (
    <Stack paddingBottom="2rem" bgcolor="white">
      <BicolorTitleBand
        secondaryText="Découvrez"
        secondaryColor="#000"
        mainText="Mes réalisations"
        mainColor={theme.palette.text.secondary}
        padding={isMobileOrTablet ? "2rem" : "4rem"}
      />
      {/* <MultirowGallery images={categoriesLine1} />
      <MultirowGallery images={categoriesLine2} cols={2} /> */}
      <MultirowGallery cols={4} images={categoriesLine1} />
    </Stack>
  )
}

export async function getStaticProps({ params }) {
  const {} = params
  const data = await fetchUpToDateCategories()
  let notFound = false

  if (data.statusCode === 400 || data.statusCode === 404) notFound = true

  return { props: data, notFound, revalidate: 60 }
}
