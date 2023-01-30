import styles from "../../../../styles/TextShine.module.css"
import { Box, Stack, Typography, useMediaQuery } from "@mui/material"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import { useContext } from "react"
import { WebsitesHomePageContext } from "../../../../contexts/PagesContexts"
import useSWR from "swr"
import { fetchers } from "../../../../services/public-fetchers"
import ScaleUpOnHoverStack from "../../../Animation/scale-up-on-hover-stack"
import PillButton from "../../../Buttons/pill-button"
import Pill from "../../../Text/pill"
import CenteredMaxWidthContainer from "../../../Containers/centered-max-width-container"
import MediumTitle from "../../../Titles/medium-title"
import GradientTitleCard from "../../../Titles/gradient-title-card"
import BodyText from "../../../Text/body-text"

import dynamic from "next/dynamic"
const ImageCard = dynamic(() => import("../../../Cards/image-card"), {
  ssr: false,
})

export default function PortfolioSection(props) {
  const { topRef } = props

  /********* StaticProps cached at build time **********/
  const { staticData } = useContext(WebsitesHomePageContext)
  let data = staticData.websites

  /********** SWR revalidation while first returning cached static data **********/
  const swr = useSWR(`websites`, async () => fetchers.websites(), {
    fallbackData: data, // cached data initially returned by SWR
    revalidateOnMount: true,
  })
  if (!!swr.data) data = swr.data // When user loads the page, data is updated by fallbackData (cached === static data), then updated by fetched up-to-date data

  const desktop = useMediaQuery((theme) => theme.breakpoints.up("lg"))

  return (
    <Stack
      position="relative"
      sx={{
        background: (theme) =>
          // `linear-gradient(220deg, ${theme.palette.tersary.main} 10%, ${theme.palette.background.secondary} 100%)`,
          // `linear-gradient(220deg, #000 10%, ${theme.palette.background.secondary} 100%)`,
          `#000`,
      }}
    >
      <Stack ref={topRef} />

      <Stack margin="5rem 0" sx={{ gap: { xs: 2, lg: 10 } }}>
        <MediumTitle preventTransitionOut={desktop} textAlign="center">
          Mes projets web
        </MediumTitle>

        <Stack sx={{ gap: { xs: "4rem", lg: 15 } }}>
          {data.map((website, key) => (
            <CenteredMaxWidthContainer pixels="1200px" percents="80%" key={key}>
              <Stack
                zIndex={1}
                flexDirection={
                  key % 2 === 0
                    ? { xs: "column", lg: "row" }
                    : { xs: "column", lg: "row-reverse" }
                }
                sx={{
                  alignItems: "stretch",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: { xs: "10rem", lg: "2rem" },
                }}
              >
                <Stack
                  sx={{
                    width: { xs: "100%", lg: "calc(50% - 2rem)" },
                    display: { xs: "none", lg: "flex" },
                    justifyContent: "center",
                  }}
                >
                  <ImageCard img={website.thumbnail_url} preventTransitionOut />
                </Stack>

                <Stack
                  zIndex={3}
                  alignItems="center"
                  textAlign="center"
                  gap={2}
                  sx={{ width: { xs: "100%", lg: "calc(50% - 2rem)" } }}
                >
                  <Typography
                    variant="h3"
                    className={styles.shine}
                    color="#fff"
                    padding="0 .5rem"
                  >
                    {website.client}
                  </Typography>

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

                  <Stack sx={{ width: { xs: "100%", lg: "49%" } }}>
                    <ImageCard
                      img={website.thumbnail_url}
                      display={{ xs: "flex", lg: "none" }}
                      width={{ xs: "100%", lg: "49%" }}
                      minHeight={{ xs: "200px", sm: "400px" }}
                    />
                  </Stack>

                  <BodyText preventTransitionOut={desktop} textAlign="justify">
                    {website.description}
                  </BodyText>

                  <Stack className="full-width" alignItems="end">
                    <BodyText
                      preventTransitionOut={desktop}
                      className={styles.shine}
                    >
                      – Réalisé en {website.year}
                    </BodyText>
                  </Stack>

                  <ScaleUpOnHoverStack>
                    <PillButton
                      background={(theme) =>
                        // `linear-gradient(10deg, ${theme.palette.tersary.main} 0%, ${theme.palette.background.secondary} 100%)`
                        theme.palette.background.secondary
                      }
                    >
                      <Stack className="row flex-center" gap={1}>
                        <Box
                          component="a"
                          target="_blank"
                          textTransform="capitalize"
                          fontFamily="trophy"
                          href={
                            website.url.startsWith("https")
                              ? website.url
                              : `https://${website.url}`
                          }
                        >
                          Accéder au site
                        </Box>
                        <OpenInNewIcon />
                      </Stack>
                    </PillButton>
                  </ScaleUpOnHoverStack>
                </Stack>
              </Stack>
            </CenteredMaxWidthContainer>
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}
