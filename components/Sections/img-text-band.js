import * as React from "react"
import { Button, Stack, Typography, useMediaQuery } from "@mui/material"
import theme from "../../config/theme"

export default function ImgTextBand(props) {
  const {
    img,
    title,
    titleColor,
    text,
    textColor,
    reverse,
    portrait,
    bgColor,
    scrollTo,
    refForScroll,
  } = props
  const md = useMediaQuery(theme.breakpoints.down("lg"))

  return (
    <Stack
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      width="100%"
      minHeight="300px"
      direction={
        reverse ? (md ? "column" : "row") : md ? "column-reverse" : "row"
      }
      backgroundColor={bgColor || "#000"}
    >
      <Stack
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        width={md ? "90%" : "70%"}
        padding={md ? ".5rem" : "2rem"}
      >
        <Typography
          component="h2"
          variant="h5"
          color={titleColor || "#fff"}
          fontFamily="Helmet"
          textTransform="uppercase"
          letterSpacing="2px"
          margin="1rem 0"
          textAlign="center"
          fontStyle="italic"
        >
          {title}
        </Typography>
        <Typography
          color={textColor || "#fff"}
          fontFamily="Helmet"
          letterSpacing="2px"
          textAlign="center"
          width="80%"
          sx={{ whiteSpace: "pre-line" }}
        >
          {text}
        </Typography>
      </Stack>
      <Stack
        width={md ? "100%" : "50%"}
        height="600px"
        sx={{
          backgroundImage: `url(${img})`,
          backgroundPosition: "0%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          "&:hover": {
            backgroundSize: md ? "cover" : "215%",
          },
        }}
      >
        <Stack
          width="100%"
          height="100%"
          justifyContent="center"
          alignContent="center"
          alignItems="center"
          backgroundColor="rgb(0, 0, 0, 0.2)"
          sx={{
            opacity: 0,
            transition: "opacity 0.25s ease-in-out",
            "&:hover": { opacity: 1 },
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={(e) => scrollTo(refForScroll)}
          >
            See my introduction video
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}
