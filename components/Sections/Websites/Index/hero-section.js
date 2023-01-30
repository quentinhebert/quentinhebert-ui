import { Box, Slide, Stack, Typography, Divider } from "@mui/material"
import PillButton from "../../../Buttons/pill-button"
import BouncingArrow from "../../../Navigation/BouncingArrow"
import StrokeText from "../../../Text/stroke-text"
import styles from "../../../../styles/TextShine.module.css"
import { motion, useAnimation } from "framer-motion"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"

const CTAIsland = ({ ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 1 }}
    style={{ margin: "2rem 0" }}
  >
    <Stack
      margin="auto"
      padding="1rem 2rem"
      sx={{
        // width: { xs: "60%", sm: "50%", lg: "40%" },
        // width: { xs: "60%", sm: "50%", lg: "80%" },
        minWidth: "300px",
        background: "#000",
        flexDirection: "row",
        borderRadius: "100px",
        boxShadow: (theme) =>
          `0px 0px 30px 5px ${theme.palette.secondary.main}`,
        textShadow: (theme) => `0px 0px 20px ${theme.palette.secondary.main}`,
        marginTop: { xs: "8vh", md: 0 },
      }}
      {...props}
    />
  </motion.div>
)
const CTAButton = ({ onClick, label, delay }) => (
  <Stack width="50%" textAlign="center">
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay || 0, duration: 1 }}
    >
      <Typography
        color="secondary"
        className="flex-center"
        display="flex"
        fontFamily="Trophy"
        gap={1}
        sx={{
          padding: "0 1rem",
          fontSize: { xs: ".6rem", sm: ".8rem", md: "1.3rem" },
          cursor: "pointer",
          transition: "0.3s ease-in-out",
          "& > .MuiSvgIcon-root": {
            transition: "0.3s ease-in-out",
          },
          "&:hover": {
            transform: "scale(1.1)",
            "& > .MuiSvgIcon-root": {
              transition: "0.3s ease-in-out",
              translate: { xs: "5px", md: "10px", lg: "15px" },
            },
          },
        }}
        onClick={onClick}
      >
        {label} <ArrowRightAltIcon />
      </Typography>
    </motion.div>
  </Stack>
)

export default function HeroSection(props) {
  const { refsForScroll } = props

  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  return (
    <Stack
      zIndex={1}
      sx={{
        position: "relative",
        marginTop: "-82px",
        background: (theme) =>
          `linear-gradient(170deg, ${theme.palette.secondary.main} 0%, #000 60%)`,
        width: "100%",
        minHeight: "600px",
        height: { xs: "70vh", md: "100vh" },
      }}
    >
      {/* Right Text */}
      <Slide direction="left" {...{ timeout: 1000 }} in>
        <Stack
          sx={{
            alignSelf: "end",
            width: { xs: "100%", sm: "80%", md: "60%" },
            height: "100%",
            padding: {
              xs: "1rem 1.5rem 0 1rem",
              sm: "1rem 1.5rem 0 1rem",
              md: "1rem 1.5rem 0 5rem",
            },
            justifyContent: "center",
          }}
        >
          <Stack>
            <Typography
              variant="h1"
              color="secondary"
              sx={{
                textAlign: "right",
                paddingRight: { xs: 0, md: 5 },
                fontSize: {
                  xs: "18vw",
                  sm: "12vw",
                  md: "10vw",
                },
                lineHeight: {
                  xs: "18vw",
                  sm: "12vw",
                  md: "10vw",
                },
              }}
            >
              Developpeur web
              <br />
              <StrokeText className={styles.shine} padding="5%">
                Freelance
              </StrokeText>
            </Typography>

            {/* CTA BUTTONS */}
            <CTAIsland>
              <CTAButton
                onClick={() => scrollTo(refsForScroll.portfolio)}
                label="Projets"
              />
              <Divider
                orientation="vertical"
                sx={{
                  borderColor: "rgb(256,256,256,0.3)",
                  borderWidth: "1px",
                  height: "auto",
                }}
              />
              <CTAButton
                delay={0.5}
                onClick={() =>
                  alert(
                    "C'est pas encore codé ! Tout vient à point à qui sait attendre"
                  )
                }
                label="CV"
              />
            </CTAIsland>
          </Stack>
        </Stack>
      </Slide>

      <Slide
        direction="right"
        {...(true ? { timeout: 1000 } : {})}
        in
        mountOnEnter
        unmountOnExit
      >
        <Box
          sx={{
            position: "absolute",
            backgroundImage: "url(/medias/developper-alpha.png)",
            backgroundSize: {
              xs: "220%",
              sm: "230%",
              md: "200%",
              lg: "220%",
            },
            backgroundPosition: {
              xs: "40% 20%",
              sm: "40% 60%",
              md: "30% 40%",
            },
            backgroundRepeat: "no-repeat",
            width: "70%",
            pointerEvents: "none",
            left: 0,
            top: 0,
            minHeight: { xs: "500px", md: "600px" },
            height: { xs: "70vh", md: "100vh" },
            zIndex: 1,
          }}
        />
      </Slide>

      <Stack
        zIndex={10}
        justifyContent="end"
        alignItems="center"
        sx={{
          position: "absolute",
          bottom: 20,
          width: "100%",
        }}
      >
        <BouncingArrow
          text=""
          scrollTo={scrollTo}
          refForScroll={refsForScroll.portfolio}
        />
      </Stack>
    </Stack>
  )
}
