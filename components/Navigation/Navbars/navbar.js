import { useContext, useRef, useState } from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import LoginOrMenuButton from "../login-or-menu-button"
import { USERTYPES } from "../../../enums/userTypes"
import { UserContext } from "../../../contexts/UserContext"
import Image from "next/image"
import { Slide, Stack, Typography, useMediaQuery } from "@mui/material"
import theme from "../../../config/theme"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import ScaleUpOnHoverStack from "../../ReusableComponents/animations/scale-up-on-hover-stack"
import { useScrollPosition } from "@n8tb1t/use-scroll-position"
import Link from "next/link"
import useSWR from "swr"
import apiCall from "../../../services/apiCalls/apiCall"

const MobileNavbar = dynamic(() => import("./mobile-navbar"))
const DesktopNavbar = dynamic(() => import("./desktop-navbar"))

async function fetchUpToDateNavbar() {
  const res = await apiCall.unauthenticated.getNavbar()
  const jsonRes = await res.json()
  return jsonRes
}

export default function Navbar(props) {
  const { bgColor } = props
  // Define main color of navbar
  let mainColor = bgColor || theme.palette.background.main

  // Define logo of navbar
  let logoQH = "/logos/logo-qh.png"

  const { data, error, mutate } = useSWR(
    `/navbar`,
    async () => fetchUpToDateNavbar(),
    {
      fallbackData: props,
      revalidateOnMount: true,
    }
  )

  if (!data) return null

  // Check if user has grant to access that page
  const { user } = useContext(UserContext)

  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const router = useRouter()
  const page = router.asPath

  const [isReduced, setIsReduced] = useState(false)
  const ContainerRef = useRef(null)
  useScrollPosition(({ prevPos, currPos }) => {
    if (window.pageYOffset > 0) {
      setIsReduced(true)
    } else if (window.pageYOffset === 0) {
      setIsReduced(false)
    }
  })

  return (
    <>
      <AppBar
        position="fixed"
        component="nav"
        sx={{
          background: "transparent",
          width: "100%",
          boxShadow: "none",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            width: "100%",
            height: "calc(65px + 2px)",
            transition: "opacity 0.25s ease-in-out",
            opacity: isReduced ? 1 : 0,
            top: "-2px",
            background: "transparent",
          }}
        />
        <Box sx={{ flexGrow: 2, width: "100%" }}>
          <Toolbar sx={{ width: "100%" }}>
            <Stack
              padding="1rem 0.75rem"
              flexDirection="row"
              alignItems="center"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
              >
                <Link href="/" passHref>
                  <ScaleUpOnHoverStack
                    component="a"
                    sx={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <Stack
                      width={isReduced ? "45px" : "65px"}
                      height={isReduced ? "35px" : "50px"}
                    >
                      <Image src={logoQH} width="100%" height="100%" />
                    </Stack>
                    <Stack ref={ContainerRef} overflow="hidden">
                      <Slide
                        direction="right"
                        {...{ timeout: 300 }}
                        in={!isReduced}
                        container={ContainerRef.current}
                      >
                        <Typography
                          sx={{
                            color: "#fff",
                            textTransform: "uppercase",
                            letterSpacing: "1.5px",
                            fontStyle: "italic",
                            lineHeight: "1.2rem",
                            fontSize: "1rem",
                            fontFamily: "Helmet",
                            fontWeight: "bold",
                          }}
                        >
                          Quentin Hébert
                        </Typography>
                      </Slide>
                    </Stack>
                  </ScaleUpOnHoverStack>
                </Link>
              </motion.div>
            </Stack>
            <Box component="div" sx={{ flexGrow: 1 }} />

            {isMobile ? (
              <MobileNavbar
                mainColor={mainColor}
                list={data.menu_items}
                page={page}
              />
            ) : (
              <DesktopNavbar
                mainColor={mainColor}
                list={data.menu_items}
                page={page}
                isReduced={isReduced}
              />
            )}

            {!!user && <LoginOrMenuButton />}
          </Toolbar>
        </Box>
      </AppBar>

      {/* Trick to have a linear gradient behind the navbar but not when burger menu is open */}
      <Stack
        className="full-width fixed"
        zIndex={101}
        sx={{
          height: "64px",
          background:
            "linear-gradient(0deg, transparent 0%, rgb(0,0,0,0.9) 90%)",
          opacity: 0,
        }}
      />
    </>
  )
}

export async function getStaticProps({ params }) {
  const {} = params
  const data = await fetchUpToDateNavbar()
  let notFound = false

  if (data.statusCode === 400 || data.statusCode === 404) notFound = true

  return { props: data, notFound, revalidate: 60 }
}
