import { Stack, styled } from "@mui/material"

const Card = styled((props) => {
  return (
    <Stack
      textAlign="center"
      width="100%"
      height="100%"
      borderRadius="10px"
      sx={{
        background:
          props.rightbgcolor && props.leftbgcolor && props.lineardeg
            ? `linear-gradient(${props.lineardeg}, ${props.rightbgcolor} 25%, ${props.leftbgcolor} 70%)`
            : "",
        backgroundColor:
          props.backgroundColor ||
          (!props.rightbgcolor && !props.leftbgcolor && !props.lineardeg)
            ? (theme) => theme.palette.background.main
            : "",
        color: props.color || "#fff",
        padding: { xs: "1rem", md: "2rem" },
        gap: { xs: 2, md: 4 },
      }}
      {...props}
    />
  )
})(() => ({}))

export default function CustomCard(props) {
  return <Card {...props} />
}
