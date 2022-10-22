import { Box, Stack } from "@mui/material"
import { SortableElement } from "react-sortable-hoc"
import ECommerceCard from "./e-commerce-card"

const SortableECard = SortableElement(({ item, showMenu, ...props }) => {
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
          sm: "calc(50% - .5rem)",
          md: "calc(33.3% - .5rem)",
          lg: "calc(25% - .5rem)",
          xl: "calc(20% - .5rem)",
        },
      }}
    >
      <ECommerceCard
        img={item.image}
        title={item.title || item.label}
        description={item.description}
        imgCover
      >
        <Stack {...props} />
      </ECommerceCard>

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

const SortableCard = ({ index, disabled, item, ...props }) => (
  <SortableECard
    axis="xy"
    disabled={disabled}
    showMenu={disabled}
    item={item}
    index={index}
    {...props}
  />
)

export default SortableCard
