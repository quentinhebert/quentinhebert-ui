import * as React from "react"
import { Stack } from "@mui/material"
import DualCoverBand from "../sections/dual-cover-band"

const portfolioOptions = [
  {
    thumbnail: "/medias/portfolio-filmmaking-cover.png",
    url: "/filmmaking/portfolio",
    label: "vidéos",
  },
  {
    thumbnail: "/medias/portfolio-dev-cover.png",
    url: "/dev/portfolio",
    label: "sites web",
  },
]

export default function PortfolioOptions(props) {
  const {} = props

  return (
    <Stack bgcolor="#dddddd">
      <DualCoverBand images={portfolioOptions} />
    </Stack>
  )
}
