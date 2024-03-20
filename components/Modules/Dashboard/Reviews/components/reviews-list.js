import { Box, Table, TableCell, TableRow } from "@mui/material"
import BodyText from "../../../../Text/body-text"
import { useContext } from "react"
import { Context } from "../module"
import { UserContext } from "../../../../../contexts/UserContext"
import { formatDayDate } from "../../../../../services/date-time"
import EditRoundedIcon from "@mui/icons-material/EditRounded"
import EditOffRoundedIcon from "@mui/icons-material/EditOffRounded"
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded"
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded"

export default function ProspectsList({ handleOpenEditModal }) {
  const { state } = useContext(Context)
  const list = state.reviews

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
              Intitulé
            </BodyText>
          </TableCell>
          <TableCell>
            <BodyText color="gray" preventTransition>
              Commentaire
            </BodyText>
          </TableCell>
          <TableCell>
            <BodyText color="gray" preventTransition>
              Note
            </BodyText>
          </TableCell>
          <TableCell>
            <BodyText color="gray" preventTransition>
              Client
            </BodyText>
          </TableCell>
          <TableCell sx={{ textAlign: "right" }}>
            <BodyText color="gray" preventTransition>
              Date
            </BodyText>
          </TableCell>
          <TableCell sx={{ textAlign: "right" }}>
            <BodyText color="gray" preventTransition>
              Modifiable
            </BodyText>
          </TableCell>
          <TableCell sx={{ textAlign: "right" }}>
            <BodyText color="gray" preventTransition>
              Visible
            </BodyText>
          </TableCell>
        </TableRow>

        {!!list?.length &&
          list.map((item, key) => (
            <ReviewRow
              key={key}
              id={item.id}
              firstname={item.firstname}
              lastname={item.lastname}
              company={item.company}
              grade={item.grade}
              description={item.description}
              label={item.label}
              created_at={item.created_at}
              editable={item.editable}
              visible={item.visible}
              handleOpenEditModal={handleOpenEditModal}
            />
          ))}
      </Table>
    </Box>
  )
}

function ReviewRow({
  index,
  id,
  firstname,
  lastname,
  company,
  label,
  description,
  grade,
  created_at,
  editable,
  visible,
  handleOpenEditModal,
}) {
  const { state, setState } = useContext(Context)
  const { user } = useContext(UserContext)

  return (
    <>
      <TableRow
        onClick={() => {
          setState({ ...state, selectedReview: { id, editable, visible } })
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
        <TableCell sx={{ minWidth: "200px" }}>
          <BodyText
            color={"gray"}
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
            {label || "-"}
          </BodyText>
        </TableCell>

        <TableCell sx={{ minWidth: "300px" }}>
          <BodyText
            color={"gray"}
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
            {description || "-"}
          </BodyText>
        </TableCell>

        <TableCell>
          <BodyText color={"gray"} fontSize="1rem" preventTransition>
            {grade || "-"}
          </BodyText>
        </TableCell>

        <TableCell sx={{ minWidth: "200px" }}>
          <BodyText fontWeight="bold" preventTransition color={"gray"}>
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

        <TableCell sx={{ textAlign: "right" }}>
          <BodyText
            color={"gray"}
            fontSize="1rem"
            fontStyle="italic"
            preventTransition
            whiteSpace="nowrap"
          >
            {formatDayDate({ timestamp: created_at, timezone: user.timezone })}
          </BodyText>
        </TableCell>

        <TableCell sx={{ textAlign: "center" }}>
          <BodyText
            color={"gray"}
            fontSize="1rem"
            fontStyle="italic"
            preventTransition
            whiteSpace="nowrap"
          >
            {editable ? (
              <EditRoundedIcon
                sx={{ color: (theme) => theme.alert.title.success.color }}
              />
            ) : (
              <EditOffRoundedIcon
                sx={{ color: (theme) => theme.alert.title.error.color }}
              />
            )}
          </BodyText>
        </TableCell>

        <TableCell sx={{ textAlign: "center" }}>
          <BodyText
            color={"gray"}
            fontSize="1rem"
            fontStyle="italic"
            preventTransition
            whiteSpace="nowrap"
          >
            {visible ? (
              <VisibilityRoundedIcon
                sx={{ color: (theme) => theme.alert.title.success.color }}
              />
            ) : (
              <VisibilityOffRoundedIcon
                sx={{ color: (theme) => theme.alert.title.error.color }}
              />
            )}
          </BodyText>
        </TableCell>
      </TableRow>
    </>
  )
}
