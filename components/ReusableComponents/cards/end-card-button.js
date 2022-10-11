import { Box, Button, Stack } from "@mui/material"
import Link from "next/link"
import ScaleUpOnHoverStack from "../animations/scale-up-on-hover-stack"

const CssButton = (props) => (
  <Button
    variant="contained"
    // color="secondary"
    sx={{
      borderRadius: "30px",
      padding: "0.6rem 2rem",
      background: (theme) =>
        `linear-gradient(140deg, ${theme.palette.tersary.main} 0%, ${theme.palette.background.secondary} 100%)`,
    }}
    {...props}
  />
)

export default function EndCardButton(props) {
  const { href, text, onClick } = props

  return (
    <ScaleUpOnHoverStack>
      <Box height="100%" justifyContent="end">
        {href ? (
          <Link href={href} passHref>
            <CssButton>{text}</CssButton>
          </Link>
        ) : (
          <CssButton onClick={onClick}>{text}</CssButton>
        )}
      </Box>
    </ScaleUpOnHoverStack>
  )
}
