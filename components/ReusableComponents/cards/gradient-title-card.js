import { styled } from "@mui/system"
import { Stack, Typography } from "@mui/material"
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

const Title = styled((props) => {
  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const controls = useAnimation()
  const variants = (key) => {
    if (key === 0)
      return {
        visible: {
          opacity: 1,
          transition: { duration: 0.75 },
        },
        hidden: { opacity: 0 },
      }
    return {
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.75 },
      },
      hidden: { opacity: 0, y: -20 },
    }
  }
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  return (
    <motion.div
      initial="hidden"
      variants={variants(0)}
      animate={controls}
      style={{ width: "100%" }}
    >
      <Stack
        borderRadius="10px"
        width="100%"
        padding="1rem"
        sx={{
          background: (theme) =>
            `linear-gradient(${props.inversed ? "-" : ""}50deg, ${
              props.bgcolor || theme.palette.background.main
            }, transparent)`,
        }}
        ref={ref}
      >
        <motion.div initial="hidden" variants={variants(1)} animate={controls}>
          <Typography
            color="secondary"
            textAlign="center"
            variant="h2"
            sx={{ fontSize: { xs: "2rem", md: "4rem" } }}
            {...props}
          />
        </motion.div>
      </Stack>
    </motion.div>
  )
})(() => ({}))

export default function GradientTitleCard(props) {
  return <Title {...props} />
}
