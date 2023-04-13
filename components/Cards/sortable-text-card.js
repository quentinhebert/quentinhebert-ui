import { Box, Stack, Typography } from "@mui/material"
import { SortableElement } from "react-sortable-hoc"
import CustomCard from "./custom-card"

const SortableCard = SortableElement(({ item, title, showMenu, ...props }) => {
  return (
    <Box
      component="li"
      className="list-style-none no-select"
      display="flex"
      sx={{
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
        description={item.description}
      >
        <Typography variant="h5">{item.name.fr}</Typography>
        <Stack {...props} />
      </CustomCard>

      {!showMenu && (
        <Box
          height="100%"
          width="100%"
          sx={{
            background: "#000",
            opacity: 0.5,
            cursor: "move",
            position: "absolute",
            borderRadius: "15px",
            "&:hover": {
              opacity: 0.2,
            },
          }}
        />
      )}
    </Box>
  )
})

const SortableTextCard = ({ index, disabled, item, title, ...props }) => {
  return (
    <SortableCard
      axis="xy"
      disabled={disabled}
      showMenu={disabled}
      item={item}
      index={index}
      {...props}
    />
  )
}

export default SortableTextCard
