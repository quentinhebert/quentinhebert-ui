import { Box, CircularProgress, Stack, Typography } from "@mui/material"
import BodyText from "../../Text/body-text"
import { Parallax } from "react-scroll-parallax"
import LeftSubmitButton from "../../Buttons/left-submit-button"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import { useEffect, useState } from "react"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const birthdate = new Date("1998/1/15")
const cur = new Date()
const diff = cur - birthdate
const age = Math.floor(diff / 31536000000)

const GalleryImg = ({ src, ...props }) => (
  <Box
    width="100%"
    height="100%"
    sx={{
      background: `url(${src})`,
      backgroundPosition: "50%",
      backgroundSize: "cover",
      borderRadius: "100%",
      aspectRatio: "1",
      border: (theme) => `4px solid ${theme.palette.secondary.main}`,
      overflow: "hidden",
      boxShadow: "0 0 3rem 2rem rgb(0,0,0,0.2)",
    }}
    {...props}
  >
    <Box
      width="100%"
      height="100%"
      sx={{
        background: `url(/medias/film_grain.jpg)`,
        mixBlendMode: "screen",
        backgroundPosition: "50%",
        backgroundSize: "cover",
      }}
    />
  </Box>
)

export default function WelcomeSection(props) {
  const { scrollTo, topRef, refForScroll } = props

  const [progress, setProgress] = useState(0)

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const controls = useAnimation()
  const textVariant = (delay) => ({
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, delay, ease: [0.25, 0.1, 0.25, 1.0] },
    },
    hidden: {
      x: -25,
      opacity: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  })
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  const Progress = () => (
    <Box sx={{ position: "relative", display: "inline-flex", opacity: 0.3 }}>
      <CircularProgress
        size={100}
        thickness={1.5}
        variant="determinate"
        value={progress}
        color="secondary"
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
          fontSize="1.2rem"
        >
          {`${Math.round(progress)}%`}
        </Typography>
      </Box>
    </Box>
  )

  return (
    <>
      <Stack ref={topRef} sx={{ scrollMarginTop: "-80px" }} />

      <Stack
        ref={ref}
        width="100%"
        justifyContent="center"
        zIndex={0}
        position="relative"
        sx={{
          marginTop: ".1px",
          backgroundImage:
            "linear-gradient(#000 0%, rgb(0,0,0,0.5) 50%, #000 100%), url(/medias/bubbles.svg)",
          backgroundSize: "cover",
          backgroundPosition: `100%`,
        }}
      >
        <Stack
          className="full-width bottom left"
          sx={{
            flexDirection: { xs: "column", lg: "row" },
          }}
        >
          <Stack
            sx={{
              width: { xs: "100%", lg: "50%" },
              zIndex: 1,
              gap: 0,
              position: "relative",
            }}
          >
            <Parallax
              easing="easeInQuad"
              scale={[1, 1.2]}
              translateY={[0, 100]}
              translateX={[-5, -5]}
              rotate={["0deg", "-20deg"]}
              onProgressChange={(prgrs) => setProgress(prgrs * 100)}
              style={{
                width: "60%",
                height: "60%",
                alignSelf: "end",
                zIndex: 1,
              }}
            >
              <GalleryImg src="/medias/cover.jpg" />
            </Parallax>
            <Parallax
              easing="easeInQuad"
              scale={[0.6, 1.6]}
              translateY={[-20, -100]}
              translateX={[10, 10]}
              rotate={["0deg", "20deg"]}
              style={{
                width: "40%",
                height: "40%",
                zIndex: 2,
              }}
            >
              <GalleryImg src="/medias/portrait.jpg" />
            </Parallax>
            <Parallax
              easing="easeInQuad"
              translateY={[-50, 0]}
              scale={[1, 0.2]}
              rotate={["0deg", "20deg"]}
              style={{
                width: "60%",
                height: "60%",
                alignSelf: "center",
                zIndex: 1,
              }}
            >
              <GalleryImg src="/medias/aalh.jpg" />
            </Parallax>

            <Parallax
              easing="easeInQuad"
              translateY={[0, -100]}
              rotate={["-20deg", "20deg"]}
              style={{
                position: "absolute",
                bottom: "10%",
                right: "20%",
                zindex: 0,
              }}
            >
              <Progress />
            </Parallax>
          </Stack>

          <Stack
            sx={{
              width: { xs: "100%", lg: "50%" },
              padding: "2rem 2rem 40vw",
            }}
          >
            <Parallax translateY={["0vw", "25vw"]}>
              <Stack gap="2rem">
                <motion.div
                  animate={controls}
                  initial="hidden"
                  variants={textVariant(0)}
                >
                  <Typography
                    variant="h2"
                    fontFamily="POPFINE"
                    color="secondary"
                  >
                    <span style={{ color: "#FFF" }}>Créons</span> ensemble,{" "}
                    <span style={{ color: "#FFF" }}>voyons</span> plus loin
                  </Typography>
                </motion.div>
                <motion.div
                  animate={controls}
                  initial="hidden"
                  variants={textVariant(0.5)}
                >
                  <BodyText preventTransition>
                    Je m'appelle Quentin, j'ai {age} ans et je suis vidéaste
                    professionnel et développeur web en freelance.
                    <br />
                    <br />
                    Donnons du sens à vos idées, que ce soit en vidéo ou sur le
                    web, et réalisons ensemble un film ou un site qui vous
                    ressemble.
                  </BodyText>
                </motion.div>

                <motion.div
                  animate={controls}
                  initial="hidden"
                  variants={textVariant(1)}
                >
                  <Box width="100%">
                    <LeftSubmitButton onClick={() => scrollTo(refForScroll)}>
                      <Typography
                        sx={{
                          fontSize: { xs: ".6rem", md: ".8rem" },
                        }}
                      >
                        Services
                      </Typography>{" "}
                      <ArrowRightAltIcon />
                    </LeftSubmitButton>
                  </Box>
                </motion.div>
              </Stack>
            </Parallax>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}
