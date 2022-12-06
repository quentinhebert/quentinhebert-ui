import { Grid, Stack } from "@mui/material"
import BubbleCard from "./bubble-card"

export default function OneActionBubblesGrid(props) {
  const { cards, layout } = props

  if (!!layout && layout === "grid")
    return (
      <Grid container rowSpacing={4} columnSpacing={4}>
        {cards.map((cardItem, key) => (
          <Grid item xs={4} sm={3} md={2} lg={1.5} key={key}>
            <BubbleCard
              icon={cardItem.icon}
              title={cardItem.title}
              href={cardItem.button.href}
              onClick={cardItem.button.onClick}
            />
          </Grid>
        ))}
      </Grid>
    )

  return (
    <Stack
      flexDirection="row"
      width="100%"
      overflow="auto"
      gap={4}
      paddingBottom={2}
    >
      {cards.map((cardItem, key) => (
        <BubbleCard
          icon={cardItem.icon}
          title={cardItem.title}
          href={cardItem.button.href}
          onClick={cardItem.button.onClick}
        />
      ))}
    </Stack>
  )
}
