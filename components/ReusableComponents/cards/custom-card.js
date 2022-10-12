import { Stack, styled } from "@mui/material"

const Card = styled(({ background, border, color, padding, ...props }) => {
  return (
    <Stack
      textAlign="center"
      width="100%"
      height="100%"
      borderRadius="30px"
      sx={{
        background: background || ((theme) => theme.palette.background.main),
        border: border || "",
        color: color || "#fff",
        padding: padding || "2rem",
        gap: { xs: 2, md: 4 },
      }}
      {...props}
    />
  )
})(() => ({}))

export default function CustomCard(props) {
  return <Card {...props} />
}
