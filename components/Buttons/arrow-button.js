import { Stack } from "@mui/material"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"

export default function ArrowButton({
  left,
  right,
  index,
  totalItems,
  ...props
}) {
  const hasPrevious = !!left && index !== 0
  const hasNext = !!right && index < totalItems - 1

  return (
    <Stack
      sx={{
        display: { xs: "flex", md: "flex" },
        background: "rgb(0,0,0,0.8)",
        boxShadow: (theme) =>
          `0px 0px 30px 1px ${theme.palette.secondary.main}`,
        width: "50px",
        height: "50px",
        borderRadius: "100%",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        color: "#000",
        cursor: "pointer",
        rotate: !!left ? "180deg" : "",
        opacity: hasPrevious || hasNext ? 1 : 0,
        pointerEvents: hasPrevious || hasNext ? "auto" : "none",
        transition: ".5s ease-in-out, box-shadow .2s",
        "& .MuiSvgIcon-root": {
          transition: ".2s ease-in-out",
        },
        "&:hover": {
          boxShadow: (theme) =>
            `0px 0px 15px 1px ${theme.palette.secondary.main}`,
          "& .MuiSvgIcon-root": {
            translate: "5px",
          },
        },
      }}
      {...props}
    >
      <ArrowRightAltIcon color="secondary" />
    </Stack>
  )
}
