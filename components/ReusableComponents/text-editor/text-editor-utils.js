import JsxParser from "react-jsx-parser"
import BodyText from "../Text/body-text"
import SmallTitle from "../titles/small-title"
import { Stack } from "@mui/material"

export function formatToCustomComponentString(htmlString) {
  let formattedString = htmlString
    .replaceAll("<p", "<Stack><BodyText")
    .replaceAll("p>", "BodyText></Stack>")
    .replaceAll("<h1", "<SmallTitle")
    .replaceAll("h1>", "SmallTitle>")
    .replaceAll("<ol", "<BodyText><ol")
    .replaceAll("</ol>", "</ol></BodyText>")
    .replaceAll("<br>", "<br />")

  return formattedString
}

export function ParseJsxString({ jsx }) {
  return (
    <JsxParser
      components={{ BodyText, SmallTitle, Stack }}
      jsx={jsx}
      className="full-width"
    />
  )
}
