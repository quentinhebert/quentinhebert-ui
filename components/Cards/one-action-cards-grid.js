import { Grid } from "@mui/material"
import BodyText from "../Text/body-text"
import CustomCard from "./custom-card"
import styles from "../../styles/TextShine.module.css"
import CustomCardTitle from "../Titles/custom-card-title"
import EndCardButton from "../Buttons/end-card-button"

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
          <CustomCard>
            <CustomCardTitle className={styles.shine} color="#fff">
              {cardItem.icon}
            </CustomCardTitle>
            <CustomCardTitle className={styles.shine} color="#fff">
              {cardItem.title}
            </CustomCardTitle>
            <BodyText lineHeight="1.5rem" fontSize="1rem">
              {cardItem.description}
            </BodyText>
            <EndCardButton
              text={cardItem.button.text}
              href={cardItem.button.href}
              onClick={cardItem.button.onClick}
            />
          </CustomCard>
        </Grid>
      ))}
    </Grid>
  )
}
