import * as React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import BodyText from "../text/body-text"

export default function CustomAccordion({ title, ...props }) {
  return (
    <Accordion
      sx={{
        width: "100%",
        border: (theme) => `1px solid ${theme.palette.secondary.main}`,
        "&.MuiAccordion-root": {
          backgroundImage: "none",
          backgroundColor: "transparent",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon color="secondary" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <BodyText
          fontSize="1rem"
          color={(theme) => theme.palette.text.secondary}
        >
          {title}
        </BodyText>
      </AccordionSummary>
      <AccordionDetails {...props} />
    </Accordion>
  )
}
