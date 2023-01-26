import { Button, Stack } from "@mui/material"
import { styled } from "@mui/system"

const SubmitButton = styled((props) => (
  <Button
    sx={{
      gap: 2,
      marginTop: "2rem",
      fontFamily: "trophy",
      padding: ".75rem 4rem",
      fontSize: ".8rem",
      textTransform: "capitalize",
      color: (theme) => theme.palette.secondary.main,
      backgroundColor: "transparent",
      borderRadius: "30px",
      letterSpacing: "1.5px",
      boxShadow: (theme) => `0px 0px 20px 10px ${theme.palette.secondary.main}`,
      "&:hover": {
        boxShadow: (theme) =>
          `0px 0px 20px 5px ${theme.palette.secondary.main}`,
        "& > .MuiSvgIcon-root": {
          transition: "0.2s ease-in-out",
          translate: "40px",
        },
      },
      "& > .MuiSvgIcon-root": {
        transition: "0.2s ease-in-out",
      },
    }}
    {...props}
  />
))(() => ({}))

const ButtonContainer = styled((props) => (
  <Stack sx={{ width: "100%", alignItems: "end" }} {...props} />
))(() => ({}))

export default function RightSubmitButton(props) {
  return (
    <ButtonContainer>
      <SubmitButton {...props} />
    </ButtonContainer>
  )
}
