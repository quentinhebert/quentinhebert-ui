import React, { useRef } from "react"
import {
  Box,
  ImageListItem,
  Slide,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material"
import theme from "../../../config/theme"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import BigTitle from "../../ReusableComponents/titles/big-title"
import PortfolioImageList from "./PortfolioImageList"

export default function FilmsPortfolioPart(props) {
  const { refForScroll } = props

  const sm = useMediaQuery((theme) => theme.breakpoints.up("sm"))
  const md = useMediaQuery((theme) => theme.breakpoints.up("md"))

  return (
    <Stack zIndex={1} position="relative">
      {/* TOP Anchor */}
      <Stack ref={refForScroll} />

      <Stack
        sx={{
          background: (theme) =>
            `linear-gradient(0deg, #000 20%, rgb(0,0,0,0.4) 100%)`,
          paddingRight: { xs: "1rem", md: "4rem" },
          paddingLeft: { xs: "1rem", md: "4rem" },
          paddingBottom: { xs: "2rem", md: "6rem" },
        }}
      >
        <Slide direction="right" {...{ timeout: 1000 }} in>
          <Stack width="100%" alignItems="start">
            <Stack
              width="100%"
              sx={{ padding: { xs: "2rem 0 0", md: "6rem 2rem 4rem 0" } }}
            >
              <BigTitle
                title="Mes réalisations"
                fontFamily="Ethereal"
                color={theme.palette.text.secondary}
                textAlign="center"
              />
            </Stack>
          </Stack>
        </Slide>

        <PortfolioImageList />
      </Stack>
    </Stack>
  )
}
