import { useState } from "react"
import AppBar from "@mui/material/AppBar"
import { Box, Grid, Stack } from "@mui/material"
import theme from "../../../config/theme"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import ScaleUpOnHoverStack from "../../Animation/scale-up-on-hover-stack"
import { useScrollPosition } from "@n8tb1t/use-scroll-position"
import useSWR from "swr"
import { fetchers } from "../../../services/public-fetchers"
import NextLink from "../../Helpers/next-link"
import ChangeLangSection from "../../Sections/Navbar/change-lang"
import ContactBtnSection from "../../Sections/Navbar/contact-btn-section"

const MobileNavbar = dynamic(() => import("./mobile-navbar"))

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
    <AppBar
      position="sticky"
      component="nav"
      sx={{
        background: "transparent",
        width: "100%",
        boxShadow: "none",
        top: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: {
          xs: ".25rem 2rem",
          md: isReduced ? ".3rem 2rem" : ".75rem 2rem",
        },
        transition: ".1s ease",
      }}
    >
      <Box
        width="100%"
        sx={{
          background: "#000",
          position: "absolute",
          top: -1, // trick to prevent from small gap above navbar
          left: "50%",
          translate: "-50%",
          height: isReduced ? "100%" : 0,
          opacity: isReduced ? 1 : 0,
          transition: "0.2s ease",
        }}
      />

      <Grid container width="100%" alignItems="center">
        <Grid item xs={4}>
          <Stack display={{ xs: "none", md: "flex" }}>
            <ContactBtnSection />
          </Stack>
        </Grid>

        <Grid item xs={4}>
          <NextLink href="/">
            <ScaleUpOnHoverStack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Stack
                width={{ xs: "45px", md: isReduced ? "45px" : "60px" }}
                height={{ xs: "35px", md: isReduced ? "35px" : "50px" }}
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
        </Grid>

        <Grid item xs={4}>
          <Stack
            sx={{
              gap: 4,
              transition: ".1s ease",
              justifyContent: "end",
            }}
            flexDirection="row"
          >
            <Stack justifyContent="center" display={{ xs: "none", md: "flex" }}>
              <ChangeLangSection preventTransition />
            </Stack>

            <MobileNavbar
              mainColor={mainColor}
              list={data.menu_items}
              page={page}
              socialMedias={data.social_medias}
            />
          </Stack>
        </Grid>
      </Grid>
    </AppBar>
  )
}
