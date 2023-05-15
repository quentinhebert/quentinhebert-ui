import JsxParser from "react-jsx-parser"
import BodyText from "../../Text/body-text"
import { Stack, Typography, Box } from "@mui/material"

const Title = (props) => (
  <Typography color="#fff" component="h2" variant="h3" {...props} />
)

export function formatText(htmlString) {
  let formattedString = htmlString
    .replaceAll(
      "<p",
      "<Stack margin='.5rem 0'><BodyText preventTransition textAlign='justify'"
    )
    .replaceAll("p>", "BodyText></Stack>")
    .replaceAll("<h1>", "<Title>")
    .replaceAll("<h2>", "<Typography variant='h5' color='secondary' mt={4}>• ")
    .replaceAll("<h3", "<Title")
    .replaceAll("h1>", "Title>")
    .replaceAll("h2>", "Typography>")
    .replaceAll("h3>", "Title>")
    .replaceAll("<br>", "<br />")
    .replaceAll("[anchor ", "<Stack className='anchor' id=")
    .replaceAll(" anchor]", "/>")
    .replaceAll(
      "<li>",
      "<Stack component='li' mb={1}><Typography color='#fff'>• "
    )
    .replaceAll("</li>", "</Typography></Stack>")
    .replaceAll(
      "<a",
      "<Box component='a' target='_blank' className='cool-button' sx={{color: theme => theme.palette.secondary.main}}"
    )
    .replaceAll("a>", "Box>")
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
      }}
      jsx={jsx}
      className="full-width"
    />
  )
}
