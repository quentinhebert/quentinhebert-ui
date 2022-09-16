import { Grid } from "@mui/material"
import BodyText from "../text/body-text"
import CustomCard from "./custom-card"
import CustomCardTitle from "./custom-card-title"
import EndCardButton from "./end-card-button"
import styles from "../../../styles/TextShine.module.css"

export default function OneActionCardsGrid(props) {
  const { cards } = props

  return (
    <Grid container rowSpacing={4} columnSpacing={4}>
      {cards.map((cardItem, key) => (
        <Grid
          item
          xs={10}
          sm={6}
          lg={3}
          key={key}
          sx={{ margin: { xs: "0 auto", sm: "0" } }}
        >
          <CustomCard
            sx={{
              background: (theme) =>
                `linear-gradient(100deg, ${theme.palette.background.main} 0%, rgb(0,0,0,1) 80%)`,
            }}
          >
            <CustomCardTitle className={styles.shine} color="secondary">
              {cardItem.title}
            </CustomCardTitle>
            <BodyText lineHeight="1.5rem" fontSize="1rem">
              {cardItem.description}
            </BodyText>
            <EndCardButton
              text={cardItem.button.text}
              href={cardItem.button.href}
            />
          </CustomCard>
        </Grid>
      ))}
    </Grid>
  )
}
