import JsxParser from "react-jsx-parser"
import BodyText from "../../Text/body-text"
import SmallTitle from "../../Titles/small-title"
import { Stack, Typography } from "@mui/material"

const Title = (props) => (
  <Typography
    color="#fff"
    component="h2"
    variant="h4"
    marginTop={4}
    {...props}
  />
)

export function formatText(htmlString) {
  let formattedString = htmlString
    .replaceAll(
      "<p",
      "<Stack margin='.5rem 0 2rem'><BodyText preventTransition textAlign='justify'"
    )
    .replaceAll("p>", "BodyText></Stack>")
    .replaceAll("<h1", "<Title")
    .replaceAll("<h2", "<Typography variant='h4' color='#fff'")
    .replaceAll("<h3", "<Title")
    .replaceAll("h1>", "Title>")
    .replaceAll("h2>", "Typography>")
    .replaceAll("h3>", "Title>")
    .replaceAll("<br>", "<br />")
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
      }}
      jsx={jsx}
      className="full-width"
    />
  )
}
