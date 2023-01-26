import { Button } from "@mui/material"

export default function SubmitButton({ disabled, label, icon, ...props }) {
  return (
    <Button
      sx={{
        gap: 2,
        marginTop: "2rem",
        fontFamily: "trophy",
        padding: ".75rem 4rem",
        fontSize: { xs: ".6rem", md: ".8rem" },
        textTransform: "capitalize",
        color: (theme) => theme.palette.secondary.main,
        backgroundColor: "#000",
        borderRadius: "30px",
        letterSpacing: "1.5px",
        boxShadow: (theme) =>
          `0px 0px 20px 10px ${theme.palette.secondary.main}`,
        textShadow: (theme) => `0px 0px 10px ${theme.palette.secondary.main}`,
        "& > .MuiTypography-root": {
          scale: "1",
          transition: ".3s ease-in-out",
          textShadow: (theme) => `0px 0px 10px ${theme.palette.secondary.main}`,
        },
        "&:hover": {
          backgroundColor: "#000",
          boxShadow: (theme) =>
            `0px 0px 20px 5px ${theme.palette.secondary.main}`,
          "& > .MuiTypography-root": {
            scale: "1.05",
          },
          "& > .MuiSvgIcon-root": {
            transition: "0.2s ease-in-out",
            translate: "40px",
          },
        },
        "& > .MuiSvgIcon-root": {
          transition: "0.2s ease-in-out",
        },
        "& > .MuiTypography-root": {
          fontFamily: "trophy",
        },
      }}
      {...props}
    />
  )
}
