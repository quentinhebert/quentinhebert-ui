import { useState } from "react"
import AppBar from "@mui/material/AppBar"
import LoginOrMenuButton from "../login-or-menu-button"
import { Box, Button, Stack } from "@mui/material"
import theme from "../../../config/theme"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import ScaleUpOnHoverStack from "../../Animation/scale-up-on-hover-stack"
import { useScrollPosition } from "@n8tb1t/use-scroll-position"
import useSWR from "swr"
import { fetchers } from "../../../services/public-fetchers"
import NextLink from "../../Helpers/next-link"

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

  const router = useRouter()
  const page = router.asPath

  const contactActivePage = page === "/contact"

  const [isReduced, setIsReduced] = useState(false)
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
        position="sticky"
        component="nav"
        sx={{
          background: "transparent",
          width: "100%",
          boxShadow: "none",
          top: 0,
        }}
      >
        <Box
          width="100vw"
          // height="100%"
          sx={{
            background: "#000",
            position: "absolute",
            top: -1, // trick to prevent from small gap above navbar
            left: 0,
            height: isReduced ? "100%" : 0,
            opacity: isReduced ? 1 : 0,
            transition: "0.2s ease",
          }}
        />
        <Stack padding="1rem 0.75rem" alignItems="center">
          <NextLink href="/contact">
            <Button
              variant="outlined"
              sx={{
                background: "#000",
                borderRadius: "30px",
                position: "absolute",
                left: { xs: 20, md: 50 },
                top: { xs: isReduced ? 17 : 25, md: isReduced ? 10 : 20 },
                color: contactActivePage
                  ? (theme) => theme.palette.secondary.main
                  : "#fff",
                borderColor: contactActivePage
                  ? (theme) => theme.palette.secondary.main
                  : "#fff",
                padding: { xs: "0.25rem 0.75rem", md: "0.5rem 2rem" },
                letterSpacing: 1,
                transition: ".1s ease",
                "&:hover": {
                  background: "#000",
                  borderColor: (theme) => theme.palette.secondary.main,
                },
              }}
            >
              Contact
            </Button>
          </NextLink>

          <NextLink href="/">
            <ScaleUpOnHoverStack
              sx={{ flexDirection: "row", alignItems: "center" }}
            >
              <Stack
                width={isReduced ? "45px" : "60px"}
                height={isReduced ? "35px" : "50px"}
                sx={{
                  transition: "width 0.1s ease-in-out, height 0.1s ease-in-out",
                }}
              >
                {data?.logo?.URL && (
                  <Box
                    component="img"
                    src={data.logo.URL}
                    width="100%"
                    height="100%"
                    zIndex={1000}
                  />
                )}
              </Stack>
            </ScaleUpOnHoverStack>
          </NextLink>

          <Stack
            sx={{
              position: "absolute",
              right: { xs: 20, md: 50 },
              top: isReduced ? 10 : 15,
              gap: { xs: 0, lg: 2 },
              transition: ".1s ease",
            }}
            flexDirection="row"
          >
            {/* {!!user && (
              <Stack>
                <LoginOrMenuButton />
              </Stack>
            )} */}
            <MobileNavbar
              mainColor={mainColor}
              list={data.menu_items}
              page={page}
            />
          </Stack>
        </Stack>
      </AppBar>

      {/* Trick to have a linear gradient behind the navbar but not when burger menu is open */}
      {/* <Stack
        className="full-width fixed"
        zIndex={101}
        sx={{
          height: "64px",
          background:
            "linear-gradient(0deg, transparent 0%, rgb(0,0,0,0.9) 90%)",
          opacity: 0,
        }}
      /> */}
    </>
  )
}
