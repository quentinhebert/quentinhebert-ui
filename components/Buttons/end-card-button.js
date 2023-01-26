import { Box, Button, Typography } from "@mui/material"
import Link from "next/link"
import SubmitButton from "./submit-button"

const CssButton = (props) => (
  <Button
    variant="contained"
    sx={{
      fontWeight: "bold",
      color: "#000",
      borderRadius: "30px",
      padding: "0.6rem 2rem",
      background: (theme) =>
        `linear-gradient(140deg, ${theme.palette.tersary.main} 0%, ${theme.palette.background.secondary} 100%)`,
      boxShadow: (theme) => `1px 1px 100px 2px ${theme.palette.secondary.main}`,
      "&:hover": {
        boxShadow: (theme) =>
          `1px 1px 100px 2px ${theme.palette.secondary.main}`,
      },
    }}
    {...props}
  />
)

export default function EndCardButton({ href, text, onClick, icon, ...props }) {
  return (
    <Box>
      {href ? (
        <Link href={href} passHref>
          <SubmitButton>
            <Typography>{text}</Typography> {icon}
          </SubmitButton>
        </Link>
      ) : (
        <CssButton onClick={onClick}>
          <Typography>{text}</Typography>
        </CssButton>
      )}
    </Box>
  )
}
