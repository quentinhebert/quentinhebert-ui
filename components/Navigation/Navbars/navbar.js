import { useContext, useRef } from "react"
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

const MobileNavbar = dynamic(() => import("./mobile-navbar"))
const DesktopNavbar = dynamic(() => import("./desktop-navbar"))

export default function Navbar(props) {
  const { bgColor } = props
  // Define main color of navbar
  let mainColor = bgColor || theme.palette.background.main

  // Define logo of navbar
  let logo = "/logos/logo.svg"

  const menuItems = [
    { href: "/", label: "Accueil" },
    { href: "/films", label: "Vidéaste" },
    { href: "/websites", label: "Développeur web" },
    { href: "/about", label: "À propos" },
    { href: "/contact", label: "Contact" },
  ]

  // Check if user has grant to access that page
  const { user } = useContext(UserContext)

  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const containerRef = useRef(null)

  const router = useRouter()
  const page = router.asPath

  return (
    <AppBar
      position="fixed"
      component="nav"
      sx={{
        background:
          "linear-gradient(180deg, rgb(0,0,0,0.5) 0%, transparent 100%)",
        width: "100%",
        boxShadow: "none",
      }}
    >
      <Box sx={{ flexGrow: 2, width: "100%" }}>
        <Toolbar sx={{ width: "100%" }}>
          <Stack padding="0.75rem" flexDirection="row" alignItems="center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0, duration: 2 }}
            >
              <ScaleUpOnHoverStack href="/" component="a">
                <Image src={logo} width="150rem" height="70rem" />
              </ScaleUpOnHoverStack>
            </motion.div>
          </Stack>
          <Box component="div" sx={{ flexGrow: 1 }} />

          {isMobile ? (
            <MobileNavbar mainColor={mainColor} list={menuItems} />
          ) : (
            <DesktopNavbar mainColor={mainColor} list={menuItems} page={page} />
          )}

          {!!user && user.type === USERTYPES.ADMIN && <LoginOrMenuButton />}
        </Toolbar>
      </Box>
    </AppBar>
  )
}
