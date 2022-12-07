import { Grid, Stack } from "@mui/material"
import BubbleCard from "./bubble-card"

export default function OneActionBubblesGrid({ cards, layout, tab, ...props }) {
  if (!!layout && layout === "grid")
    return (
      <Grid container rowSpacing={4} columnSpacing={4}>
        {cards.map((card, key) => {
          const active = tab === key
          return (
            <Grid item xs={4} sm={3} md={2} lg={1.5} key={key}>
              <BubbleCard
                icon={card.icon}
                title={card.title}
                href={card.href}
                onClick={card.onClick}
                notifications={card.notification}
                active={active}
              />
            </Grid>
          )
        })}
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
      {cards.map((card, key) => {
        const active = tab === key
        return (
          <BubbleCard
            key={key}
            icon={card.icon}
            title={card.title}
            href={card.href}
            onClick={card.onClick}
            notifications={card.notifications}
            border={
              active ? { xs: `2px solid #fff`, md: `4px solid #fff` } : ""
            }
          />
        )
      })}
    </Stack>
  )
}
