import { Stack, Typography } from "@mui/material"
import { styled } from "@mui/system"

const Container = styled((props) => {
  const { maxWidthPx, widthPercent, flexDirection, gap } = props

  return (
    <Stack
      width={widthPercent || "80%"}
      maxWidth={maxWidthPx || "880px"}
      margin="auto"
      sx={{
        flexDirection: flexDirection || "",
      }}
      {...props}
    />
  )
})(() => ({}))

export default function CenteredMaxWidthContainer(
  props = { maxWidthPx, widthPercent, flexDirection, gap }
) {
  return <Container {...props} />
}
