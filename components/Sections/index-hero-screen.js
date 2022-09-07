import * as React from "react"
import { Box, Slide, Stack, Typography } from "@mui/material"
import theme from "../../config/theme"
import BouncingArrow from "../Navigation/BouncingArrow"
import { motion } from "framer-motion"
import styles from "../../styles/NeonFlickerText.module.css"

export default function IndexHeadBandVideo(props) {
  const { scrollTo, refForScroll } = props

  return (
    <Stack
      justifyContent="center"
      width="100%"
      overflow="hidden"
      paddingTop="6rem"
      zIndex={1}
      sx={{
        height: { xs: "300px", sm: "600px", md: "700px", lg: "100vh" },
        minHeight: { xs: "600px", lg: "calc(800px + 2rem)" },
        backgroundImage: "url(/medias/homepage-background.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
      }}
    >
      <Stack
        padding="2rem 2rem 0 2rem"
        height="100%"
        width="100%"
        flexDirection="column"
        gap={0}
      >
        <Stack
          sx={{
            color: theme.palette.secondary.main,
          }}
        >
          <Slide
            direction="right"
            {...{ timeout: 1000 }}
            in
            mountOnEnter
            unmountOnExit
          >
            <Box>
              <Box className={styles.sign}>
                <Typography
                  // className="no-select"
                  className={styles.fastflicker}
                  fontFamily="Ethereal"
                  fontWeight="bold"
                  sx={{
                    color: "#fff",
                    fontSize: { xs: "4.2vw", md: "2.3vw" },
                    lineHeight: { xs: "8vw", md: "4rem" },
                    letterSpacing: { xs: 2, md: 3 },
                    textShadow: "2px 2px 7px #000",
                  }}
                >
                  Creative videomaker
                </Typography>
              </Box>

              <Typography
                className="no-select"
                fontFamily="Ethereal"
                fontWeight="bold"
                alignSelf="flex-start"
                sx={{
                  fontSize: { xs: "11vw", md: "9vw" },
                  lineHeight: { xs: "10vw", md: "8vw" },
                }}
              >
                Film director
                <br />
                and editor
              </Typography>
            </Box>
          </Slide>
        </Stack>

        <motion.div
          className={styles.sign}
          initial={{ rotate: 0, scale: 0.5 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{ duration: 0.75 }}
        >
          <Typography
            className={styles.fastflicker2}
            fontFamily="Helmet"
            textAlign="center"
            sx={{
              color: "#fff",
              rotate: "45deg",
              fontSize: { xs: "10vw", md: "9vw" },
              lineHeight: { xs: "7rem", md: "8rem" },
              textShadow: "2px 2px 7px #000",
            }}
          >
            +
          </Typography>
        </motion.div>

        <Slide
          direction="left"
          {...{ timeout: 1000 }}
          in
          mountOnEnter
          unmountOnExit
        >
          <Box>
            <Typography
              fontFamily="Zacbel X"
              className="no-select"
              color="secondary"
              sx={{
                textAlignLast: "end",
                textAlign: "right",
                fontSize: "7vw",
              }}
            >
              Web developper
            </Typography>

            <Box className={styles.sign}>
              <Typography
                // className="no-select"
                className={styles.fastflicker3}
                color="#fff"
                fontFamily="Zacbel X"
                sx={{
                  textAlignLast: "end",
                  textAlign: "right",
                  fontSize: { xs: "0.8rem", sm: "1rem", md: "1.6vw" },
                  textShadow: "2px 2px 7px #000",
                }}
              >
                JS Backend / Frontend
              </Typography>
            </Box>
          </Box>
        </Slide>
      </Stack>

      <Stack
        zIndex={10}
        justifyContent="end"
        alignItems="center"
        sx={{ display: "flex" }}
      >
        <BouncingArrow
          text=""
          scrollTo={scrollTo}
          refForScroll={refForScroll}
        />
      </Stack>
    </Stack>
  )
}
