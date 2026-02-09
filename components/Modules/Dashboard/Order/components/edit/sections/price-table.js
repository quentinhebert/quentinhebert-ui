import { useContext } from "react"
import { Context, MODALS } from "../../../module"
import SmallTitle from "../../../../../../Titles/small-title"
import SellIcon from "@mui/icons-material/Sell"
import Span from "../../../../../../Text/span"
import CustomFilledTextArea from "../../../../../../Inputs/custom-filled-text-area"
import { Box, Grid, Stack } from "@mui/material"
import { arrayMoveImmutable } from "array-move"
import { SortableContainer, SortableElement } from "react-sortable-hoc"
import BodyText from "../../../../../../Text/body-text"
import { formatPrice } from "../../../../../../../services/utils"
import AddIcon from "@mui/icons-material/Add"
import SubmitButton from "../../../../../../Buttons/submit-button"
import PriceDetails from "../../../../../../Sections/Account/Orders/price-details"

export default function PriceTable() {
  const { state, setState, handleChange } = useContext(Context)

  return (
    <>
      <SmallTitle
        color={(theme) => theme.palette.secondary.main}
        alignItems="center"
        gap={2}
        display="flex"
        mt={2}
      >
        <SellIcon />
        Détails des produits / services <Span color="#fff">(5/5)</Span>
      </SmallTitle>

      <CustomFilledTextArea
        label="Objet de la commande"
        value={state.order.description}
        onChange={handleChange("description")}
      />

      <Stack gap={2} width="100%" overflow="auto" id="list-container">
        <SortableList
          component="ul"
          className="list-style-none no-padding full-width flex-wrap"
          gap=".5rem"
          axis="xy"
          items={state.items}
          pressDelay={100}
          onSortStart={() => {
            document.body.style.cursor = "grabbing"
            document.getElementById("list-container").style.overflow = "clip"
          }}
          onSortEnd={onSortEnd}
        />
      </Stack>

      {/********** NEW LINE BUTTON **********/}
      <Stack className="flex-center" width="100%">
        <SubmitButton
          background={(theme) => theme.palette.background.secondary}
          onClick={() =>
            setState({ ...state, modal: MODALS.CREATE_ITEM, openModal: true })
          }
        >
          Nouvelle ligne
          <AddIcon />
        </SubmitButton>
      </Stack>

      {/********** TOTAL PRICES **********/}
      <Stack alignSelf="center" mt={4}>
        <PriceDetails order={state.order} items={state.items} />
      </Stack>
    </>
  )

  function onSortEnd(e) {
    document.getElementById("list-container").style.overflow = "auto"
    const newState = arrayMoveImmutable(state.items, e.oldIndex, e.newIndex)
    setState({ ...state, items: newState })
    document.body.style.cursor = "default"
  }
}

const SortableRow = SortableElement(({ item, index, onClick, ...props }) => {
  return (
    <Box
      onClick={onClick}
      component="li"
      className="list-style-none no-select"
      display="flex"
      sx={{
        position: "relative",
      }}
    >
      <Grid
        container
        sx={{
          "&:hover": {
            cursor: "pointer",
            background: "rgb(256,256,256, 0.05)",
          },
        }}
      >
        <Grid item xs={2}>
          <Cell>{item.type}</Cell>
        </Grid>
        <Grid item xs={2}>
          <Cell>{item.label}</Cell>
        </Grid>
        <Grid item xs={4}>
          <Cell>{item.description}</Cell>
        </Grid>
        <Grid item xs={1}>
          <Cell>{item.quantity}</Cell>
        </Grid>
        <Grid item xs={1}>
          <Cell whiteSpace="nowrap">{item.vat} %</Cell>
        </Grid>
        <Grid item xs={1}>
          <Cell whiteSpace="nowrap">{formatPrice(item.no_vat_price)} €</Cell>
        </Grid>
        <Grid item xs={1}>
          <Cell whiteSpace="nowrap">
            {formatPrice(
              item.no_vat_price * item.quantity * (1 + item.vat / 100),
            )}{" "}
            €
          </Cell>
        </Grid>
      </Grid>
    </Box>
  )
})
const SortableList = SortableContainer(({ items }) => {
  const { state, setState } = useContext(Context)

  function handleEdit(item, key) {
    setState({
      ...state,
      selectedItem: item,
      selectedItemIndex: key,
      modal: MODALS.EDIT_ITEM,
      openModal: true,
    })
  }

  return (
    <Stack minWidth="1000px" overflow="hidden" borderRadius="10px">
      <Box className="no-padding full-width">
        <Grid container>
          <Grid item xs={2}>
            <HeadCell>Type</HeadCell>
          </Grid>
          <Grid item xs={2}>
            <HeadCell>Désignation</HeadCell>
          </Grid>
          <Grid item xs={4}>
            <HeadCell>Description</HeadCell>
          </Grid>
          <Grid item xs={1}>
            <HeadCell>Qté.</HeadCell>
          </Grid>
          <Grid item xs={1}>
            <HeadCell whiteSpace="nowrap">TVA</HeadCell>
          </Grid>
          <Grid item xs={1}>
            <HeadCell whiteSpace="nowrap">Prix unit.</HeadCell>
          </Grid>
          <Grid item xs={1}>
            <HeadCell whiteSpace="nowrap">TTC</HeadCell>
          </Grid>
        </Grid>
      </Box>

      <Box
        component="ul"
        className="list-style-none no-padding full-width"
        margin={0}
      >
        {items &&
          items.map((item, index) => (
            <SortableRow
              axis="xy"
              key={index}
              index={index}
              item={item}
              onClick={() => handleEdit(item, index)}
            />
          ))}
      </Box>
    </Stack>
  )
})
function Cell(props) {
  return (
    <Stack
      sx={{
        padding: 2,
        height: "100%",
      }}
    >
      <BodyText color="#fff" {...props} preventTransition />
    </Stack>
  )
}
function HeadCell(props) {
  return (
    <Stack
      sx={{
        bgcolor: "primary.main",
        padding: 2,
        height: "100%",
      }}
    >
      <BodyText color="#fff" {...props} preventTransition />
    </Stack>
  )
}
