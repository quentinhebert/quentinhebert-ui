import { Grid, Stack } from "@mui/material"
import BubbleCard from "./bubble-card"

export default function OneActionBubblesGrid({
  cards,
  layout,
  activeTab,
  ...props
}) {
  if (!!layout && layout === "grid")
    return (
      <Grid container spacing={4}>
        {cards.map((card, key) => {
          const active = card.id === activeTab
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
    <Stack sx={{ overflow: "hidden" }}>
      <Stack
        flexDirection="row"
        width="100%"
        overflow="auto"
        gap={4}
        paddingBottom={7}
        marginBottom={-7}
      >
        {cards.map((card, key) => {
          const active = card.id === activeTab
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
    </Stack>
  )
}
