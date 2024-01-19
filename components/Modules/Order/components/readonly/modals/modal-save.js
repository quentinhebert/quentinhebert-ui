import { Stack } from "@mui/material"
import CustomForm from "../../../../../Forms/custom-form"
import CustomFilledInput from "../../../../../Inputs/custom-filled-input"
import { ModalTitle } from "../../../../../Modals/Modal-Components/modal-title"
import BodyText from "../../../../../Text/body-text"
import CancelTextButton from "../../../../../Buttons/cancel-text-button"
import PillButton from "../../../../../Buttons/pill-button"
import SaveAltIcon from "@mui/icons-material/SaveAlt"
import { useContext } from "react"
import { Context } from "../../../module"

export default function ModalSave() {
  const { state, handleSave, handleChange, handleCloseModal } =
    useContext(Context)

  return (
    <>
      <ModalTitle alignItems="center" display="flex" gap={1}>
        <SaveAltIcon /> Sauvegarder la commande
      </ModalTitle>
      <BodyText preventTransition fontSize="1rem">
        Vous retrouverez la commande dans votre Dashboard dans l'onglet
        "Commandes".
      </BodyText>
      <CustomForm gap={4}>
        <CustomFilledInput
          value={state.order.label}
          onChange={handleChange("label")}
          label="Nom de la commande"
        />
        <Stack className="row" gap={2} alignSelf="end" alignItems="center">
          <CancelTextButton handleCancel={handleCloseModal} />
          <PillButton
            onClick={handleSave}
            disabled={state.order.label?.trim() === ""}
          >
            Enregistrer
          </PillButton>
        </Stack>
      </CustomForm>
    </>
  )
}
