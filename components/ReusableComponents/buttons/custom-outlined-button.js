import { Button } from "@mui/material"
import { alpha } from "@mui/material/styles"

export default function CustomOutlinedButton({
  color,
  hoverColor,
  onClick,
  ...props
}) {
  return (
    <Button
      variant="outlined"
      sx={{
        color: color || ((theme) => theme.palette.secondary.main),
        border: `1px solid`,
        borderColor: color || ((theme) => theme.palette.secondary.main),
        "&:hover": {
          color:
            hoverColor || color || ((theme) => theme.palette.secondary.main),
          borderColor:
            hoverColor || color || ((theme) => theme.palette.secondary.main),
          backgroundColor: (theme) =>
            alpha(theme.palette.background.secondary, 0.2),
        },
      }}
      onClick={onClick}
      {...props}
    />
  )
}
