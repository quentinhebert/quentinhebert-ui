import { Box, Stack } from "@mui/material"
import Boop from "../Animation/boop"
import ScaleUpOnHoverStack from "../Animation/scale-up-on-hover-stack"
import CloseIcon from "@mui/icons-material/Close"

export default function TopRightCloseButton(props) {
  return (
    <Stack
      className="flex-center pointer row absolute gap-4"
      sx={{
        right: "1vw",
        top: ".5rem",
      }}
      fontFamily="Helmet"
      {...props}
    >
      <ScaleUpOnHoverStack>
        <Box sx={{ color: (theme) => theme.palette.text.secondary }}>
          Fermer
        </Box>
      </ScaleUpOnHoverStack>
      <Boop>
        <CloseIcon color="secondary" />
      </Boop>
    </Stack>
  )
}
