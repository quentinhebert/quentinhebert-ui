import { useContext, useRef, useState } from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import LoginOrMenuButton from "../login-or-menu-button"
import { UserContext } from "../../../contexts/UserContext"
import Image from "next/image"
import { Button, Slide, Stack, Typography, useMediaQuery } from "@mui/material"
import theme from "../../../config/theme"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import ScaleUpOnHoverStack from "../../Animation/scale-up-on-hover-stack"
import { useScrollPosition } from "@n8tb1t/use-scroll-position"
import Link from "next/link"
import useSWR from "swr"
import { fetchers } from "../../../services/public-fetchers"

const MobileNavbar = dynamic(() => import("./mobile-navbar"))
const DesktopNavbar = dynamic(() => import("./desktop-navbar"))

export default function Navbar(props) {
  const { staticData } = props

  const swr = useSWR(`navbar`, async () => fetchers.navbar(), {
    fallbackData: props.staticData,
    revalidateOnMount: true,
  })
  let data = staticData
  if (!!swr.data) data = swr.data

  // Define main color of navbar
  let mainColor = theme.palette.background.main

  // Define logo of navbar
  let logoQH = "/logos/logo-qh.png"

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

  if (!data) return <></>
  return (
    <>
      <AppBar
        className="flex-center"
        position="fixed"
        component="nav"
        sx={{
          background: "transparent",
          width: "100%",
          boxShadow: "none",
          gap: 2,
          background: isReduced ? "#000" : "transparent",
          borderBottom: isReduced ? "1px solid" : "",
          borderColor: (theme) => theme.palette.secondary.main,
        }}
      >
        <Stack padding="1rem 0.75rem" alignItems="center">
          <Link href="/contact" passHref>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "30px",
                position: "absolute",
                left: { xs: 20, md: 50 },
                top: { xs: isReduced ? 17 : 25, md: isReduced ? 10 : 20 },
                color: "#fff",
                borderColor: "#fff",
                padding: { xs: "0.25rem 0.75rem", md: "0.5rem 2rem" },
                letterSpacing: 1,
              }}
            >
              Contact
            </Button>
          </Link>

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
                  sx={{
                    transition:
                      "width 0.1s ease-in-out, height 0.1s ease-in-out",
                  }}
                >
                  {data?.logo?.URL && (
                    <Image
                      src={data.logo.URL}
                      width="100%"
                      height="100%"
                      priority={true}
                    />
                  )}
                </Stack>
              </ScaleUpOnHoverStack>
            </Link>
          </motion.div>

          <Stack
            sx={{
              position: "absolute",
              right: { xs: 20, md: 50 },
              top: isReduced ? 10 : 15,
            }}
          >
            <MobileNavbar
              mainColor={mainColor}
              list={data.menu_items}
              page={page}
            />
          </Stack>
        </Stack>

        {!!user && <LoginOrMenuButton />}
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
