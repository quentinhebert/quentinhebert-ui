import { Button } from "@mui/material"

export default function RectangleButton({
  variant,
  maxWidth,
  secondary,
  fontSize,
  ...props
}) {
  return (
    <Button
      variant={variant || "outlined"}
      size="large"
      sx={{
        maxWidth: maxWidth || "200px",
        color: (theme) => (secondary ? theme.palette.text.secondary : "#fff"),
        backgroundColor: "transparent",
        border: (theme) =>
          secondary
            ? `2px solid ${theme.palette.text.secondary}`
            : `2px solid #fff`,
        borderRadius: "10px",
        letterSpacing: "1.5px",
        fontSize: fontSize || "",
        "&:hover": {
          border: (theme) =>
            secondary
              ? `2px solid ${theme.palette.text.secondary}`
              : `2px solid #fff`,
          backgroundColor: (theme) =>
            secondary ? theme.palette.text.secondary : "#fff",
          color: (theme) => theme.palette.text.primary,
        },
      }}
      {...props}
    />
  )
}
