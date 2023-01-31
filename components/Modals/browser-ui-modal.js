import BrowserLayout from "../Layouts/BrowserLayout"

export default function BrowserUiModal({ src }) {
  return (
    <BrowserLayout>
      <embed
        src={src}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
        }}
      />
    </BrowserLayout>
  )
}
