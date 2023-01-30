import styles from "../../../../styles/TextShine.module.css"
import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material"
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
import BodyText from "../../../Text/body-text"

import dynamic from "next/dynamic"
import Link from "next/link"
const ImageCard = dynamic(() => import("../../../Cards/image-card"), {
  ssr: false,
})

const ProjectClient = (props) => (
  <Typography
    variant="h3"
    className={styles.shine}
    color="#fff"
    padding="0 .5rem"
    {...props}
  />
)
const Pictures = ({ data = { thumbnail_url } }) => (
  <Grid item xs={0} lg={6} sx={{ display: { xs: "none", lg: "flex" } }}>
    <ImageCard img={data.thumbnail_url} preventTransitionOut />
  </Grid>
)

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
    <CenteredMaxWidthContainer percents="80%" sx={{ background: "#000" }}>
      <Stack ref={topRef} />

      <Stack margin="5rem 0" sx={{ gap: { xs: "3rem", lg: "5rem" } }}>
        <MediumTitle preventTransitionOut={desktop} textAlign="center">
          Mes projets web
        </MediumTitle>

        <Grid
          container
          rowSpacing={{ xs: 12, lg: 16 }}
          columnSpacing={{ xs: 0, lg: 4 }}
          width="100%"
          alignSelf="center"
        >
          {data.map((website, key) => (
            <>
              {key % 2 === 0 && (
                <Pictures data={{ thumbnail_url: website.thumbnail_url }} />
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
                  <ImageCard
                    img={website.thumbnail_url}
                    display={{ xs: "flex", lg: "none" }}
                    minHeight={{ xs: "200px", md: "300px" }}
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
                  <Link
                    href={
                      website.url.startsWith("https")
                        ? website.url
                        : `https://${website.url}`
                    }
                    target="_blank"
                    passHref
                  >
                    <PillButton
                      background={(theme) => theme.palette.background.secondary}
                      textTransform="capitalize"
                      gap={1}
                      fontFamily="trophy"
                    >
                      Accéder au site
                      <OpenInNewIcon />
                    </PillButton>
                  </Link>
                </ScaleUpOnHoverStack>
              </Grid>

              {key % 2 !== 0 && (
                <Pictures data={{ thumbnail_url: website.thumbnail_url }} />
              )}
            </>
          ))}
        </Grid>
      </Stack>
    </CenteredMaxWidthContainer>
  )
}
