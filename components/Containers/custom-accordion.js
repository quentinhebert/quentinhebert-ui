import * as React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import BodyText from "../Text/body-text"
import { Stack, Typography } from "@mui/material"

export default function CustomAccordion({
  title,
  noBorder,
  background,
  borderRadius,
  defaultExpanded,
  ...props
}) {
  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      disableGutters
      square="false"
      sx={{
        width: "100%",
        border: (theme) =>
          noBorder ? "none" : `1px solid ${theme.palette.secondary.main}`,
        borderRadius: borderRadius || "inherit",
        "&.MuiAccordion-root": {
          "&:before": {
            display: "none",
          },
          backgroundImage: "none",
          backgroundColor: background || "transparent",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon color="secondary" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          fontSize="1rem"
          color={(theme) => theme.palette.text.secondary}
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails {...props} />
    </Accordion>
  )
}

export function SoberAccordion({ title, ...props }) {
  return (
    <Accordion
      sx={{
        width: "100%",
        borderRadius: "30px",
        "&.MuiAccordion-root": {
          padding: "0 1rem",
          backgroundImage: "none",
          backgroundColor: "main",
          "&:before": { backgroundColor: "transparent" },
          "&:first-of-type": {
            borderRadius: "30px",
          },
          "&:last-of-type": {
            borderRadius: "30px",
          },
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon color="secondary" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ color: "#fff", "& .Mui-expanded": { color: "text.secondary" } }}
      >
        <Typography color="inherit">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails {...props} />
    </Accordion>
  )
}
