import { styled } from "@mui/system"
import CustomOutlinedInput from "./custom-outlined-input"

const CssOutlinedTextArea = styled((props) => {
  const { rows } = props
  return <CustomOutlinedInput multiline rows={rows || 4} {...props} />
})(() => ({}))

export default function CustomOutlinedTextArea(props = { rows }) {
  return <CssOutlinedTextArea {...props} />
}
