import React, { useEffect, useRef, useState } from "react"
import { Stack, Typography } from "@mui/material"
import ContactForm from "../Forms/contact-form"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function ContactSection(props) {
  const {} = props

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const variants = (key) => {
    if (key === 0)
      return {
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.75, delay: 0 },
        },
        hidden: { opacity: 0, x: -25 },
      }
    return {
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.75, delay: 0 },
      },
      hidden: { opacity: 0, x: 25 },
    }
  }
  const controls = useAnimation()

  React.useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  return (
    <Stack
      width="100%"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{
        overflow: "hidden",
        backgroundColor: (theme) => theme.palette.secondary.main,
        padding: "2rem",
      }}
      ref={ref}
    >
      <motion.div initial="hidden" variants={variants(0)} animate={controls}>
        <Stack justifyContent="center" alignItems="center" flexDirection="row">
          <Typography
            textAlign="center"
            color="text.primaryDark"
            fontWeight="bold"
            display="flex"
            sx={{
              fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
              letterSpacing: { xs: "0.5px", sm: "1px", md: "1.5px" },
            }}
          >
            Toutes les histoires commencent ici !
          </Typography>
        </Stack>
      </motion.div>

      <motion.div
        initial="hidden"
        variants={variants(1)}
        animate={controls}
        style={{ width: "100%" }}
      >
        <ContactForm />
      </motion.div>
    </Stack>
  )
}
