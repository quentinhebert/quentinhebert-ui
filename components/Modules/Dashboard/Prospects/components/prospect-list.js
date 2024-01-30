import { Box, Table, TableCell, TableRow } from "@mui/material"
import BodyText from "../../../../Text/body-text"
import { useContext } from "react"
import { Context } from "../module"
import PROSPECT_STATES, {
  PROSPECT_STATES_ENUM,
} from "../../../../../enums/prospectStates"
import { UserContext } from "../../../../../contexts/UserContext"
import Pill from "../../../../Text/pill"
import { formatDayDate } from "../../../../../services/date-time"

export default function ProspectsList({ handleOpenEditModal }) {
  const { state } = useContext(Context)

  const status = PROSPECT_STATES_ENUM[state.tab]
  const list =
    status === "ALL"
      ? state.prospects
      : state.prospects.filter((p) => p.status === status)
  const showStatus = status === "ALL"

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
              showStatus={showStatus}
              opened={item.opened}
              created_at={item.created_at}
              last_update={item.last_update}
              handleOpenEditModal={handleOpenEditModal}
            />
          ))}
      </Table>
    </Box>
  )
}

function ProspectRow({
  index,
  id,
  status,
  firstname,
  lastname,
  company,
  description,
  services,
  showStatus,
  opened,
  created_at,
  last_update,
  handleOpenEditModal,
}) {
  const { state, setState } = useContext(Context)
  const user = useContext(UserContext)
  return (
    <>
      <TableRow
        onClick={() => {
          setState({ ...state, selectedProspectId: id })
          handleOpenEditModal()
        }}
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

        <TableCell sx={{ minWidth: "200px" }}>
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
