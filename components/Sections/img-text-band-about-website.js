import * as React from "react"
import { Stack, Typography, useMediaQuery } from "@mui/material"
import theme from "../../config/theme"

export default function ImgTextBand(props) {
  const { img, title, titleColor, text, textColor, reverse, portrait } = props
  const md = useMediaQuery(theme.breakpoints.down("md"))
  return (
    <Stack
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      width="100%"
      minHeight="300px"
      direction={
        reverse ? (md ? "column" : "row-reverse") : md ? "column" : "row"
      }
      backgroundColor={theme.palette.background.main}
      padding="1rem 0"
    >
      <Stack
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        width={md ? "90%" : "40%"}
        padding={md ? ".5rem" : "2rem"}
      >
        <Typography
          component="h2"
          color={titleColor || "#fff"}
          fontFamily="Helmet"
          textTransform="uppercase"
          letterSpacing="2px"
          margin="1rem 0"
          textAlign="center"
        >
          {title}
        </Typography>
        <Typography
          color={textColor || "#fff"}
          fontFamily="Helmet"
          letterSpacing="2px"
          textAlign="left"
          width="80%"
        >
          {text}
        </Typography>
      </Stack>
      <Stack
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        width={md ? "80%" : "40%"}
        height={portrait ? (md ? "400px" : "600px") : md ? "300px" : "400px"}
        padding={md ? ".5rem" : "2rem"}
        sx={{
          backgroundImage: `url(${img})`,
          backgroundPosition: "50%",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
    </Stack>
  )
}
