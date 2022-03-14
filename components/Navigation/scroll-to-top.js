import * as React from "react";
import { Box, Button } from "@mui/material";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import theme from "../../config/theme";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

export default function ScrollToTopBtn(props) {
  const { refForScroll } = props;
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const [showButton, setShowButton] = React.useState(false);
  useScrollPosition(({ prevPos, currPos }) => {
    if (prevPos.y > currPos.y && !showButton) {
      setShowButton(true);
    } else if (prevPos.y < currPos.y && showButton) {
      setShowButton(false);
    }
  });

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      position="fixed"
      bottom="5%"
      right="5%"
      zIndex={10}
    >
      <Button
        onClick={(e) => scrollTo(refForScroll)}
        sx={{
          visibility: showButton ? "visible" : "hidden",
          padding: ".5rem 1rem",
          margin: "1rem auto",
          backgroundColor: "#000",
          color: "#fff",
          transition: "visibility .25s",
          letterSpacing: "1px",
          "&:hover": { color: "#fff", backgroundColor: "rgb(0,0,0,0.6)" },
        }}
      >
        Revenir en haut
      </Button>
    </Stack>
  );
}
