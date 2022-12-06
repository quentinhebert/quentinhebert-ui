import { Stack, styled, Typography } from "@mui/material"
import Link from "next/link"

const Card = styled(
  ({
    title,
    icon,
    onClick,
    background,
    border,
    color,
    padding,
    gradientOrientation,
  }) => {
    return (
      <Stack
        className="flex-center pointer"
        gap={2}
        sx={{ width: { xs: "70px", md: "100px" } }}
        onClick={onClick || (() => {})}
      >
        <Stack
          className="flex-center"
          borderRadius="500px"
          sx={{
            height: { xs: "50px", sm: "75px", md: "85px" },
            width: { xs: "50px", sm: "75px", md: "85px" },
            background:
              background ||
              ((theme) =>
                `linear-gradient(to ${gradientOrientation || "left"}, ${
                  theme.palette.secondary.main
                }, ${theme.palette.tersary.main})`),
            border: border || "",
            color: color || "#fff",
            padding: padding || "2px",
            gap: { xs: 2, md: 4 },
            "&:hover": {
              opacity: 0.5,
            },
          }}
        >
          <Stack
            sx={{
              width: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
              height: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            }}
          >
            {icon}
          </Stack>
        </Stack>

        <Typography
          color="#fff"
          textAlign="center"
          sx={{
            width: "130%",
            display: "box",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Typography>
      </Stack>
    )
  }
)(() => ({}))

export default function BubbleCard({ href, ...props }) {
  if (!!href)
    return (
      <Link href={href} passHref>
        <a>
          <Card {...props} />
        </a>
      </Link>
    )

  return <Card {...props} />
}
