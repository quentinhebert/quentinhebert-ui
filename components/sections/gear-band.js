import * as React from "react";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import theme from "../../config/theme";

export default function GearBand(props) {
  const { mainText, gear, reverse, portrait } = props;
  const md = useMediaQuery(theme.breakpoints.down("md"));
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
          fontFamily="Arial"
          textTransform="uppercase"
          letterSpacing="3px"
          margin="1rem 0"
        >
          {mainText}
        </Typography>
        <Typography
          color="#fff"
          fontFamily="Arial"
          textTransform="uppercase"
          letterSpacing="3px"
          textAlign="left"
        >
          {gear.items.map((item) => {
            return <Typography>- {item}</Typography>;
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
  );
}
