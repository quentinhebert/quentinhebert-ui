import { Box, Stack, Typography } from "@mui/material"
import { SortableElement } from "react-sortable-hoc"
import CustomCard from "./custom-card"

const SortableCard = SortableElement(({ item, title, ...props }) => {
  return (
    <Stack
      component="li"
      className="list-style-none no-select"
      sx={{
        cursor: "grab",
        position: "relative",
        background: "transparent",
        width: {
          xs: "100%",
          lg: "calc(50% - .5rem)",
          xl: "calc(25% - .5rem)",
        },
      }}
    >
      <CustomCard
        backgroundColor={(theme) => theme.palette.background.main}
        height="100%"
      >
        <Typography variant="h5">{item.name.fr}</Typography>
        <Stack height="100%" {...props} />
      </CustomCard>
    </Stack>
  )
})

const SortableTextCard = ({ index, disabled, item, title, ...props }) => {
  return (
    <SortableCard
      axis="xy"
      disabled={disabled}
      title={title}
      item={item}
      index={index}
      {...props}
    />
  )
}

export default SortableTextCard
