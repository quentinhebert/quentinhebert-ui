import JsxParser from "react-jsx-parser"
import BodyText from "../../ReusableComponents/text/body-text"
import SmallTitle from "../../ReusableComponents/titles/small-title"
import StrokeText from "../../ReusableComponents/text/stroke-text"
import { Stack } from "@mui/material"
import MediumTitle from "../../ReusableComponents/titles/medium-title"
import styles from "../../../styles/TextShine.module.css"
import Keyword from "../../ReusableComponents/text/keyword"
import CenteredMaxWidthContainer from "../../ReusableComponents/containers/centered-max-width-container"

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
    .replaceAll("<p", "<Stack><BodyText")
    .replaceAll("p>", "BodyText></Stack>")
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
