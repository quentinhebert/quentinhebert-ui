import { Stack, styled } from "@mui/material"

const Card = styled(
  ({
    backgroundColor,
    background,
    border,
    color,
    padding,
    gradientOrientation,
    gap,
    ...props
  }) => {
    return (
      <Stack
        textAlign="center"
        width="100%"
        height="100%"
        borderRadius="30px"
        sx={{
          // background: (theme) => theme.palette.secondary.main,
          // background: "transparent",
          // background ||
          // ((theme) =>
          //   `linear-gradient(to ${gradientOrientation || "left"}, ${
          //     theme.palette.secondary.main
          //   }, ${theme.palette.tersary.main})`),
          boxShadow: (theme) => `0px 0px 20px 2px rgb(0,0,0,0.5)`,
          // border: border || "",
          color: color || "#fff",
          // padding: padding || "2px",
          gap: { xs: 2, md: 4 },
          marginBottom: "2rem",
        }}
      >
        <Stack
          textAlign="center"
          height="100%"
          borderRadius="30px"
          sx={{
            background: backgroundColor || "#000",
            padding: "2rem",
            gap: gap || { xs: 2, md: 4 },
          }}
          {...props}
        />
      </Stack>
    )
  }
)(() => ({}))

export default function CustomCard(props) {
  return <Card {...props} />
}
