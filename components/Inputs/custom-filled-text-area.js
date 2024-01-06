import { styled } from "@mui/system"
import CustomFilledInput from "./custom-filled-input"

const CssFilledTextArea = styled((props) => {
  const { rows } = props
  return <CustomFilledInput multiline maxRows={rows || 4} {...props} />
})(() => ({}))

export default function CustomFilledTextArea(props = { rows }) {
  return <CssFilledTextArea {...props} />
}
