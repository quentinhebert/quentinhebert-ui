import JsxParser from "react-jsx-parser"
import BodyText from "../../Text/body-text"
import { Stack, Typography, Box } from "@mui/material"
import { SoberAccordion } from "../../Containers/custom-accordion"

const Title = (props) => (
  <Typography
    color="#fff"
    component="h2"
    variant="h3"
    mt={4}
    mb={2}
    {...props}
  />
)

export function formatText(htmlString) {
  let formattedString = htmlString
    .replaceAll("<h1>", "<Title>")
    .replaceAll("h1>", "Title>")
    .replaceAll("<h2>", "<SoberAccordion title={<>")
    .replaceAll("</h2>", "</>}>")
    .replaceAll("<p>-----</p>", "</SoberAccordion>")
    .replaceAll("<h3", "<Title")
    .replaceAll("h3>", "Title>")
    .replaceAll("<br>", "<br />")
    .replaceAll("[anchor ", "<Stack className='anchor' id=")
    .replaceAll(" anchor]", "/>")
    .replaceAll(
      "<li>",
      "<Stack component='li' mb={1}><Typography color='text.white'>• "
    )
    .replaceAll("</li>", "</Typography></Stack>")
    .replaceAll(
      "<a",
      "<Box component='a' target='_blank' className='cool-button' sx={{color: theme => theme.palette.secondary.main}}"
    )
    .replaceAll("a>", "Box>")
    .replaceAll(
      "<p",
      "<Stack mb={1}><BodyText preventTransition textAlign='justify'"
    )
    .replaceAll("p>", "BodyText></Stack>")

  return formattedString
}

export function ParseJsx({ jsx }) {
  return (
    <JsxParser
      components={{
        Title,
        Typography,
        BodyText,
        Stack,
        Box,
        SoberAccordion,
      }}
      jsx={jsx}
      className="full-width"
    />
  )
}
