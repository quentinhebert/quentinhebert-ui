import { Box, Stack } from "@mui/material"
import { SortableContainer } from "react-sortable-hoc"
import SwitchButton from "../buttons/switch-button"
import RefreshIcon from "@mui/icons-material/Refresh"
import AddIcon from "@mui/icons-material/Add"
import { arrayMoveImmutable } from "array-move"
import { useState } from "react"
import dynamic from "next/dynamic"

const AlertInfo = dynamic(() => import("../../Other/alert-info"))
const PillButton = dynamic(() => import("../buttons/pill-button"))
const OutlinedButton = dynamic(() => import("../buttons/outlined-button"))

const SortableList = SortableContainer(({ ...props }) => (
  <Box
    component="ul"
    className="list-style-none no-padding full-width flex-wrap"
    gap=".5rem"
    {...props}
  />
))

const SortableGrid = ({
  items,
  setItems,
  sortable,
  setSortable,
  fetch,
  handleCreate,
  handleSave,
  ...props
}) => {
  const [initialState, setInitialState] = useState(null)
  const toggleCheck = () => {
    setSortable(true)
    setInitialState(items)
  }
  const handleCancel = () => {
    setItems(initialState)
    setSortable(false)
  }
  const handleRefresh = () => {
    fetch()
    setSortable(false)
  }
  const onSortEnd = (e) => {
    const newState = arrayMoveImmutable(items, e.oldIndex, e.newIndex)
    setItems(newState)
    document.body.style.cursor = "default"
  }

  const SortHelper = () => (
    <AlertInfo
      content={{
        show: true,
        severity: "info",
        title: "Modifiez l'ordre des items",
        text: "Il vous suffit de glisser-déposer les éléments sur la grille puis d'enregistrer !",
        js: (
          <Stack direction="row" gap={2}>
            <PillButton onClick={handleCancel}>Annuler</PillButton>
            <PillButton onClick={handleSave}>Enregistrer</PillButton>
          </Stack>
        ),
      }}
    />
  )

  return (
    <>
      <Stack width="100%" alignItems="end">
        <Stack className="row flex-center" gap={4}>
          <SwitchButton
            label="Modifier l'ordre"
            checked={sortable}
            disabled={sortable}
            handleCheck={toggleCheck}
          />

          <RefreshIcon
            color="secondary"
            onClick={handleRefresh}
            className="flex pointer"
            sx={{
              "&:hover": { opacity: 0.5 },
            }}
          />

          {!!handleCreate && (
            <OutlinedButton startIcon={<AddIcon />} onClick={handleCreate}>
              Ajouter
            </OutlinedButton>
          )}
        </Stack>

        {sortable && <SortHelper />}
      </Stack>

      <SortableList
        axis="xy"
        onSortStart={() => (document.body.style.cursor = "grabbing")}
        onSortEnd={onSortEnd}
        {...props}
      />
    </>
  )
}

export default SortableGrid
