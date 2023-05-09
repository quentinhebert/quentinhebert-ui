import Slide from "@mui/material/Slide"
import { Box, Dialog, Stack, Typography } from "@mui/material"
import { forwardRef, useContext, useEffect } from "react"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import NextLink from "../../Helpers/next-link"
import { AppContext } from "../../../contexts/AppContext"
import BodyText from "../../Text/body-text"
import { SocialMedias } from "../Footers/Footer"
import Link from "next/link"
import RedoIcon from "@mui/icons-material/Redo"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />
})

export default function Menu({
  open,
  handleClose,
  list,
  page,
  socialMedias,
  ...props
}) {
  const { lang } = useContext(AppContext)

  const handleCloseReset = () => {
    handleClose()
  }

  /********** ANIMATION **********/
  const [viewRef, inView] = useInView()
  const controls = useAnimation()
  const variants = (key) => {
    return {
      visible: {
        opacity: 1,
        transition: { duration: 1, delay: key / 10 },
      },
      hidden: { opacity: 0 },
    }
  }
  const annotationVariant = {
    visible: {
      transition: { duration: 1, delay: 1 },
      x: 0,
      y: 0,
      opacity: 1,
    },
    hidden: { x: "10px", y: "20px", opacity: 0 },
  }

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  return (
    <Dialog
      open={open}
      onClose={handleCloseReset}
      onClick={handleCloseReset}
      fullScreen
      TransitionComponent={Transition}
      keepMounted
      sx={{
        zIndex: 1000,
        ".MuiPaper-root": {
          background: (theme) => theme.palette.background.black,
        },
      }}
    >
      <Stack width="80%">
        <motion.div
          initial="hidden"
          variants={annotationVariant}
          animate={controls}
        >
          <Stack
            sx={{
              position: "absolute",
              top: 80,
              left: { xs: "50px", md: "100px" },
              flexDirection: "row",
              alignItems: "end",
              gap: 1,
            }}
          >
            <RedoIcon
              sx={{
                rotate: "-130deg",
                color: (theme) => theme.palette.secondary.main,
                fontSize: { xs: "1.5rem", md: "3rem" },
              }}
            />
            <Typography
              color="secondary"
              sx={{
                rotate: { xs: "-2deg", md: "-4deg" },
                fontSize: { xs: "0.8rem", md: "1rem" },
                pb: { xs: 0, md: 1.5 },
              }}
            >
              Allons boire un café ensemble !
            </Typography>
          </Stack>
        </motion.div>
      </Stack>

      <Stack
        zIndex={1}
        sx={{
          width: "100%",
        }}
        margin="max(15vh, 80px) auto 2rem"
        justifyContent="center"
        alignItems="center"
      >
        <Stack textAlign="right" ref={viewRef} gap={2}>
          {list?.length > 0 &&
            list.map((item, key) => {
              return (
                <motion.div
                  initial="hidden"
                  variants={variants(key)}
                  animate={controls}
                  key={key}
                >
                  <NextLink href={item.href}>
                    <Typography
                      fontFamily="trophy"
                      className="no-select"
                      key={key}
                      padding=".5rem 0"
                      fontWeight="bold"
                      sx={{
                        fontSize: { xs: "4vw", md: "min(6vw, 8vh)" },
                        lineHeight: { xs: "9vw", md: "min(8vw, 10vh)" },
                        letterSpacing: { xs: 1, md: 2 },
                        textTransform: "uppercase",
                        cursor: "pointer",
                        color:
                          page === item.href
                            ? (theme) => theme.palette.text.secondary
                            : (theme) => theme.palette.text.white,
                        transition: "transform 0.4s ease-in-out",
                        textShadow: (theme) =>
                          page === item.href
                            ? {
                                xs: `0px 0px 10px #C6900E8C`,
                                md: `0px 0px 30px ${theme.palette.secondary.main}`,
                              }
                            : "",
                        "&:hover": {
                          transform: "translateX(1rem)",
                        },
                      }}
                    >
                      <Box
                        component="span"
                        className="cool-button"
                        marginLeft={2}
                        sx={{
                          "::after": {
                            marginTop: "0.5rem",
                          },
                        }}
                      >
                        {item.label[lang]}
                      </Box>
                      <Box
                        component="span"
                        sx={{ fontSize: { xs: "3rem", md: "1rem" } }}
                        marginLeft="2rem"
                      >
                        0{key + 1}
                      </Box>
                    </Typography>
                  </NextLink>
                </motion.div>
              )
            })}

          <motion.div
            initial="hidden"
            variants={variants(10)}
            animate={controls}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            <Stack
              mt={4}
              sx={{
                opacity: 0.4,
                width: "100%",
                height: "2px",
                borderRadius: "30px",
                background: "#fff",
              }}
            />

            <Stack sx={{ flexDirection: "row" }}>
              <Stack width="100%" gap={{ xs: 2, lg: 0 }}>
                <Stack
                  gap={{ xs: 0, lg: 3 }}
                  sx={{ flexDirection: { xs: "column", lg: "row" } }}
                  width="100%"
                >
                  <BottomLinks>
                    <Link href="/contact" passHref>
                      Me contacter
                    </Link>
                  </BottomLinks>
                  <BottomLinks>
                    <Link href="/terms-of-use" passHref>
                      CGU
                    </Link>
                  </BottomLinks>
                  <BottomLinks>
                    <Link href="/terms-and-conditions" passHref>
                      Mentions légales et CGV
                    </Link>
                  </BottomLinks>
                </Stack>
                <BodyText fontSize="0.8rem">© Tous droits réservés</BodyText>
              </Stack>

              <SocialMedias
                items={socialMedias}
                justifyContent="end"
                iconSize="30px"
              />
            </Stack>
          </motion.div>
        </Stack>
      </Stack>
    </Dialog>
  )
}

function BottomLinks(props) {
  return (
    <BodyText
      fontSize="0.8rem"
      className="pointer"
      sx={{
        "&:hover": {
          color: (theme) => theme.palette.secondary.main,
        },
      }}
      {...props}
    />
  )
}
