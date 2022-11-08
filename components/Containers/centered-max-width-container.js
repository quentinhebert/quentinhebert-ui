import { Stack, Typography } from "@mui/material"
import { styled } from "@mui/system"

const Container = styled((props) => {
  const { pixels, percents, flexDirection, gap } = props

  return (
    <Stack
      maxWidth={pixels || "880px"}
      margin="auto"
      zIndex={1}
      sx={{
        width: percents || { xs: "100%", sm: "80%" },
        flexDirection: flexDirection || "",
      }}
      {...props}
    />
  )
})(() => ({}))

export default function CenteredMaxWidthContainer(
  props = { pixels, percents, flexDirection, gap }
) {
  return <Container {...props} />
}
