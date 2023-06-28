import { Button, Stack, Typography } from "@mui/material"
import PillButton from "./pill-button"

export default function BottomButtons({
  onClick,
  handleCancel,
  label,
  cancelLabel,
  disabled,
  mt,
  ...props
}) {
  return (
    <Stack gap={1} justifyContent="end" mt={mt} width="100%">
      <PillButton onClick={onClick} disabled={disabled || false} {...props}>
        {label || "Continuer"}
      </PillButton>
      <Button variant="text" sx={{ color: "#fff" }} onClick={handleCancel}>
        <Typography className="cool-button" textTransform="initial">
          {cancelLabel || "Annuler"}
        </Typography>
      </Button>
    </Stack>
  )
}
