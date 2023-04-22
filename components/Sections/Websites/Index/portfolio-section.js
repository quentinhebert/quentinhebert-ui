import styles from "../../../../styles/TextShine.module.css"
import {
  Box,
  CircularProgress,
  Grid,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import { Fragment, useContext, useState } from "react"
import { WebsitesHomePageContext } from "../../../../contexts/PagesContexts"
import useSWR from "swr"
import { fetchers } from "../../../../services/public-fetchers"
import PillButton from "../../../Buttons/pill-button"
import Pill from "../../../Text/pill"
import CenteredMaxWidthContainer from "../../../Containers/centered-max-width-container"
import MediumTitle from "../../../Titles/medium-title"
import BodyText from "../../../Text/body-text"
import LaunchIcon from "@mui/icons-material/Launch"
import OpenInFullIcon from "@mui/icons-material/OpenInFull"
import { Parallax } from "react-scroll-parallax"

import dynamic from "next/dynamic"
import BrowserUiModal from "../../../Modals/browser-ui-modal"
import { buildPublicURL } from "../../../../services/utils"
import ImageViewer from "../../../Modals/image-viewer"
import translations from "../../../../services/translation"
import { AppContext } from "../../../../contexts/AppContext"
const ImageCard = dynamic(() => import("../../../Cards/image-card"), {
  ssr: false,
})

const ProjectClient = (props) => (
  <Typography
    variant="h3"
    // className={styles.shine}
    color="#fff"
    padding="0 .5rem"
    {...props}
  />
)
const Thumbnail = ({ active, ...props }) => (
  <Box
    component="img"
    width="25%"
    height="6rem"
    sx={{
      objectFit: "cover",
      objectPosition: "50%",
      filter: active ? "" : `brightness(0.4)`,
      cursor: active ? "default" : `pointer`,
      transition: ".2s ease-in-out",
      "&:hover": {
        filter: active ? "" : `brightness(0.8)`,
      },
    }}
    {...props}
  />
)
const Overlay = (props) => (
  <Stack
    className="full-width full-height flex-center absolute top left pointer"
    sx={{
      transition: ".2s .25s ease",
      "& .MuiSvgIcon-root": {
        opacity: "0",
        transition: ".2s .25s ease",
      },
      "&:hover": {
        backdropFilter: "blur(3px) brightness(0.3)",
        "& .MuiSvgIcon-root": { opacity: "1", fontSize: "3rem" },
      },
    }}
    {...props}
  />
)
const Pictures = ({ display, thumbnail_url, images, title }) => {
  const [displayedPath, setDisplayedPath] = useState(thumbnail_url)
  const [openFullscreen, setOpenFullscreen] = useState(false)
  const handleFullscreen = () => setOpenFullscreen(true)
  const handleCloseFullscreen = () => {
    setDisplayedPath(thumbnail_url)
    setOpenFullscreen(false)
  }
  return (
    <Grid
      item
      xs={12}
      lg={6}
      sx={{
        display: display || { xs: "none", lg: "flex" },
        flexDirection: "column",
      }}
    >
      <Stack gap={2} height="100%">
        <Stack
          height="100%"
          position="relative"
          sx={{
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <ImageCard
            img={displayedPath}
            preventTransitionOut
            minHeight="200px"
          />
          <Overlay onClick={handleFullscreen}>
            <OpenInFullIcon color="secondary" sx={{ fontSize: "0rem" }} />
          </Overlay>
        </Stack>

        {!!images.length && images.length > 1 && (
          <Stack
            sx={{
              flexDirection: "row",
              borderRadius: "20px",
              overflow: "hidden",
              gap: 0.3,
              WebkitMaskImage: "-webkit-radial-gradient(white, black)", // Fix for safari overflow hidden
              background: "rgb(256,256,256,0.025)",
            }}
          >
            <Thumbnail
              src={thumbnail_url}
              active={displayedPath === thumbnail_url}
              onClick={() => setDisplayedPath(thumbnail_url)}
            />
            {images.map((img, key) => (
              <Thumbnail
                key={key}
                src={buildPublicURL(img.path, { imgSize: "small" })}
                active={displayedPath === buildPublicURL(img.path)}
                onClick={() => setDisplayedPath(buildPublicURL(img.path))}
              />
            ))}
          </Stack>
        )}

        {openFullscreen && (
          <ImageViewer
            title={title}
            open={openFullscreen}
            handleClose={handleCloseFullscreen}
            images={[thumbnail_url, ...images]}
          />
        )}
      </Stack>
    </Grid>
  )
}

export default function PortfolioSection(props) {
  const { topRef } = props

  const { lang } = useContext(AppContext)

  /********* StaticProps cached at build time **********/
  const { staticData } = useContext(WebsitesHomePageContext)
  let data = staticData.websites

  /********** SWR revalidation while first returning cached static data **********/
  const swr = useSWR(`websites`, async () => fetchers.websites(), {
    fallbackData: data, // cached data initially returned by SWR
    revalidateOnMount: true,
  })
  if (!!swr.data) data = swr.data // When user loads the page, data is updated by fallbackData (cached === static data), then updated by fetched up-to-date data

  const [progress, setProgress] = useState(0)
  const [selectedWebsite, setSelectedWebsite] = useState({})
  const [openWebview, setOpenWebsiew] = useState(false)
  const handleOpenWebview = () => setOpenWebsiew(true)
  const handleCloseWebview = () => {
    setSelectedWebsite({})
    setOpenWebsiew(false)
  }
  function handleProgress(value) {
    return setProgress(Math.round(value * 100))
  }

  const desktop = useMediaQuery((theme) => theme.breakpoints.up("lg"))

  const Progress = () => (
    <Box
      sx={{
        position: "sticky",
        padding: 2,
        bottom: 0,
        display: "inline-flex",
        zIndex: 1,
        width: "100%",
      }}
    >
      <Stack position="relative">
        <CircularProgress
          size={75}
          thickness={1.5}
          variant="determinate"
          value={progress}
          color="secondary"
          sx={{ background: "rgb(0,0,0,0.7)", borderRadius: "100%" }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="secondary"
            fontSize="1rem"
            sx={{
              textShadow: (theme) => `0 0 15px ${theme.palette.secondary.main}`,
            }}
          >
            {`${Math.round(progress)}%`}
          </Typography>
        </Box>
      </Stack>
    </Box>
  )

  return (
    <>
      <Stack
        sx={{
          position: "relative",
          background: `linear-gradient(120deg, #000 0%, #151210 50%, #000 100%)`,
          position: "relative",
        }}
      >
        <Stack ref={topRef} sx={{ scrollMarginTop: "60px" }} />

        <CenteredMaxWidthContainer
          percents="80%"
          pixels="1200px"
          margin="5rem auto 10rem"
          sx={{
            gap: { xs: "3rem", lg: "5rem" },
          }}
        >
          <Stack>
            <BodyText textAlign="center" fontStyle="italic">
              {translations.websites.portfolio.topLine[lang]}
            </BodyText>
            <MediumTitle
              preventTransitionOut={desktop}
              textAlign="center"
              sx={{
                background: (theme) =>
                  `-webkit-linear-gradient(-180deg, ${theme.palette.secondary.main} 0%, ${theme.palette.tersary.main} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                padding: "0 1rem 0 0",
              }}
            >
              {translations.websites.portfolio.title[lang]}
            </MediumTitle>
          </Stack>

          <Parallax onProgressChange={(value) => handleProgress(value)}>
            <Grid
              container
              rowSpacing={{ xs: 12, lg: 25 }}
              columnSpacing={{ xs: 0, lg: 8 }}
              width="100%"
              alignSelf="center"
            >
              {data.map((website, key) => (
                <Fragment key={key}>
                  {key % 2 === 0 && (
                    <Pictures
                      title={website.client}
                      thumbnail_url={website.thumbnail_url}
                      images={website.images}
                    />
                  )}

                  <Grid
                    item
                    xs={0}
                    lg={6}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                    gap={2}
                  >
                    <ProjectClient>{website.client}</ProjectClient>

                    <Box component="span" textAlign="center">
                      {website.tags.map((tag, key) => (
                        <Pill
                          animDelay={key}
                          key={key}
                          preventTransitionOut={desktop}
                          lineHeight={0}
                          padding={{ xs: ".1rem 1rem", lg: "0rem .75rem" }}
                        >
                          <BodyText
                            color="#000"
                            preventTransitionOut={desktop}
                            textTransform="initial"
                            fontSize=".8rem"
                          >
                            /{tag}
                          </BodyText>
                        </Pill>
                      ))}
                    </Box>

                    <Stack width="100%">
                      <Pictures
                        title={website.client}
                        display={{ xs: "flex", lg: "none" }}
                        thumbnail_url={website.thumbnail_url}
                        images={website.images}
                      />
                    </Stack>

                    <BodyText
                      preventTransitionOut={desktop}
                      textAlign="justify"
                    >
                      {website.description[lang]}
                    </BodyText>

                    <Stack className="full-width" alignItems="end">
                      <BodyText
                        preventTransitionOut={desktop}
                        className={styles.shine}
                      >
                        – {translations.websites.portfolio.date[lang]}{" "}
                        {website.year}
                      </BodyText>
                    </Stack>

                    <Stack className="flex-center row" gap={2}>
                      <PillButton
                        scaleUpOnHover
                        disabled={!website.url}
                        background={(theme) =>
                          !website.url
                            ? ""
                            : `linear-gradient(-78deg, ${theme.palette.secondary.main}, ${theme.palette.tersary.main})`
                        }
                        boxShadow={(theme) =>
                          `0 0 20px ${theme.palette.secondary.main}`
                        }
                        textTransform="capitalize"
                        gap={1}
                        fontFamily="trophy"
                        fontSize={{ xs: ".6rem", md: "1rem" }}
                        onClick={() => {
                          setSelectedWebsite(website)
                          handleOpenWebview()
                        }}
                      >
                        {translations.websites.portfolio.btn[lang]}
                        <RemoveRedEyeIcon />
                      </PillButton>
                      <Tooltip
                        title={translations.websites.portfolio.newTab[lang]}
                      >
                        <LaunchIcon
                          color={!website.url ? "primary" : "secondary"}
                          sx={{
                            "&:hover": { opacity: !website.url ? 1 : 0.5 },
                            cursor: !website.url ? "default" : "pointer",
                          }}
                          onClick={
                            !website.url
                              ? () => {}
                              : () => window.open(website.url)
                          }
                        />
                      </Tooltip>
                    </Stack>
                  </Grid>

                  {key % 2 !== 0 && (
                    <Pictures
                      title={website.client}
                      thumbnail_url={website.thumbnail_url}
                      images={website.images}
                    />
                  )}
                </Fragment>
              ))}
            </Grid>
          </Parallax>
        </CenteredMaxWidthContainer>
        <Progress />
      </Stack>

      <BrowserUiModal
        title={selectedWebsite.client}
        src={selectedWebsite.url}
        open={openWebview}
        handleClose={handleCloseWebview}
      />
    </>
  )
}
