import { Box, Button, Tooltip } from "@mui/material"

export default function IconButton({ tooltip, ...props }) {
  return (
    <Box maxWidth="2rem">
      <Tooltip title={tooltip || ""}>
        <div>
          <Button
            variant="text"
            color="secondary"
            {...props}
            sx={{
              borderRadius: "30px",
              padding: ".5rem !important",
              minWidth: 0,
              ...props?.sx,
            }}
          />
        </div>
      </Tooltip>
    </Box>
  )
}
