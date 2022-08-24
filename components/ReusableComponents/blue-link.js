import React from "react"
import { Stack, Typography } from "@mui/material"
import theme from "../../config/theme"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"

export default function BlueLink(props) {
  /********** PROPS **********/
  const { href, text } = props

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const variants = {
    visible: {
      opacity: 1,
      transition: { duration: 0.75, delay: 0 },
    },
    hidden: { opacity: 0 },
  }
  const controls = useAnimation()

  React.useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  /********** RENDER **********/
  return (
    <Stack alignItems="center" ref={ref}>
      <motion.div
        initial="hidden"
        variants={variants}
        animate={controls}
        style={{ zIndex: 1 }}
      >
        <Link href={href || "#"}>
          <Stack
            flexDirection="row"
            marginTop="0.5rem"
            alignItems="center"
            sx={{
              color: theme.palette.text.link,
              fontSize: { xs: "1rem", md: "1.3rem" },
            }}
          >
            <Typography
              variant="h6"
              fontFamily="Arial"
              textAlign="center"
              lineHeight="1.3rem"
              className="cool-link"
              sx={{
                color: theme.palette.text.link,
                cursor: "pointer",
                marginRight: "0.5rem",
                fontSize: { xs: "1.1rem", md: "1.3rem" },
                letterSpacing: { xs: "1px", md: "2px" },
              }}
            >
              {text}
            </Typography>
            {">"}
          </Stack>
        </Link>
      </motion.div>
    </Stack>
  )
}
