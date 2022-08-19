import * as React from "react"
import { Stack } from "@mui/material"
import theme from "../../config/theme"
import PortfolioTabs from "../Navigation/portfolio-tabs"
import HeadBandVideo from "../sections/head-band-video"
import DuoTextBand from "../sections/duo-text-band"
import ScrollToTopBtn from "../Navigation/scroll-to-top"
import Navbar from "../Navigation/Navbars/navbar"
import Footer from "../Navigation/Footers/Footer"
import useSWR from "swr"
import Loading from "../Other/loading"
import apiCall from "../../services/apiCalls/apiCall"
import PortfolioVideos from "../sections/portfolio-videos"
import { getQueryParam } from "../../services/utils"

async function fetchUpToDateWorkPageData() {
  const res = await apiCall.unauthenticated.getWorkPageData()
  const jsonRes = await res.json()
  return jsonRes
}

export default function WorkLayout(props) {
  const {} = props

  const defaultCategory = getQueryParam("ctg")
  const [videoId, setVideoId] = React.useState(null)
  const [title, setTitle] = React.useState("")
  const [tab, setTab] = React.useState(0)

  const { data, error, mutate } = useSWR(
    `/work`,
    async () => fetchUpToDateWorkPageData(),
    {
      fallbackData: props,
      revalidateOnMount: true,
    }
  )

  if (!data) return <Loading />
  const { categories, videos } = data

  console.log(data)

  // Selected category/tab from URI
  React.useEffect(() => {
    if (categories) {
      for (const i = 0; i < categories.length; i += 1) {
        if (categories[i].slug === defaultCategory)
          return setTab(categories[i].id - 1)
      }
    }
  }, [defaultCategory, categories])

  const getVimeoId = (uri) => {
    return uri.split("vimeo.com/")[1]
  }

  // Background videos for header of Work Page
  React.useEffect(() => {
    if (categories && categories.length) {
      setVideoId(getVimeoId(categories[tab].bg_video_url))
      setTitle(categories[tab].header_title)
    }
  }, [tab])

  const handleChangeIndex = (index) => {
    setTab(index)
  }
  const topRef = React.useRef()
  const portfolioRef = React.useRef()
  const refsForScroll = {
    portfolio: portfolioRef,
  }
  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  return (
    <>
      <Stack ref={topRef} />
      <Navbar />
      <HeadBandVideo
        mainText={title}
        buttonText="Watch my work"
        videoId={videoId}
        bgPositionY={19}
        buttonUrl="#"
        scrollTo={scrollTo}
        refForScroll={refsForScroll.portfolio}
      />

      {/* PORTFOLIO */}
      <Stack ref={portfolioRef} sx={{ scrollMarginTop: "50px" }} />
      <Stack paddingBottom="2rem" bgcolor="white">
        <PortfolioTabs tab={tab} setTab={setTab} categories={categories} />
        <PortfolioVideos
          videos={videos}
          tab={tab}
          handleChangeIndex={handleChangeIndex}
        />
      </Stack>

      <ScrollToTopBtn refForScroll={topRef} />
      <Footer />
    </>
  )
}

export async function getStaticProps({ params }) {
  const {} = params
  const data = await fetchUpToDateWorkPageData()
  let notFound = false

  if (data.statusCode === 400 || data.statusCode === 404) notFound = true

  return { props: data, notFound, revalidate: 60 }
}
