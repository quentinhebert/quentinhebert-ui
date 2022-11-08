import styles from "../../../../styles/TextShine.module.css"
import { Box, Stack, useMediaQuery } from "@mui/material"
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
import StrokeText from "../../../Text/stroke-text"
import ImageCard from "../../../Cards/image-card"

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

  const desktop = useMediaQuery((theme) => theme.breakpoints.up("md"))

  return (
    <Stack
      position="relative"
      sx={{
        background: (theme) =>
          `linear-gradient(220deg, ${theme.palette.tersary.main} 10%, ${theme.palette.background.secondary} 100%)`,
      }}
    >
      <Stack ref={topRef} />

      <Stack gap="5rem" margin="5rem 0">
        <MediumTitle
          preventTransitionOut={desktop}
          textAlign="center"
          // className={styles.shine}
          fontFamily="Zacbel X"
          letterSpacing={1}
          lineHeight={{ xs: "15vw", sm: "10vw" }}
        >
          <StrokeText>Mes </StrokeText>projets
        </MediumTitle>

        {data.map((website, key) => (
          <CenteredMaxWidthContainer pixels="1200px" percents="80%" key={key}>
            <Stack
              zIndex={1}
              gap="4rem"
              flexDirection={
                key % 2 === 0
                  ? { xs: "column", md: "row" }
                  : { xs: "column", md: "row-reverse" }
              }
              sx={{
                alignItems: "stretch",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Stack
                sx={{
                  width: { xs: "100%", md: "calc(50% - 2rem)" },
                  justifyContent: "center",
                }}
              >
                <ImageCard img={website.thumbnail_url} preventTransitionOut />
              </Stack>

              <Stack
                zIndex={3}
                alignItems="center"
                gap={2}
                sx={{ width: { xs: "100%", md: "calc(50% - 2rem)" } }}
              >
                <GradientTitleCard
                  preventTransitionOut={desktop}
                  bgcolor="transparent"
                  textTransform="uppercase"
                  fontFamily="Zacbel X"
                  letterSpacing={2}
                  fontSize="2rem"
                  className={styles.shine}
                  color={(theme) => theme.palette.text.white}
                >
                  {website.client}
                </GradientTitleCard>

                <Box component="span" textAlign="center">
                  {website.tags.map((tag, key) => (
                    <Pill
                      animDelay={key}
                      key={key}
                      preventTransitionOut={desktop}
                      padding={{ xs: ".1rem 1rem", md: ".25rem 1.5rem" }}
                    >
                      <BodyText color="#000" preventTransitionOut={desktop}>
                        /{tag}
                      </BodyText>
                    </Pill>
                  ))}
                </Box>

                <Stack sx={{ width: { xs: "100%", md: "49%" } }}>
                  <ImageCard
                    img={website.thumbnail_url}
                    display={{ xs: "flex", md: "none" }}
                    width={{ xs: "100%", md: "49%" }}
                    minHeight={{ xs: "200px", sm: "400px" }}
                  />
                </Stack>

                <BodyText preventTransitionOut={desktop} textAlign="justify">
                  {website.description}
                </BodyText>
                <Stack className="full-width" alignItems="end">
                  <BodyText preventTransitionOut={desktop}>
                    – Réalisé en {website.year}
                  </BodyText>
                </Stack>

                <ScaleUpOnHoverStack>
                  <PillButton
                    background={(theme) =>
                      `linear-gradient(10deg, ${theme.palette.tersary.main} 0%, ${theme.palette.background.secondary} 100%)`
                    }
                  >
                    <Stack className="row flex-center" gap={1}>
                      <Box component="a" target="_blank" href={website.url}>
                        Accéder au site
                      </Box>
                      <OpenInNewIcon sx={{ display: "flex" }} />
                    </Stack>
                  </PillButton>
                </ScaleUpOnHoverStack>
              </Stack>
            </Stack>
          </CenteredMaxWidthContainer>
        ))}
      </Stack>
    </Stack>
  )
}
