import { Typography } from "@mui/material";

export const ModalTitle = ({ text }) => (
  <Typography
    component="h3"
    variant="h5"
    sx={{
      padding: "1rem 1.5rem",
      letterSpacing: 1,
      color: (theme) => theme.palette.text.light,
    }}
  >
    {text}
  </Typography>
);
