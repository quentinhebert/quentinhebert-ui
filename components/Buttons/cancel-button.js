import { Stack } from "@mui/material"
import BodyText from "../Text/body-text"
import PillButton from "./pill-button"

export default function CancelButton({ handleCancel, label, variant }) {
  if (variant === "text")
    return (
      <Stack justifyContent="center" margin="0 auto" className="pointer">
        <BodyText className="cool-button" color={"#fff"} onClick={handleCancel}>
          {label || "Annuler"}
        </BodyText>
      </Stack>
    )
  return (
    <PillButton
      color={"#fff"}
      border={"1px solid #fff"}
      background="transparent"
      onClick={handleCancel}
    >
      {label || "Annuler"}
    </PillButton>
  )
}
