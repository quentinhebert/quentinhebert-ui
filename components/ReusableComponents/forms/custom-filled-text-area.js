import { styled } from "@mui/system"
import CustomFilledInput from "./custom-filled-input"

const CssFilledTextArea = styled((props) => (
  <CustomFilledInput multiline rows={4} {...props} />
))()

export default function CustomFilledTextArea(props) {
  return <CssFilledTextArea {...props} />
}
