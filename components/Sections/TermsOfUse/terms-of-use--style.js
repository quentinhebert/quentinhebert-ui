import JsxParser from "react-jsx-parser"
import BodyText from "../../Text/body-text"
import { Stack, Typography } from "@mui/material"

const Title = (props) => (
  <Typography
    color="#fff"
    component="h2"
    variant="h4"
    marginTop={2}
    {...props}
  />
)

export function formatText(htmlString) {
  let formattedString = htmlString
    .replaceAll("<p", "<Stack><BodyText preventTransition")
    .replaceAll("p>", "BodyText></Stack>")
    .replaceAll("<h1", "<Title")
    .replaceAll("<h2", "<Title")
    .replaceAll("<h3", "<Title")
    .replaceAll("h1>", "Title>")
    .replaceAll("h2>", "Title>")
    .replaceAll("h3>", "Title>")
    .replaceAll("<br>", "<br />")
  return formattedString
}

export function ParseJsx({ jsx }) {
  return (
    <JsxParser
      components={{
        Title,
        BodyText,
        Stack,
      }}
      jsx={jsx}
      className="full-width"
    />
  )
}
