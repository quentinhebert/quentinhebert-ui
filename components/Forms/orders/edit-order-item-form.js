import { useState, useContext } from "react"
import { Button, Grid, InputAdornment, Stack } from "@mui/material"
import AlertInfo from "../../Other/alert-info"
import { ModalTitle } from "../../Modals/Modal-Components/modal-title"
import { AppContext } from "../../../contexts/AppContext"
import CustomForm from "../custom-form"
import RectangleButton from "../../Buttons/rectangle-button"
import CustomFilledTextArea from "../../Inputs/custom-filled-text-area"
import CustomFilledInput from "../../Inputs/custom-filled-input"
import CustomFilledSelect from "../../Inputs/custom-filled-select"
import { QUOTATION_ITEM_TYPES } from "../../../enums/quotationItemTypes"
import CustomSelectOption from "../../Inputs/custom-select-option"
import DeleteIcon from "@mui/icons-material/Delete"
import withConfirmAction from "../../hocs/withConfirmAction"
import BasicTooltip from "../../Helpers/basic-tooltip"

const INTEGER_FIELDS = ["quantity"]
const FLOAT_FIELDS = ["no_vat_price", "vat"]

function EditOrderItemForm({
  handleClose,
  incomingItem,
  itemIndex,
  items,
  setItems,
  setActionToFire,
  setOpenConfirmModal,
  setConfirmTitle,
  setNextButtonText,
  setConfirmContent,
  handleDetectChange,
  noVat,
}) {
  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  /********** USE-STATES **********/
  const [credits, setCredits] = useState("")
  const [showAlert, setShowAlert] = useState({
    show: false,
    severity: null,
    text: null,
    title: null,
  })
  const [item, setItem] = useState({
    type: incomingItem.type || "",
    label: incomingItem.label || "",
    description: incomingItem.description || "",
    quantity: incomingItem.quantity || 1,
    vat: incomingItem.vat || 0,
    no_vat_price: incomingItem.no_vat_price / 100 || 0,
  })

  const handleChange = (attribute) => (e) => {
    if (INTEGER_FIELDS.includes(attribute)) {
      return setItem({
        ...item,
        [attribute]: !Number.isNaN(Number(e.target.value))
          ? Number(e.target.value)
          : item[attribute],
      })
    }

    if (FLOAT_FIELDS.includes(attribute)) {
      const value = e.target.value
      const formattedValue = e.target.value.replace(",", ".")

      const floatSeparators = [",", "."]
      const endWithFloatSeparator = floatSeparators.includes(
        value.charAt(value.length - 1)
      )

      return setItem({
        ...item,
        [attribute]:
          !Number.isNaN(Number(formattedValue)) && !endWithFloatSeparator
            ? Number(formattedValue) // valid number
            : value, // invalid number but user can continue to type
      })
    }

    setItem({ ...item, [attribute]: e.target.value })
  }

  const handleSave = async () => {
    const localItems = items

    // Format price from euros to cents
    const localItem = item
    localItem.no_vat_price = item.no_vat_price * 100

    localItems[itemIndex] = item
    handleDetectChange()
    if (handleClose) handleClose()
  }

  const handleCancel = async () => {
    if (handleClose) handleClose()
  }

  const deleteItem = () => {
    const localItems = items
    localItems.splice(itemIndex, 1) // remove item from array
    setItems(localItems)
    handleDetectChange()
    if (handleClose) handleClose()
  }

  const handleDelete = () => {
    setActionToFire(() => () => deleteItem())
    setOpenConfirmModal(true)
    setConfirmTitle("Supprimer la ligne")
    setNextButtonText("Supprimer")
    setConfirmContent({
      text: "Voulez-vous vraiment supprimer la ligne du devis ?",
    })
  }

  const tooManyDecimals = (numb) => numb.toString().split(".")[1]?.length > 2
  const invalidPercentage = (percent) => percent < 0 || percent > 100

  const errors = {
    label: item.label.trim() === "",
    description: item.description.trim() === "",
    type: item.type.trim() === "",
    quantity: item.quantity === 0,
    vat:
      Number.isNaN(Number(item.vat)) ||
      tooManyDecimals(item.vat) ||
      invalidPercentage(item.vat),
    no_vat_price:
      Number.isNaN(Number(item.no_vat_price)) ||
      tooManyDecimals(item.no_vat_price) ||
      item.no_vat_price < 0,
  }

  const totalPrice =
    Math.round(item.no_vat_price * item.quantity * (1 + item.vat / 100) * 100) /
    100

  /********** RENDER **********/
  return (
    <Stack width="100%" gap={4}>
      <ModalTitle>Modifier la ligne de devis</ModalTitle>

      <CustomForm gap={4}>
        <Stack gap={2} width="100%">
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <CustomFilledInput
                label="Intitulé"
                value={item.label}
                onChange={handleChange("label")}
                placeholder="Journée de tournage"
              />
            </Grid>
            <Grid item xs={4}>
              <CustomFilledSelect
                required
                id="type"
                value={item.type}
                onChange={handleChange("type")}
                renderValue={
                  // Trick for placeholder hiding
                  item.type !== ""
                    ? undefined
                    : () => <Typography>Type</Typography>
                }
              >
                {QUOTATION_ITEM_TYPES.map((option, key) => (
                  <CustomSelectOption value={option.id} key={key}>
                    {option.label}
                  </CustomSelectOption>
                ))}
              </CustomFilledSelect>
            </Grid>
          </Grid>
          <CustomFilledTextArea
            label="Description"
            value={item.description}
            onChange={handleChange("description")}
            rows={2}
            placeholder="Prise de vues"
          />
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <CustomFilledInput
                inputProps={{
                  // WARNING: inputProps !== InputProps
                  inputmode: "decimal", // Numeric pad on mobile
                }}
                type="text"
                label="Quantité"
                value={item.quantity}
                onChange={handleChange("quantity")}
              />
            </Grid>
            <Grid item xs={3}>
              <BasicTooltip
                title={`Pour modifier la TVA, veuillez décocher "TVA non applicable" à l'étape (4/6).`}
                disabled={!noVat}
              >
                <Stack>
                  <CustomFilledInput
                    disabled={noVat}
                    inputProps={{
                      // WARNING: inputProps !== InputProps
                      inputmode: "decimal", // Numeric pad on mobile
                    }}
                    type="text"
                    label="TVA"
                    value={item.vat}
                    onChange={handleChange("vat")}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <InputAdornment position="start">%</InputAdornment>
                      ),
                    }}
                    error={errors.vat}
                  />
                </Stack>
              </BasicTooltip>
            </Grid>
            <Grid item xs={3}>
              <CustomFilledInput
                inputProps={{
                  // WARNING: inputProps !== InputProps
                  inputmode: "decimal", // Numeric pad on mobile
                }}
                type="text"
                label="Prix HT"
                value={item.no_vat_price}
                onChange={handleChange("no_vat_price")}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  ),
                }}
                error={errors.no_vat_price}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomFilledInput
                disabled
                label="Total"
                value={!isNaN(totalPrice) ? `${totalPrice} €` : ""}
              />
            </Grid>
          </Grid>

          {showAlert.show ? <AlertInfo content={showAlert} /> : null}
        </Stack>

        <Stack flexDirection="row" gap={2}>
          <Button
            color="secondary"
            startIcon={<DeleteIcon />}
            sx={{
              borderRadius: "10px",
            }}
            onClick={handleDelete}
          >
            Supprimer
          </Button>

          <RectangleButton onClick={handleCancel}>Annuler</RectangleButton>
          <RectangleButton
            secondary
            onClick={handleSave}
            disabled={
              errors.description ||
              errors.label ||
              errors.no_vat_price ||
              errors.quantity ||
              errors.type ||
              errors.vat
            }
          >
            Enregistrer
          </RectangleButton>
        </Stack>
      </CustomForm>
    </Stack>
  )
}

export default withConfirmAction(EditOrderItemForm)
