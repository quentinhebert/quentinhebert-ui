import { Button } from "@mui/material"
import { styled } from "@mui/system"

const SubmitButton = styled((props) => (
  <Button
    variant="outlined"
    size="large"
    sx={{
      maxWidth: props.maxWidth || "200px",
      color: (theme) =>
        props.secondary ? theme.palette.text.secondary : "#fff",
      backgroundColor: "transparent",
      border: (theme) =>
        props.secondary
          ? `2px solid ${theme.palette.text.secondary}`
          : `2px solid #fff`,
      borderRadius: "10px",
      letterSpacing: "1.5px",
      fontSize: props.fontSize || "",
      "&:hover": {
        border: (theme) =>
          props.secondary
            ? `2px solid ${theme.palette.text.secondary}`
            : `2px solid #fff`,
        backgroundColor: (theme) =>
          props.secondary ? theme.palette.text.secondary : "#fff",
        color: (theme) => theme.palette.text.primary,
      },
    }}
    {...props}
  />
))(() => ({}))

export default function CustomSubmitButton(props) {
  return <SubmitButton {...props} />
}
