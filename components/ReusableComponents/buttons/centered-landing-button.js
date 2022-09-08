import { styled } from "@mui/system"
import { Box, Stack, Typography } from "@mui/material"
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

const CustomButton = styled((props) => {
  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const controls = useAnimation()
  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1 },
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
  const motionDivStyle = {
    display: "flex",
    alignItems: "center",
  }

  return (
    <Stack flexDirection="row" ref={ref}>
      <motion.div
        initial="hidden"
        variants={variants}
        animate={controls}
        style={motionDivStyle}
      >
        <Box
          component="a"
          className="cool-button no-select"
          sx={{
            cursor: "pointer",
          }}
          onClick={props.onClick}
        >
          <Typography
            color="secondary"
            textTransform="uppercase"
            letterSpacing={1}
            sx={{ fontSize: { xs: "0.9rem", md: "1.2rem" } }}
            {...props}
          />
        </Box>
        <ChevronRightIcon
          sx={{
            color: (theme) => theme.palette.text.secondary,
          }}
        />
      </motion.div>
    </Stack>
  )
})(() => ({}))

export default function CenteredLandingButton(props) {
  return <CustomButton {...props} />
}
