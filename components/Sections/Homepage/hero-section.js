import { Box, Slide, Stack, Typography } from "@mui/material"
import theme from "../../../config/theme"
import BouncingArrow from "../../Navigation/BouncingArrow"
import { motion, useAnimation } from "framer-motion"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import styles from "../../../styles/TextShine.module.css"

const SHORT_MENU = [
  {
    label: "Vidéo",
    href: "/films",
  },
  {
    label: "Web",
    href: "/websites",
  },
]

const lineVariant = {
  hidden: {
    opacity: 0,
    scaleX: 0,
  },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 2, ease: [0.25, 0.1, 0.25, 1.0] },
  },
}

export default function HeroSection(props) {
  const { scrollTo, refForScroll } = props

  /********** ANIMATION **********/
  const [animationRef, inView] = useInView()
  const controls = useAnimation()
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  const AnimatedLine = (props) => (
    <motion.div initial="hidden" variants={lineVariant} animate={controls}>
      <Box
        sx={{
          width: "50%",
          border: "1px solid",
          borderColor: (theme) => theme.palette.secondary.main,
          position: "absolute",
        }}
        {...props}
      />
    </motion.div>
  )

  const JobWord = ({ x, ...props }) => (
    <motion.div
      initial={{ opacity: 0, x }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      <Typography
        color="#fff"
        sx={{
          textTransform: "uppercase",
          lineHeight: { xs: "8vw", md: "5vw" },
          fontSize: { xs: "8vw", md: "5vw" },
        }}
        {...props}
      />
    </motion.div>
  )

  return (
    <Stack
      className="full-width flex-center relative"
      sx={{
        height: { xs: "90vh", md: "100vh" },
        minHeight: "500px",
        background: "#000",
        zIndex: 1,
      }}
      ref={animationRef}
    >
      <Stack
        className="absolute row uppercase"
        sx={{
          top: { xs: "90px", md: "80px" },
          gap: 4,
          letterSpacing: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <Typography
            color="#FFF"
            letterSpacing={1}
            className={styles.shine}
            sx={{
              fontSize: { xs: "1.2rem", md: "2rem" },
            }}
          >
            – Quentin Hébert –
          </Typography>
        </motion.div>
      </Stack>

      <Stack
        className="absolute row uppercase"
        sx={{
          top: "130px",
          gap: 4,
          letterSpacing: 2,
        }}
      >
        {SHORT_MENU.map((item, key) => (
          <motion.div
            key={key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 + key / 5 }}
          >
            <Link href={item.href} passHref>
              <Typography component="a" className="cool-button" color="#fff">
                {item.label}
              </Typography>
            </Link>
          </motion.div>
        ))}
      </Stack>

      <Stack position="relative">
        <AnimatedLine left={0} top={-5} />
        <JobWord x={15}>Réalisateur //////</JobWord>
        <JobWord x={-15}>Développeur web</JobWord>
        <AnimatedLine right={0} bottom={-5} />
      </Stack>

      <Stack
        zIndex={10}
        justifyContent="end"
        alignItems="center"
        sx={{ display: "flex", position: "absolute", bottom: 0 }}
      >
        <BouncingArrow
          text=""
          scrollTo={scrollTo}
          refForScroll={refForScroll}
        />
      </Stack>
    </Stack>
  )

  // return (
  //   <Stack
  //     justifyContent="center"
  //     width="100%"
  //     overflow="hidden"
  //     paddingTop="6rem"
  //     zIndex={1}
  //     sx={{
  //       height: { xs: "300px", sm: "600px", md: "700px", lg: "100vh" },
  //       minHeight: { xs: "600px", lg: "calc(800px + 2rem)" },
  //       backgroundImage: "url(/medias/homepage-background.jpg)",
  //       backgroundSize: "cover",
  //       backgroundPosition: "50% 50%",
  //     }}
  //   >
  //     <Stack
  //       padding="2rem 2rem 0 2rem"
  //       height="100%"
  //       width="100%"
  //       flexDirection="column"
  //       gap={0}
  //     >
  //       <Stack
  //         sx={{
  //           color: theme.palette.secondary.main,
  //         }}
  //       >
  //         <Slide
  //           direction="right"
  //           {...{ timeout: 1000 }}
  //           in
  //           mountOnEnter
  //           unmountOnExit
  //         >
  //           <Box>
  //             <Box className={styles.sign}>
  //               <Typography
  //                 className={styles.fastflicker}
  //                 fontFamily="Ethereal"
  //                 fontWeight="bold"
  //                 sx={{
  //                   color: "#fff",
  //                   fontSize: { xs: "4.2vw", md: "2.3vw" },
  //                   lineHeight: { xs: "8vw", md: "4rem" },
  //                   letterSpacing: { xs: 1, md: 3 },
  //                   textShadow: "2px 2px 7px #000",
  //                 }}
  //               >
  //                 Creative videomaker
  //               </Typography>
  //             </Box>

  //             <Typography
  //               className="no-select"
  //               fontFamily="Ethereal"
  //               fontWeight="bold"
  //               alignSelf="flex-start"
  //               sx={{
  //                 fontSize: { xs: "12vw", md: "9vw" },
  //                 lineHeight: { xs: "10vw", md: "8vw" },
  //                 textShadow: "2px 1px 30px rgb(0,0,0,0.5)",
  //               }}
  //             >
  //               Film director
  //               <br />
  //               and editor
  //             </Typography>
  //           </Box>
  //         </Slide>
  //       </Stack>

  //       <motion.div
  //         className={styles.sign}
  //         initial={{ rotate: 0, scale: 0.5 }}
  //         animate={{ rotate: 360, scale: 1 }}
  //         transition={{ duration: 0.75 }}
  //       >
  //         <Typography
  //           className={styles.fastflicker2}
  //           fontFamily="Helmet"
  //           textAlign="center"
  //           sx={{
  //             color: "#fff",
  //             rotate: "45deg",
  //             fontSize: { xs: "15vw", md: "9vw" },
  //             lineHeight: { xs: "7rem", md: "8rem" },
  //             textShadow: "4px 5px 4px #000",
  //           }}
  //         >
  //           +
  //         </Typography>
  //       </motion.div>

  //       <Slide
  //         direction="left"
  //         {...{ timeout: 1000 }}
  //         in
  //         mountOnEnter
  //         unmountOnExit
  //       >
  //         <Box>
  //           <Typography
  //             fontFamily="Zacbel X"
  //             className="no-select"
  //             color="secondary"
  //             sx={{
  //               textAlignLast: "end",
  //               textAlign: "right",
  //               fontSize: { xs: "9vw", md: "7vw" },
  //               textShadow: "2px 1px 30px rgb(0,0,0,0.5)",
  //             }}
  //           >
  //             Web developper
  //           </Typography>

  //           <Box className={styles.sign}>
  //             <Typography
  //               className={styles.fastflicker3}
  //               color="#fff"
  //               fontFamily="Zacbel X"
  //               sx={{
  //                 textAlignLast: "end",
  //                 textAlign: "right",
  //                 fontSize: { xs: "1rem", sm: "1rem", md: "1.6vw" },
  //                 textShadow: "2px 2px 7px #000",
  //               }}
  //             >
  //               JS Backend / Frontend
  //             </Typography>
  //           </Box>
  //         </Box>
  //       </Slide>
  //     </Stack>

  //     <Stack
  //       zIndex={10}
  //       justifyContent="end"
  //       alignItems="center"
  //       sx={{ display: "flex" }}
  //     >
  //       <BouncingArrow
  //         text=""
  //         scrollTo={scrollTo}
  //         refForScroll={refForScroll}
  //       />
  //     </Stack>
  //   </Stack>
  // )
}
