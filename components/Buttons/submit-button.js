import PillButton from "./pill-button"

export default function SubmitButton({
  onClick,
  disabled,
  label,
  icon,
  ...props
}) {
  return (
    <PillButton
      type="submit"
      startIcon={icon}
      onClick={onClick}
      disabled={disabled || false}
      {...props}
    >
      {label || "Enregistrer"}
    </PillButton>
  )
}
