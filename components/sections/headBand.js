import * as React from "react";
import { Box, Button } from "@mui/material";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import theme from "../../config/theme";

export default function HeadBand(props) {
  const { bgImg, mainText, buttonText, buttonUrl } = props;
  const md = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Stack
      height="50vh"
      component="div"
      sx={{
        backgroundImage: bgImg,
        backgroundSize: "cover",
        backgroundPosition: "50% 70%",
      }}
    >
      <Stack
        component="div"
        width="100%"
        height="50vh"
        backgroundColor="rgb(0,0,0,0.6)"
        position="absolute"
      />
      <Stack
        zIndex={10}
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <Typography
          color="#fff"
          textTransform="uppercase"
          fontFamily="Arial"
          lineHeight="2rem"
          letterSpacing="3px"
          fontSize={md ? "1.5rem" : "2rem"}
          padding="1rem"
        >
          {mainText}
        </Typography>
        <Button
          sx={{
            padding: ".5rem 1rem",
            margin: "1rem auto",
            backgroundColor: "#fff",
            color: "#000",
            "&:hover": { color: "#fff", backgroundColor: "rgb(0,0,0,0.6)" },
          }}
        >
          {buttonText}
        </Button>
      </Stack>
    </Stack>
  );
}
