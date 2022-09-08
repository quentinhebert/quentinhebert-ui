import CenteredMaxWidthContainer from "../../ReusableComponents/containers/centered-max-width-container"
import MediumTitle from "../../ReusableComponents/titles/medium-title"
import styles from "../../../styles/TextShine.module.css"
import { Stack } from "@mui/material"
import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function WebsitesPortfolio(props) {
  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const controls = useAnimation()
  const variants = (key) => {
    return {
      visible: {
        opacity: 1,
        y: 1,
        transition: { duration: 1, delay: key / 10 },
      },
      hidden: { opacity: 0, y: -25 },
    }
  }
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])
  const motionDivStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  return (
    <>
      <Stack ref={ref}>
        <motion.div
          initial="hidden"
          variants={variants(0)}
          animate={controls}
          style={motionDivStyle}
        >
          <MediumTitle
            textAlign="center"
            className={styles.shine}
            fontFamily="Zacbel X"
            letterSpacing={1}
            lineHeight={{ xs: "15vw", sm: "10vw" }}
          >
            Mes projets
          </MediumTitle>
        </motion.div>
      </Stack>
      <CenteredMaxWidthContainer></CenteredMaxWidthContainer>
    </>
  )
}
