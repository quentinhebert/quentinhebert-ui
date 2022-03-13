import * as React from "react";
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";

export default function BicolorTitleBand(props) {
  const { mainText, mainColor, secondaryText, secondaryColor, bgColor } = props;
  return (
    <Stack
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      width="100%"
      minHeight="200px"
      direction="column"
      backgroundColor={bgColor}
      padding="1rem 0"
    >
      <Box
        component="div"
        width="100%"
        color={secondaryColor}
        textTransform="uppercase"
        letterSpacing="3px"
        textAlign="center"
      >
        {secondaryText}
      </Box>
      <Typography
        component="H2"
        textTransform="uppercase"
        letterSpacing="5px"
        fontSize="2rem"
        textAlign="center"
        color={mainColor}
      >
        {mainText}
      </Typography>
    </Stack>
  );
}
