import { Button } from "@mui/material"

export default function SubmitButton({
  disabled,
  label,
  icon,
  color,
  fontSize,
  backgroundColor,
  ...props
}) {
  return (
    <Button
      sx={{
        gap: 2,
        marginTop: "2rem",
        fontFamily: "trophy",
        fontWeight: "bold",
        padding: { xs: ".75rem 3rem", md: ".75rem 4rem" },
        fontSize: fontSize || { xs: ".6rem", md: ".8rem" },
        textTransform: "capitalize",
        color: color || ((theme) => theme.palette.secondary.main),
        backgroundColor: backgroundColor || "#000",
        borderRadius: "30px",
        letterSpacing: "1.5px",
        boxShadow: (theme) =>
          `0px 0px 30px 5px ${theme.palette.secondary.main}`,
        textShadow: (theme) => `0px 0px 10px ${theme.palette.secondary.main}`,
        "& > .MuiTypography-root": {
          scale: "1",
          transition: ".3s ease",
          textShadow: (theme) => `0px 0px 10px ${theme.palette.secondary.main}`,
        },
        "&:hover": {
          backgroundColor: backgroundColor || "#000",
          boxShadow: (theme) =>
            `0px 0px 20px 5px ${theme.palette.secondary.main}`,
          "& > .MuiTypography-root": {
            scale: "1.025",
          },
          "& > .MuiSvgIcon-root": {
            transition: "0.3s ease",
            translate: { xs: "20px", md: "40px" },
          },
        },
        "& > .MuiSvgIcon-root": {
          transition: "0.3s ease",
        },
        "& > .MuiTypography-root": {
          fontFamily: "trophy",
        },
      }}
      {...props}
    />
  )
}
