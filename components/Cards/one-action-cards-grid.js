import { Grid, Stack } from "@mui/material"
import BodyText from "../Text/body-text"
import CustomCard from "./custom-card"
import styles from "../../styles/TextShine.module.css"
import CustomCardTitle from "../Titles/custom-card-title"
import PillButton from "../Buttons/pill-button"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"

export default function OneActionCardsGrid(props) {
  const { cards } = props

  return (
    <Grid container rowSpacing={4} columnSpacing={4}>
      {cards.map((cardItem, key) => (
        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
          key={key}
          sx={{ margin: { xs: "0 auto", sm: "0" } }}
        >
          <CustomCard
            // border={(theme) => `2px solid ${theme.palette.secondary.main}`}
            backgroundColor={(theme) => theme.palette.background.main}
          >
            <CustomCardTitle color="#fff">{cardItem.icon}</CustomCardTitle>
            <CustomCardTitle color="#fff" variant="h5">
              {cardItem.title}
            </CustomCardTitle>
            {!!cardItem.description && (
              <BodyText lineHeight="1.5rem" fontSize="1rem">
                {cardItem.description}
              </BodyText>
            )}

            <Stack height="100%" justifyContent="end">
              <PillButton
                onClick={cardItem.button.onClick}
                href={cardItem.button.href}
                endIcon={<ArrowRightAltIcon />}
              >
                {cardItem.button.text}
              </PillButton>
            </Stack>
          </CustomCard>
        </Grid>
      ))}
    </Grid>
  )
}
