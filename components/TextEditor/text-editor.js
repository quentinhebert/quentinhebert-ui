import { RichTextEditor } from "@mantine/rte"
import theme from "../../config/theme"

export default function TextEditor({ value, setValue, controls, id }) {
  return (
    <RichTextEditor
      id={id || "rte"}
      value={value}
      onChange={setValue}
      style={{
        width: "100%",
        // backgroundColor: "transparent",
        border: `1px solid ${theme.palette.secondary.main}`,
        // color: "#fff",
      }}
      controls={
        controls || [
          ["bold", "italic", "underline", "link"],
          ["unorderedList", "orderedList", "h1", "h2"],
          ["sup", "sub"],
          ["alignLeft", "alignCenter", "alignRight"],
        ]
      }
    />
  )
}
