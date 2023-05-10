import BodyText from "./body-text"

export default function SmallText({ fontSize, ...props }) {
  return (
    <BodyText
      fontSize={fontSize || { xs: "0.6rem", lg: "0.8rem" }}
      {...props}
    />
  )
}
