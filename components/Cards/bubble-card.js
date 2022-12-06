import { Stack, styled } from "@mui/material"
import Link from "next/link"
import BodyText from "../Text/body-text"

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
        onClick={onClick || (() => {})}
      >
        <Stack
          className="flex-center"
          borderRadius="500px"
          sx={{
            height: { xs: "75px", md: "100px" },
            width: { xs: "75px", md: "100px" },
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
              width: { xs: "2rem", md: "3rem" },
              height: { xs: "2rem", md: "3rem" },
            }}
          >
            {icon}
          </Stack>
        </Stack>
        <BodyText textAlign="center">{title}</BodyText>
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
