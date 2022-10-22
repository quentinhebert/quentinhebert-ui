import { Card, Text, Group } from "@mantine/core"
import { Box, Stack } from "@mui/material"
import PillButton from "../buttons/pill-button"
import theme from "../../../config/theme"

export default function ECommerceCard({
  img,
  title,
  description,
  onClick,
  btnText,
  ...props
}) {
  return (
    <Card
      shadow="sm"
      p="lg"
      radius="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        background: theme.palette.background.main,
      }}
    >
      <Card.Section sx={{ background: "grey" }}>
        <Box height={200} padding={4}>
          <Box
            component="img"
            src={img || "medias/default.jpg"}
            alt="image"
            sx={{ height: "100%", width: "100%", objectFit: "contain" }}
          />
        </Box>
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500} color={theme.palette.text.white}>
          {title || ""}
        </Text>
      </Group>

      <Text size="sm" color="dimmed">
        {description || ""}
      </Text>

      <Stack
        flexGrow={1}
        justifyContent="end"
        className="full-width"
        marginTop="1rem"
      >
        <Stack {...props} />
        {btnText && (
          <PillButton onClick={onClick || (() => {})} fullWidth>
            {btnText}
          </PillButton>
        )}
      </Stack>
    </Card>
  )
}
