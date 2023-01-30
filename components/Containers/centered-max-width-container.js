import { Stack, Typography } from "@mui/material"
import { styled } from "@mui/system"

const Container = styled((props) => {
  const { pixels, percents, flexDirection, gap, margin } = props

  return (
    <Stack
      maxWidth={pixels || "880px"}
      margin={margin || "auto"}
      zIndex={1}
      width={percents || { xs: "100%", sm: "80%" }}
      sx={{
        flexDirection: flexDirection || "",
      }}
      {...props}
    />
  )
})(() => ({}))

export default function CenteredMaxWidthContainer(
  props = { pixels, percents, flexDirection, gap, margin }
) {
  return <Container {...props} />
}
