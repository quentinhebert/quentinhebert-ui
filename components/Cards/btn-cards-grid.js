import { Grid, Stack } from "@mui/material"
import CustomCard from "./custom-card"
import CustomCardTitle from "../Titles/custom-card-title"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import Link from "next/link"

export default function BtnCardsGrid(props) {
  const { cards } = props

  return (
    <Grid
      container
      rowSpacing={{ xs: 2, lg: 4 }}
      columnSpacing={{ xs: 2, lg: 4 }}
    >
      {cards.map((cardItem, key) => (
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          xl={3}
          key={key}
          sx={{ margin: { xs: "0 auto", sm: "0" } }}
        >
          <Link href={cardItem.button.href || {}}>
            <CustomCard
              backgroundColor={(theme) => theme.palette.background.main}
              padding=".5rem 1.5rem"
              justifyContent="center"
              borderRadius="100px"
              hoverProps={{ filter: "brightness(1.2)" }}
            >
              <Stack className="row">
                <Stack flexGrow={1} gap={2} className="row" textAlign="left">
                  <CustomCardTitle color="#fff">
                    {cardItem.icon}
                  </CustomCardTitle>
                  <CustomCardTitle color="#fff" variant="h6">
                    {cardItem.title}
                  </CustomCardTitle>
                </Stack>

                <Stack width="auto" height="100%" justifyContent="center">
                  <ArrowForwardIosIcon />
                </Stack>
              </Stack>
            </CustomCard>
          </Link>
        </Grid>
      ))}
    </Grid>
  )
}
