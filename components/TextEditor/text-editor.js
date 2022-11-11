import { RichTextEditor } from "@mantine/rte"
import theme from "../../config/theme"

// WARNING :
// node_modules/quill/dist/quill.js ERROR
// Don't forget to import the text editor with dynamic import !
// const TextEditor = dynamic(() => import("../../TextEditor/text-editor"), {
//   ssr: false,
// })

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
        fontSize: "initial",
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
