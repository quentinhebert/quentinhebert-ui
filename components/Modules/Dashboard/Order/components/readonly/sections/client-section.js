import { useContext } from "react"
import { Box, IconButton, Table, TableCell, TableRow } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"

import { Context, DocumentHeader, FormCard, MODALS } from "../../../module"
import AlertInfo from "../../../../../../Other/alert-info"
import BodyText from "../../../../../../Text/body-text"
import PillButton from "../../../../../../Buttons/pill-button"

export default function ClientSection() {
  const { state, handleOpenModal } = useContext(Context)
  return (
    <>
      {!state.order.client?.id && (
        <AlertInfo
          content={{
            severity: "warning",
            text: "Veuillez assigner un client à la commande.",
          }}
        />
      )}
      <FormCard>
        <DocumentHeader>
          <Identity>
            {!state.order.client.id && "Aucun client associé"}
            {state.order.client.firstname} {state.order.client.lastname}{" "}
            <Box component="span" color="grey">
              {!!state.order.client.company &&
                ` / ${state.order.client.company}`}
            </Box>
          </Identity>
          <EditButton
            label="Assigner"
            onClick={() => handleOpenModal(MODALS.ASSIGN)}
          />
        </DocumentHeader>

        <Table
          sx={{
            width: "100%",
            "& .MuiTableCell-root": {
              borderBottom: "none",
              padding: ".5rem .25rem",
              paddingRight: "1rem",
              overflowWrap: "break-word",
              wordWrap: "break-word",
              "-ms-word-break": "break-all",
              wordBreak: "break-all",
              wordBreak: "break-word",
              "-ms-hyphens": "auto",
              "-moz-hyphens": "auto",
              "-webkit-hyphens": "auto",
              hyphens: "auto",
            },
          }}
        >
          <TableRow>
            <Title>E-mail</Title>
            <Value>{state.order.client.email || <UndefinedValue />}</Value>
          </TableRow>
          <TableRow>
            <Title>Téléphone</Title>
            <Value>{state.order.client.phone || <UndefinedValue />}</Value>
          </TableRow>
          <TableRow>
            <Title>Addresse</Title>
            <Value>
              {!(
                !!state.order.client.line1 ||
                !!state.order.client.line2 ||
                !!state.order.client.postal_code ||
                !!state.order.client.city ||
                !!state.order.client.region ||
                !!state.order.client.country
              ) && <UndefinedValue />}
              {state.order.client.line1 || ""} {state.order.client.line2 || ""}{" "}
              {state.order.client.postal_code || ""}{" "}
              {state.order.client.city || ""} {state.order.client.region || ""}{" "}
              {state.order.client.country || ""}
              <SimpleEditButton
                onClick={() => handleOpenModal(MODALS.CLIENT_ADDRESS)}
              />
            </Value>
          </TableRow>
          {!!state.order.client.siret ? (
            <>
              <TableRow>
                <Title>SIRET</Title>
                <Value>{state.order.client.siret}</Value>
              </TableRow>
              <TableRow>
                <Title>N° TVA</Title>
                <Value>
                  {state.order.client.vat_number || <UndefinedValue />}
                </Value>
              </TableRow>
            </>
          ) : (
            <></>
          )}
        </Table>
      </FormCard>
    </>
  )
}

function Title(props) {
  return (
    <TableCell sx={{ verticalAlign: "baseline" }}>
      <BodyText
        preventTransition
        fontSize="1rem"
        whiteSpace="nowrap"
        {...props}
        color={(theme) => theme.palette.text.grey}
      />
    </TableCell>
  )
}
function Value(props) {
  return (
    <TableCell sx={{ textAlign: "right", verticalAlign: "baseline" }}>
      <BodyText preventTransition fontSize="1rem" {...props} />
    </TableCell>
  )
}
function Identity(props) {
  return <BodyText preventTransition fontSize="1.2rem" {...props} />
}
function UndefinedValue() {
  return (
    <Box
      component="span"
      sx={{
        color: (theme) => `${theme.palette.error.main} !important`,
        fontStyle: "italic",
      }}
    >
      Non renseigné
    </Box>
  )
}
function EditButton({ onClick, label }) {
  return (
    <PillButton
      startIcon={<EditIcon />}
      fontSize="0.8rem"
      padding=".25rem 1rem"
      preventTransition
      onClick={onClick}
    >
      {label || "Modifier"}
    </PillButton>
  )
}
function SimpleEditButton({ onClick, label }) {
  return (
    <IconButton color="secondary" onClick={onClick} size="small">
      <EditIcon fontSize="inherit" />
    </IconButton>
  )
}
