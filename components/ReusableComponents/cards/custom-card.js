import { Stack, styled } from "@mui/material"

const Card = styled((props) => {
  return (
    <Stack
      textAlign="center"
      width="100%"
      borderRadius="10px"
      padding="2rem"
      gap={4}
      sx={{
        background:
          props.rightbgcolor && props.leftbgcolor && props.lineardeg
            ? `linear-gradient(${props.lineardeg}, ${props.rightbgcolor}, ${props.leftbgcolor})`
            : "",
        backgroundColor:
          props.backgroundColor || ((theme) => theme.palette.background.main),
        color: props.color || "#fff",
      }}
      {...props}
    />
  )
})(() => ({}))

export default function CustomCard(props) {
  return <Card {...props} />
}
