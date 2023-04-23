import { Box, Stack, Typography } from "@mui/material"
import { SortableElement } from "react-sortable-hoc"
import ECommerceCard from "./e-commerce-card"

const SortableECard = SortableElement(
  ({ item, img, showMenu, imgCover, ...props }) => {
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
          img={img}
          title={item.title || item.label.fr}
          description={item.description}
          imgCover={imgCover}
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
  }
)

const SortableImage = SortableElement(
  ({ item, img, showMenu, imgCover, ...props }) => {
    return (
      <Box
        component="li"
        className="list-style-none no-select"
        sx={{
          position: "relative",
          background: "transparent",
          width: {
            xs: "100%",
            sm: "calc(50% - .5rem)",
            md: "calc(33.3% - .5rem)",
          },
        }}
      >
        <Stack
          className="no-select flex-center relative"
          sx={{
            cursor: showMenu ? "pointer" : "grab",
            padding: ".5rem",
            borderRadius: "10px",
            height: { xs: "150px", md: "200px" },
            background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${
              img || "/medias/default.jpg"
            })`,
            backgroundSize: "cover",
            "&:hover": {
              background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${
                img || "/medias/default.jpg"
              })`,
              backgroundSize: "cover",
            },
          }}
        >
          <Typography
            fontSize="1rem"
            color="text.white"
            className="uppercase text-center"
          >
            {item.title}
          </Typography>
          <Box {...props} />
        </Stack>
      </Box>
    )
  }
)

const SortableCard = ({
  index,
  disabled,
  item,
  img,
  imgCover,
  imageOnly,
  ...props
}) => {
  if (imageOnly)
    return (
      <SortableImage
        axis="xy"
        disabled={disabled}
        showMenu={disabled}
        item={item}
        img={img}
        index={index}
        imgCover={imgCover}
        {...props}
      />
    )

  return (
    <SortableECard
      axis="xy"
      disabled={disabled}
      showMenu={disabled}
      item={item}
      img={img}
      index={index}
      imgCover={imgCover}
      {...props}
    />
  )
}

export default SortableCard
