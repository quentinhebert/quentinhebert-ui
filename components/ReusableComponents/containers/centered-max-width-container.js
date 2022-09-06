import { Stack, Typography } from "@mui/material"
import { styled } from "@mui/system"

const Container = styled((props) => {
  const { pixels, percents, flexDirection, gap } = props

  return (
    <Stack
      width={percents || "80%"}
      maxWidth={pixels || "880px"}
      margin="auto"
      sx={{
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
