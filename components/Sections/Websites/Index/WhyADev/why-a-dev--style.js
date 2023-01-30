import JsxParser from "react-jsx-parser"
import BodyText from "../../../../Text/body-text"
import StrokeText from "../../../../Text/stroke-text"
import MediumTitle from "../../../../Titles/medium-title"
import styles from "../../../../../styles/TextShine.module.css"
import CenteredMaxWidthContainer from "../../../../Containers/centered-max-width-container"
import Keyword from "../../../../Text/keyword"
import { Stack } from "@mui/material"

const Title = (props) => (
  <MediumTitle
    textAlign="center"
    className={styles.shine}
    fontFamily="Zacbel X"
    lineHeight={{ xs: "15vw", sm: "10vw" }}
    {...props}
  />
)

export function formatTitle(htmlString) {
  let formattedString = htmlString
    .replaceAll("<p>", "")
    .replaceAll("</p>", "")
    .replaceAll("<em", `<StrokeText`)
    .replaceAll("em>", "StrokeText>")
    .replaceAll("<br>", "")
  return `<Title>${formattedString}</Title>`
}

export function formatDescription(htmlString) {
  let formattedString = htmlString
    .replaceAll("<p", "<BodyText")
    .replaceAll("p>", "BodyText><br /><br />")
    .replaceAll("<strong", "<Keyword")
    .replaceAll("strong>", "Keyword>")
    .replaceAll("<br>", "<br />")
  return `
    <CenteredMaxWidthContainer marginTop="1rem">
        <BodyText textAlign="center" className="no-select">
            ${formattedString}
        </BodyText>
    </CenteredMaxWidthContainer>
  `
}

export function ParseJsx({ jsx }) {
  return (
    <JsxParser
      components={{
        Stack,
        StrokeText,
        Title,
        Keyword,
        BodyText,
        CenteredMaxWidthContainer,
      }}
      jsx={jsx}
      className="full-width"
    />
  )
}
