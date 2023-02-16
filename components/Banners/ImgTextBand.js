import { Stack, Typography, useMediaQuery } from "@mui/material"
import theme from "../../config/theme"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"

export default function ImgTextBand(props) {
  const { img, title, titleColor, text, textColor, reverse, portrait } = props
  const md = useMediaQuery(theme.breakpoints.down("md"))

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const variants = (delay) => ({
    visible: {
      opacity: 1,
      y: 10,
      transition: { duration: 0.75, delay },
    },
    hidden: { opacity: 0, y: 0 },
  })
  const controls = useAnimation()
  useEffect(() => {
    if (inView) controls.start("visible")
    else controls.start("hidden")
  }, [controls, inView])

  return (
    <Stack
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      width="100%"
      direction={
        reverse ? (md ? "column" : "row-reverse") : md ? "column" : "row"
      }
      backgroundColor="transparent"
      ref={ref}
    >
      <Stack width={md ? "90%" : "40%"} padding={md ? ".5rem" : "1rem"}>
        <motion.div
          initial="hidden"
          variants={variants(0.5)}
          animate={controls}
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            component="h2"
            color={titleColor || "#fff"}
            fontFamily="Helmet"
            textTransform="uppercase"
            letterSpacing="2px"
            margin="1rem 0"
            textAlign="center"
          >
            {title}
          </Typography>
          <Typography
            color={textColor || "#fff"}
            fontFamily="Helmet"
            letterSpacing="2px"
            textAlign="center"
            width="80%"
            margin="auto"
          >
            {text}
          </Typography>
        </motion.div>
      </Stack>

      <motion.div
        initial="hidden"
        variants={variants(0.25)}
        animate={controls}
        style={{
          height: portrait ? (md ? "400px" : "600px") : md ? "200px" : "200px",
          width: md ? "80%" : "40%",
        }}
      >
        <Stack
          justifyContent="center"
          alignContent="center"
          alignItems="center"
          padding={md ? ".5rem" : "1rem"}
          sx={{
            height: "100%",
            width: "100%",

            backgroundImage: `url(${img})`,
            backgroundPosition: "50%",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />
      </motion.div>
    </Stack>
  )
}
