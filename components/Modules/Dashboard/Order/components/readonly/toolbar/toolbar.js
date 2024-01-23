import { useContext } from "react"
import { Context, MODALS, MODES } from "../../../module"
import { QUOTATION_STATUS } from "../../../../../../../enums/quotationStatus"
import BodyText from "../../../../../../Text/body-text"
import { parseOrderPrice } from "../../../../../../../services/orders"
import { ORDERSTATES } from "../../../../../../../enums/orderStates"
import theme from "../../../../../../../config/theme"
import Pill from "../../../../../../Text/pill"
import ReadyBtn from "./ready-btn"
import DropdownOptions from "../../../../../../Dropdown/dropdown-options"

import SimpleCheckIcon from "@mui/icons-material/Check"
import EditIcon from "@mui/icons-material/Edit"
import TitleIcon from "@mui/icons-material/Title"
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"
import DeleteIcon from "@mui/icons-material/Delete"
import { Stack } from "@mui/material"

const EDIT_STATUSES = [
  QUOTATION_STATUS.DRAFT.id,
  QUOTATION_STATUS.SENT.id,
  QUOTATION_STATUS.REFUSED.id,
]

export default function Toolbar() {
  const { state, setState, handleDelete, handleOpenModal } = useContext(Context)

  const options = [
    {
      label: "La commande est prête",
      handleClick: () => handleOpenModal(MODALS.TAG),
      icon: <SimpleCheckIcon />,
    },
    {
      label: "Modifier",
      handleClick: () => setState({ ...state, mode: MODES.EDIT }),
      icon: <EditIcon />,
    },
    {
      label: "Changer le nom",
      handleClick: () => handleOpenModal(MODALS.SAVE),
      icon: <TitleIcon />,
    },
    {
      label: "Assigner un client",
      handleClick: () => handleOpenModal(MODALS.ASSIGN),
      icon: <AssignmentIndIcon />,
    },
  ]

  if (!EDIT_STATUSES.includes(state.order.status)) {
    delete options[options.findIndex((elt) => elt.label === "Modifier")]
  } else
    options.push({
      label: "Supprimer la commande",
      handleClick: handleDelete,
      icon: <DeleteIcon />,
    })

  let amountSumArray = []
  !!state?.order?.paymentFractions?.length &&
    state?.order?.paymentFractions.map((elt) =>
      amountSumArray.push(`${elt.amount / 100}€`)
    )

  return (
    <Stack
      width="100%"
      sx={{
        position: "-webkit-sticky",
        position: "sticky",
        top: 50,
        bgcolor: "background.black",
        zIndex: 10,
        padding: "1rem 0 1.5rem",
        alignItems: "left",
        margin: "1rem 0",
        "&::after": {
          zIndex: -1,
          background: "transparent",
          height: "100%",
          width: "100vw",
          position: "absolute",
          bottom: 0,
          left: { xs: "-1rem", md: "-3rem" },
          borderBottom: (theme) => `1px solid ${theme.palette.secondary.main}`,
          content: `''`,
        },
      }}
    >
      <BodyText
        preventTransition
        fontSize="1.5rem"
        color={(theme) => theme.palette.text.secondary}
      >
        {state.order.label || "Sans nom"}
      </BodyText>
      <BodyText preventTransition color="grey" fontSize="1rem">
        Commande
        {!!state.order.client.firstname
          ? ` de ${state.order.client.firstname} ${
              state.order.client.lastname || ""
            }`
          : null}
        {!!state.order.client.company && ` / ${state.order.client.company}`}
      </BodyText>

      <Stack
        alignItems="end"
        width="100%"
        flexDirection="row"
        justifyContent="space-between"
        gap={2}
      >
        <Stack gap={1} className="flex-center row">
          <BodyText fontSize="1.5rem" preventTransition>
            {(
              Math.round(
                parseOrderPrice({ order: state.order, items: state.items })
                  .totalPrice
              ) / 100
            ).toFixed(2)}
            €
          </BodyText>

          <Status />
        </Stack>

        <Stack
          gap={2}
          className="flex-center"
          flexDirection={{ xs: "column", md: "row" }}
        >
          {state.order.status === "DRAFT" && <ReadyBtn />}
          <DropdownOptions options={options} />
        </Stack>
      </Stack>
    </Stack>
  )
}

function Status() {
  const { state } = useContext(Context)
  return (
    <Pill
      border="1px solid"
      borderColor={
        theme.alert.title[ORDERSTATES[state.order.status].severity].color
      }
      bgColor={
        theme.alert.title[ORDERSTATES[state.order.status].severity].background
      }
      preventTransition
      padding="0 .75rem"
      lineHeight={0}
    >
      <BodyText
        color={
          theme.alert.title[ORDERSTATES[state.order.status].severity].color
        }
        fontSize="0.8rem"
        preventTransition
        whiteSpace="nowrap"
      >
        {ORDERSTATES[state.order.status].label}
      </BodyText>
    </Pill>
  )
}
