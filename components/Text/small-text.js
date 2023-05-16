import BodyText from "./body-text"

export default function SmallText({ fontSize, lineHeight, ...props }) {
  return (
    <BodyText
      fontSize={fontSize || { xs: "0.6rem", lg: "0.8rem" }}
      lineHeight={lineHeight || { xs: "0.6rem", lg: "0.8rem" }}
      {...props}
    />
  )
}
