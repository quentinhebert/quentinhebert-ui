import * as React from "react"
import {
  Box,
  Button,
  Slide,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material"
import { useScrollPosition } from "@n8tb1t/use-scroll-position"
import theme from "../../config/theme"
import BouncingArrow from "../Navigation/BouncingArrow"

export default function IndexHeadBandVideo(props) {
  const { scrollTo, refForScroll } = props

  const [showScrollToTopBtn, setShowScrollToTopBtn] = React.useState(false)

  // SCROLL TO TOP
  useScrollPosition(({ prevPos, currPos }) => {
    if (prevPos.y > currPos.y && !showScrollToTopBtn) {
      setShowScrollToTopBtn(true)
    } else if (prevPos.y < currPos.y && !showScrollToTopBtn) {
      setShowScrollToTopBtn(false)
    }
  })

  // STYLE
  const md = useMediaQuery(theme.breakpoints.down("md"))
  const landscape = useMediaQuery("@media (min-aspect-ratio: 16/9)")
  const portrait = useMediaQuery("@media (max-aspect-ratio: 16/9)")

  return (
    <Stack
      justifyContent="center"
      sx={{
        width: "100%",
        height: { xs: "600px", sm: "800px", md: "100vh" },
        minHeight: "500px",
        overflow: "hidden",
        // background: "linear-gradient(170deg, #393333 30%, black 100%)",
        // background: "linear-gradient(170deg, #2d465d 30%, black 100%)", // greg + betta
        // background: "linear-gradient(170deg, #325373 30%, black 100%)",
        background: "linear-gradient(170deg, #2b5b8a 30%, black 100%)",
      }}
    >
      <Stack
        paddingTop="2rem"
        height="90vh"
        sx={{
          flexDirection: "row",
        }}
      >
        <Stack
          width="100%"
          flexDirection="column"
          gap={0}
          sx={{
            padding: { xs: "6rem 0.5rem", md: "5rem 2rem" },
          }}
        >
          <Typography
            variant="h2"
            textTransform="uppercase"
            fontFamily="Arial"
            color="secondary"
            sx={{
              textAlignLast: "end",
              textAlign: "right",
              fontSize: { xs: "1rem", md: "2vw" },
              letterSpacing: { xs: "3px", md: "6px" },
              marginBottom: { xs: "10vw", md: "0" },
            }}
          >
            /// Freelance ///
          </Typography>

          <Stack
            sx={{
              backgroundImage: "url(/medias/caca.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "100% 10%",
              backgroundClip: "text",
              color: "transparent",
              "-webkit-background-clip": "text",
            }}
          >
            <Slide
              direction="right"
              {...(true ? { timeout: 1000 } : {})}
              in
              mountOnEnter
              unmountOnExit
            >
              <Box>
                <Typography
                  variant="h1"
                  fontFamily="Ethereal"
                  fontWeight="bold"
                  alignSelf="flex-start"
                  sx={{
                    fontSize: { xs: "4.2vw", md: "2.3vw" },
                    lineHeight: { xs: "5vw", md: "4rem" },
                    letterSpacing: { xs: 3, md: 7 },
                  }}
                >
                  Creative videomaker
                </Typography>
                <Typography
                  variant="h2"
                  fontFamily="Ethereal"
                  fontWeight="bold"
                  textTransform="uppercase"
                  alignSelf="flex-start"
                  sx={{
                    fontSize: { xs: "11vw", md: "9vw" },
                    lineHeight: { xs: "11vw", sm: "8vw" },
                  }}
                >
                  Film Director
                </Typography>
              </Box>
            </Slide>
            <Slide
              direction="left"
              {...(true ? { timeout: 1250 } : {})}
              in
              mountOnEnter
              unmountOnExit
            >
              <Typography
                variant="h2"
                fontFamily="Bambi Bold"
                fontWeight="bold"
                textTransform="uppercase"
                alignSelf="flex-end"
                sx={{
                  fontSize: { xs: "9.5vw", md: "10vw" },
                  letterSpacing: { xs: "2px", md: "7px" },
                  lineHeight: { xs: "9vw", sm: "7vw" },
                }}
              >
                AND EDITOR
              </Typography>
            </Slide>
          </Stack>

          <Slide
            direction="up"
            {...(true ? { timeout: 1500 } : {})}
            in
            mountOnEnter
            unmountOnExit
          >
            <Box>
              <Typography
                variant="h2"
                fontFamily="Zacbel X"
                color="secondary"
                sx={{
                  textAlignLast: "end",
                  textAlign: "right",
                  fontSize: "7.5vw",
                  marginTop: { xs: "12vw", md: "7.5vw" },
                  // background: `-webkit-linear-gradient(${theme.palette.secondary.main}, #77340d)`,
                  // "-webkit-background-clip": "text",
                  // "-webkit-text-fill-color": "transparent",
                }}
              >
                {"&"} Web Developper
              </Typography>
              <Slide
                direction="left"
                {...(true ? { timeout: 1500 } : {})}
                in
                mountOnEnter
                unmountOnExit
              >
                <Typography
                  color="#fff"
                  variant="h2"
                  fontFamily="Zacbel X"
                  sx={{
                    textAlignLast: "end",
                    textAlign: "right",
                    fontSize: { xs: "1rem", md: "1.6vw" },
                  }}
                >
                  JS Backend / Frontend
                </Typography>
              </Slide>
            </Box>
          </Slide>
        </Stack>
      </Stack>

      <Stack zIndex={10} justifyContent="end" alignItems="center">
        <BouncingArrow
          text="Voir plus"
          scrollTo={scrollTo}
          refForScroll={refForScroll}
        />
      </Stack>
    </Stack>
  )
}
