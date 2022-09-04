import * as React from "react"
import { Stack, Typography, useMediaQuery } from "@mui/material"
import theme from "../../config/theme"

export default function GearBand(props) {
  const { mainText, gear, reverse, portrait } = props
  const md = useMediaQuery(theme.breakpoints.down("md"))
  return (
    <Stack
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      width="100%"
      minHeight="300px"
      direction={
        reverse
          ? md
            ? "column-reverse"
            : "row"
          : md
          ? "column-reverse"
          : "row-reverse"
      }
      backgroundColor="#000"
      padding="1rem 0"
    >
      <Stack
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        width={md ? "90%" : "50%"}
        padding={md ? ".5rem" : "2rem"}
      >
        <Typography
          component="h2"
          color="#fff"
          fontFamily="Helmet"
          textTransform="uppercase"
          letterSpacing="2px"
          margin="1rem 0"
          textAlign="center"
          fontSize={{
            xs: "0.75rem",
            sm: "0.85rem",
            md: "0.85rem",
            lg: "1.1rem",
          }}
        >
          {mainText}
        </Typography>
        <Typography
          color="#fff"
          fontFamily="Helmet"
          textTransform="uppercase"
          letterSpacing="2px"
          textAlign="left"
        >
          {gear.items.map((item) => {
            return (
              <Typography
                fontSize={{
                  xs: "0.5rem",
                  sm: "0.75rem",
                  md: "0.75rem",
                  lg: "1rem",
                }}
              >
                - {item}
              </Typography>
            )
          })}
        </Typography>
      </Stack>
      <Stack
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        width={md ? "80%" : "50%"}
        height={portrait ? (md ? "400px" : "600px") : md ? "300px" : "400px"}
        padding={md ? ".5rem" : "2rem"}
        sx={{
          backgroundImage: gear.bgImg,
          backgroundPosition: "50%",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
    </Stack>
  )
}
