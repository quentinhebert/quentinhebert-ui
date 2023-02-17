import { Stack, styled, Typography } from "@mui/material"
import InlineBadge from "../Helpers/inline-badge"
import NextLink from "../Helpers/next-link"

const Card = styled(
  ({
    title,
    onClick,
    icon,
    background,
    border,
    color,
    padding,
    notifications,
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
            transition: "opacity 0.2s ease-in-out",
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

        <Stack width="120%" className="flex-center row">
          <Typography
            color="#fff"
            textAlign="center"
            sx={{
              display: "box",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </Typography>
          <InlineBadge number={notifications} />
        </Stack>
      </Stack>
    )
  }
)(() => ({}))

export default function BubbleCard({ href, ...props }) {
  if (!!href)
    return (
      <NextLink href={href}>
        <a>
          <Card {...props} />
        </a>
      </NextLink>
    )

  return <Card {...props} />
}
