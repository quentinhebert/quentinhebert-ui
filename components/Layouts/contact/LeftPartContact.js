import * as React from "react"
import { Box, Link, Stack, Typography, useMediaQuery } from "@mui/material"
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined"
import theme from "../../../config/theme"

export default function LeftPartContact(props) {
  /********** STYLE **********/
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down("md"))
  return (
    <Stack
      alignItems={"flex-start"}
      justifyContent="center"
      gap={2}
      width="100%"
      sx={{ margin: "0 auto" }}
    >
      <Typography
        componenent="h1"
        variant="h3"
        color={theme.palette.text.primaryContrast}
        sx={{
          textTransform: "uppercase",
          letterSpacing: "2px",
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "2rem",
        }}
      >
        Contact
      </Typography>
      <Typography
        componenent="h2"
        variant="h3"
        color={theme.palette.text.secondary}
        sx={{
          textTransform: "uppercase",
          letterSpacing: "2px",
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}
      >
        Follow me
      </Typography>
      <Stack
        flexDirection="row"
        alignItems="center"
        sx={{ marginBottom: "4rem" }}
      >
        <a
          href="https://www.facebook.com/mathias.mortelmans"
          target="_blank"
          rel="noreferrer"
        >
          <FacebookOutlinedIcon sx={{ "&:hover": { opacity: 0.5 } }} />
        </a>
        <a
          href="https://www.instagram.com/mathiasmortelmans"
          target="_blank"
          rel="noreferrer"
        >
          <Box
            component="img"
            src="/medias/social_icons/instagram_black.png"
            sx={{
              width: "21px",
              height: "21px",
              marginLeft: ".5rem",
              "&:hover": { opacity: 0.5 },
            }}
          />
        </a>
        <a
          href="https://www.youtube.com/channel/UCK56u3Ux39ohvM6Q-PcNwBg"
          target="_blank"
          rel="noreferrer"
        >
          <Box
            component="img"
            src="/medias/social_icons/youtube_black.png"
            sx={{
              width: "21px",
              height: "21px",
              marginLeft: ".5rem",
              "&:hover": { opacity: 0.5 },
            }}
          />
        </a>
      </Stack>
      <Typography
        componenent="h2"
        variant="h3"
        color={theme.palette.text.secondary}
        sx={{
          textTransform: "uppercase",
          letterSpacing: "2px",
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}
      >
        Office
      </Typography>
      <Stack sx={{ letterSpacing: "1.5px", gap: "0.4rem" }}>
        <Typography component="div" sx={{ marginBottom: "0.3rem" }}>
          Antwerpen
        </Typography>
        <Link
          href="tel:+32 477 895 993"
          sx={{ color: "#000", fontFamily: "Arial" }}
        >
          +32 477 895 993
        </Link>
        <Typography component="div"></Typography>
        <Link
          href="mailto:info@mathiasmortelmans.com"
          sx={{ color: "#000", fontFamily: "Arial" }}
        >
          info@mathiasmortelmans.com
        </Link>
      </Stack>
    </Stack>
  )
}
