import * as React from "react"
import { Stack } from "@mui/material"
import DualCoverBand from "../sections/dual-cover-band"
import theme from "../../config/theme"

const portfolioOptions = [
  {
    img: "/medias/portfolio-filmmaking-cover.png",
    imgLink: "/films",
    url: "/films/portfolio",
    secondaryText: "Découvrez",
    label: "Mes films",
    linkLabel: "Portfolio",
    secondaryTextColor: theme.palette.text.white,
    bgColor: theme.palette.background.main,
    fontFamily: "Ethereal",
    letterSpacing: "3px",
  },
  {
    img: "/medias/portfolio-dev-cover.png",
    imgLink: "/websites",
    url: "/websites/portfolio",
    secondaryText: "Découvrez",
    label: "Mes sites web",
    linkLabel: "Portfolio",
    secondaryTextColor: theme.palette.text.primary,
    bgColor: theme.palette.background.white,
    fontFamily: "Zacbel X",
    letterSpacing: "2px",
  },
]

export default function PortfolioOptions(props) {
  const {} = props

  return <DualCoverBand images={portfolioOptions} />
}
