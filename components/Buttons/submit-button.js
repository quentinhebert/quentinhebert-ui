import PillButton from "./pill-button"

export default function SubmitButton({ onClick, disabled, label, icon }) {
  return (
    <PillButton
      type="submit"
      color={(theme) => theme.palette.text.secondary}
      border={(theme) => `1px solid ${theme.palette.text.secondary}`}
      background="transparent"
      startIcon={icon}
      onClick={onClick}
      disabled={disabled || false}
    >
      {label || "Enregistrer"}
    </PillButton>
  )
}
