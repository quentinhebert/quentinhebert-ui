import {
  Box,
  Stack,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material"
import { useContext, useEffect, useState } from "react"
import AddRoundedIcon from "@mui/icons-material/AddRounded"
import RefreshIcon from "@mui/icons-material/Refresh"

import { UserContext } from "../../contexts/UserContext"
import useAddProspect from "../../hooks/useAddProspect"
import useViewProspect from "../../hooks/useViewProspect"
import apiCall from "../../services/apiCalls/apiCall"
import { formatDayDate } from "../../services/date-time"
import Pill from "../Text/pill"
import BodyText from "../Text/body-text"
import PleaseWait from "../Helpers/please-wait"
import CustomFilledSelect from "../Inputs/custom-filled-select"
import CustomSelectOption from "../Inputs/custom-select-option"
import CustomIconButton from "../Buttons/custom-icon-button"
import {
  PROSPECT_STATES,
  PROSPECT_STATES_ENUM,
} from "../../enums/prospectStates"

export default function QuotationRequests_Main({}) {
  const [prospects, setProspects] = useState([])
  const [statusFilter, setStatusFilter] = useState("REQUEST")
  const [loading, setLoading] = useState(false)
  const [selectedProspectId, setSelectedProspectId] = useState(null)

  const { handleOpenAddProspectModal, AddProspectDialog } = useAddProspect({
    refreshData: fetchProspects,
  })
  const { handleOpenViewProspectModal, ViewProspectDialog } = useViewProspect({
    id: selectedProspectId,
    refreshData: fetchProspects,
  })

  const filteredProspects =
    statusFilter === "ALL"
      ? prospects
      : prospects.filter((elt) => elt.status === statusFilter)

  // Fetch data
  useEffect(() => {
    fetchProspects()
  }, [])

  // RENDER
  return (
    <Stack
      gap={4}
      sx={{
        background: (theme) => theme.palette.background.main,
        borderRadius: "30px",
      }}
      padding={{ xs: "2rem .75rem", md: "2rem" }}
    >
      <Typography variant="h5" color="#fff" textAlign="center">
        Prospects{" "}
        {prospects.filter((elt) => elt.opened === false).length
          ? `(${prospects.filter((elt) => elt.opened === false).length})`
          : null}
      </Typography>

      <Stack
        width="100%"
        alignItems="center"
        justifyContent={{ xs: "", md: "space-between" }}
        flexDirection={{ xs: "column", md: "row" }}
        gap={4}
      >
        <Stack flexDirection="row" gap={1}>
          <CustomIconButton
            onClick={handleOpenAddProspectModal}
            icon={
              <AddRoundedIcon sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }} />
            }
            tooltip="Ajouter un prospect"
          />
          <CustomIconButton
            onClick={fetchProspects}
            icon={
              <RefreshIcon sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }} />
            }
            loading={loading}
            tooltip="Raffraîchir"
          />
        </Stack>

        {/* SELECT STATUS FILTER */}
        <Box>
          <CustomFilledSelect
            padding="0rem"
            required
            id="status"
            value={statusFilter}
            onChange={handleChangeStatusFilter}
          >
            {PROSPECT_STATES_ENUM.map((option, key) => (
              <CustomSelectOption value={option} key={key} padding="0rem">
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  gap={1}
                  sx={{
                    fontSize: { xs: ".8rem", md: "1rem" },
                    width: "100%",
                    background: (theme) =>
                      theme.alert.title[PROSPECT_STATES[option].severity]
                        .background,
                    color: (theme) =>
                      theme.alert.title[PROSPECT_STATES[option].severity].color,
                    padding: ".5rem 1rem",
                    "&:hover": {
                      opacity: 0.9,
                    },
                  }}
                >
                  {PROSPECT_STATES[option].icon}
                  {PROSPECT_STATES[option].label}{" "}
                  {option === "ALL" ? `(${prospects.length})` : null}
                </Stack>
              </CustomSelectOption>
            ))}
          </CustomFilledSelect>
        </Box>
      </Stack>
      <Stack gap={2} overflow="hidden">
        {loading && <PleaseWait />}

        <ProspectsPanel
          list={filteredProspects}
          showStatus={statusFilter === "ALL"}
          handleClick={(id) => {
            setSelectedProspectId(id)
            handleOpenViewProspectModal()
          }}
        />

        {AddProspectDialog({})}
        {ViewProspectDialog({})}
      </Stack>
    </Stack>
  )

  function handleChangeStatusFilter(e) {
    return setStatusFilter(e.target.value)
  }
  async function fetchProspects() {
    setLoading(true)
    const res = await apiCall.dashboard.prospects.getAll()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setProspects(jsonRes)
    }
    return setLoading(false)
  }
}

function ProspectsPanel({ list, handleClick, showStatus }) {
  return (
    <Box overflow="auto">
      <Table
        padding=".25rem .5rem"
        width="100%"
        minWidth="800px"
        sx={{ "& td": { border: 0 } }}
      >
        <TableRow>
          <TableCell>
            <BodyText color="gray" preventTransition>
              Service(s)
            </BodyText>
          </TableCell>
          <TableCell>
            <BodyText color="gray" preventTransition>
              Contact
            </BodyText>
          </TableCell>
          <TableCell>
            <BodyText color="gray" preventTransition>
              Détail
            </BodyText>
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
              display: showStatus ? "" : "none",
            }}
          >
            <BodyText color="gray" preventTransition>
              Status
            </BodyText>
          </TableCell>
          <TableCell sx={{ textAlign: "right" }}>
            <BodyText color="gray" preventTransition whiteSpace="nowrap">
              Modifié le
            </BodyText>
          </TableCell>
          <TableCell sx={{ textAlign: "right" }}>
            <BodyText color="gray" preventTransition>
              Créé le
            </BodyText>
          </TableCell>
        </TableRow>

        {!!list?.length &&
          list.map((item, key) => (
            <ProspectRow
              key={key}
              index={key}
              id={item.id}
              status={item.status}
              firstname={item.firstname}
              lastname={item.lastname}
              email={item.email}
              company={item.company}
              description={item.description}
              contacted={item.contacted}
              services={item.services}
              onClick={() => handleClick(item.id)}
              showStatus={showStatus}
              opened={item.opened}
              created_at={item.created_at}
              last_update={item.last_update}
            />
          ))}
      </Table>
    </Box>
  )
}
function ProspectRow({
  index,
  status,
  firstname,
  lastname,
  company,
  description,
  services,
  onClick,
  showStatus,
  opened,
  created_at,
  last_update,
}) {
  const user = useContext(UserContext)
  return (
    <>
      <TableRow
        onClick={onClick}
        padding=".5rem"
        className="pointer"
        width="100%"
        minWidth="800px"
        sx={{
          background: index % 2 !== 0 ? "transparent" : "rgb(0,0,0,0.3)",
          "&:hover": {
            background: "rgb(256,256,256, 0.1)",
          },
        }}
      >
        <TableCell>
          <BodyText
            preventTransition
            whiteSpace="nowrap"
            gap={0.5}
            display="flex"
          >
            {services.sort().map((service, key) => (
              <Pill
                key={key}
                lineHeight="0.8rem"
                margin="0rem"
                padding="0 0.5rem"
                preventTransition
                bgColor={(theme) => theme.alert.title["disabled"].background}
                border="1px solid"
                borderColor={(theme) =>
                  opened
                    ? theme.alert.title["disabled"].color
                    : theme.palette.secondary.main
                }
              >
                <BodyText
                  fontSize="0.8rem"
                  color={(theme) =>
                    opened
                      ? theme.alert.title["disabled"].color
                      : theme.palette.secondary.main
                  }
                  preventTransition
                >
                  {service}
                </BodyText>
              </Pill>
            ))}
          </BodyText>
        </TableCell>

        <TableCell>
          <BodyText
            fontWeight="bold"
            preventTransition
            color={(theme) => (opened ? "grey" : theme.palette.secondary.main)}
          >
            {firstname || ""} {lastname || ""}
            <div
              style={{
                fontSize: ".8rem",
                lineHeight: ".8rem",
                fontWeight: "normal",
                fontStyle: "italic",
              }}
            >
              {company || ""}
            </div>
          </BodyText>
        </TableCell>

        <TableCell sx={{ minWidth: "300px" }}>
          <BodyText
            color={(theme) => (opened ? "gray" : theme.palette.secondary.main)}
            fontSize="1rem"
            preventTransition
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {description || ""}
          </BodyText>
        </TableCell>

        <TableCell
          sx={{
            textAlign: "center",
            display: showStatus ? "" : "none",
          }}
        >
          <BodyText
            preventTransition
            sx={{
              width: "auto",
              padding: ".2rem .5rem",
              borderRadius: "15px",
              whiteSpace: "nowrap",
              background: (theme) =>
                theme.alert.title[PROSPECT_STATES[status].severity].background,
              border: "1px solid",
              borderColor: (theme) =>
                theme.alert.title[PROSPECT_STATES[status].severity].color,
              color: (theme) =>
                theme.alert.title[PROSPECT_STATES[status].severity].color,
            }}
          >
            {PROSPECT_STATES[status].label}
          </BodyText>
        </TableCell>

        <TableCell sx={{ textAlign: "right" }}>
          <BodyText
            color={(theme) => (opened ? "gray" : theme.palette.secondary.main)}
            fontSize="1rem"
            fontStyle="italic"
            preventTransition
            whiteSpace="nowrap"
          >
            {formatDayDate({ timestamp: last_update, timezone: user.timezone })}
          </BodyText>
        </TableCell>

        <TableCell sx={{ textAlign: "right" }}>
          <BodyText
            color={(theme) => (opened ? "gray" : theme.palette.secondary.main)}
            fontSize="1rem"
            fontStyle="italic"
            preventTransition
            whiteSpace="nowrap"
          >
            {formatDayDate({ timestamp: created_at, timezone: user.timezone })}
          </BodyText>
        </TableCell>
      </TableRow>
    </>
  )
}
