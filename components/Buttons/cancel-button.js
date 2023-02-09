import PillButton from "./pill-button"

export default function CancelButton({ handleCancel, label }) {
  return (
    <PillButton
      color={"#fff"}
      border={"1px solid #fff"}
      background="transparent"
      onClick={handleCancel}
    >
      {label || "Annuler"}
    </PillButton>
  )
}
