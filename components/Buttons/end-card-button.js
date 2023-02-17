import { Box, Button, Stack, Typography } from "@mui/material"
import NextLink from "../Helpers/next-link"
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
    <Stack sx={{ height: "100%", justifyContent: "end" }}>
      <Box>
        {href ? (
          <NextLink href={href}>
            <SubmitButton>
              <Typography
                sx={{
                  fontSize: { xs: ".6rem", md: ".8rem" },
                }}
              >
                {text}
              </Typography>{" "}
              {icon}
            </SubmitButton>
          </NextLink>
        ) : (
          <SubmitButton onClick={onClick}>
            <Typography sx={{ fontSize: { xs: ".6rem", md: ".8rem" } }}>
              {text}
            </Typography>
          </SubmitButton>
        )}
      </Box>
    </Stack>
  )
}
