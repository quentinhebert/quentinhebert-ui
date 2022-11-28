import PillButton from "./pill-button"

export default function CancelButton({ handleCancel }) {
  return (
    <PillButton
      color={"#fff"}
      border={"1px solid #fff"}
      background="transparent"
      onClick={handleCancel}
    >
      Annuler
    </PillButton>
  )
}
