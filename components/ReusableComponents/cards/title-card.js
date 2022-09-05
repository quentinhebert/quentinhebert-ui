import { styled } from "@mui/system"
import { Stack, Typography } from "@mui/material"
import StrokeText from "../text/stroke-text"
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

const Title = styled(({ stroketext, text, leftBgColor, rightBgColor }) => {
  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const controls = useAnimation()
  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75 },
    },
    hidden: { opacity: 0, y: -20 },
  }
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  return (
    <Stack
      borderRadius="10px"
      width="100%"
      padding="1rem"
      sx={{
        background: `linear-gradient(-50deg, ${rightBgColor}, ${leftBgColor})`,
      }}
      ref={ref}
    >
      <motion.div initial="hidden" variants={variants} animate={controls}>
        <Typography
          color="secondary"
          textAlign="center"
          variant="h2"
          textTransform="uppercase"
          fontStyle="italic"
          sx={{ fontSize: { xs: "2rem", md: "4rem" } }}
        >
          <StrokeText color={(theme) => theme.palette.secondary.main}>
            {stroketext}
          </StrokeText>{" "}
          {text}
        </Typography>
      </motion.div>
    </Stack>
  )
})(() => ({}))

export default function TitleCard(props) {
  return <Title {...props} />
}
