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
import styles from "../../../styles/TextShine.module.css"
import translations from "../../../services/translation"
import ChangeLangSection from "../../Sections/Navbar/change-lang"
import ContactBtnSection from "../../Sections/Navbar/contact-btn-section"

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
      <Stack
        zIndex={1}
        sx={{
          width: "100%",
        }}
        margin="max(15vh, 100px) auto 1rem"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          textAlign="right"
          ref={viewRef}
          gap={0}
          width={{ xs: "auto", sm: "auto" }}
        >
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
                        fontSize: { xs: "4vw", lg: "min(6vw, 8vh)" },
                        lineHeight: { xs: "9vw", lg: "min(8vw, 10vh)" },
                        letterSpacing: { xs: 1, lg: 2 },
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
                                lg: `0px 0px 30px ${theme.palette.secondary.main}`,
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
                        sx={{ fontSize: { xs: "2rem", lg: "1rem" } }}
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
            variants={variants(6)}
            animate={controls}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <Stack
              mt={4}
              sx={{
                opacity: 0.4,
                width: "100%",
                height: "2px",
                borderRadius: "30px",
                background: "#fff",
                mb: { xs: 2, lg: 1 },
              }}
            />

            <Stack
              sx={{ flexDirection: { xs: "column-reverse", lg: "row" } }}
              gap={{ xs: 4, lg: 2 }}
            >
              <Stack
                width="100%"
                gap={{ xs: 4, lg: 4 }}
                alignItems={{ xs: "center", lg: "start" }}
              >
                <Stack
                  gap={{ xs: 2, lg: 3 }}
                  sx={{ flexDirection: { xs: "column", lg: "row" } }}
                  width="100%"
                  alignItems="center"
                >
                  <ContactBtnSection />
                  <BottomLink>
                    <Link href="/questions-and-answers" passHref>
                      {translations.footer.QandA[lang]}
                    </Link>
                  </BottomLink>
                  <BottomLink>
                    <Link href="/terms-of-use" passHref>
                      {translations.footer.termsOfUse[lang]}
                    </Link>
                  </BottomLink>
                  <BottomLink>
                    <Link href="/terms-and-conditions" passHref>
                      {translations.footer.termsAndConditions[lang]}
                    </Link>
                  </BottomLink>
                </Stack>

                <Stack
                  justifyContent="end"
                  alignItems="center"
                  display={{ xs: "flex", md: "none" }}
                >
                  <ChangeLangSection />
                </Stack>

                <BodyText
                  fontSize="0.8rem"
                  lineHeight="0.8rem"
                  className={styles.shine}
                >
                  © Quentin Hébert {new Date().getFullYear()} –{" "}
                  {translations.footer.copyright[lang]}
                </BodyText>
              </Stack>

              <SocialMedias
                items={socialMedias}
                justifyContent={{ xs: "center", lg: "end" }}
                iconSize="30px"
              />
            </Stack>
          </motion.div>
        </Stack>
      </Stack>
    </Dialog>
  )
}

function BottomLink(props) {
  return (
    <BodyText
      fontSize="0.8rem"
      lineHeight="0.8rem"
      className="pointer"
      sx={{
        whiteSpace: "nowrap",
        "&:hover": {
          color: (theme) => theme.palette.secondary.main,
        },
      }}
      {...props}
    />
  )
}
