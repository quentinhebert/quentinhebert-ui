import { Stack, Tooltip } from "@mui/material"
import { ADD_EDIT_ENUM } from "../../enums/modesEnum"
import AddIcon from "@mui/icons-material/Add"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import BodyText from "../Text/body-text"

export default function AddEditToggle({ mode, setMode, ...props }) {
  return (
    <Stack
      color="#fff"
      className="row"
      gap={2}
      alignItems="center"
      sx={{
        ...props.sx,
        border: `1px solid grey`,
        borderRadius: "30px",
        overflow: "hidden",
      }}
    >
      <Stack
        onClick={() => setMode(ADD_EDIT_ENUM.ADD)}
        className="half-width pointer row flex-center opacity-hover"
        sx={{
          padding: ".5rem 1rem",
          gap: 1,
          background:
            mode === ADD_EDIT_ENUM.ADD
              ? (theme) => theme.palette.text.secondary
              : "",
        }}
      >
        <AddIcon />
        <BodyText color="inherit" preventTransition>
          Ajouter
        </BodyText>
      </Stack>

      <Stack
        onClick={() => setMode(ADD_EDIT_ENUM.EDIT)}
        className="half-width pointer row flex-center opacity-hover"
        sx={{
          padding: ".5rem 1rem",
          gap: 1,
          background:
            mode === ADD_EDIT_ENUM.EDIT
              ? (theme) => theme.palette.text.secondary
              : "",
        }}
      >
        <BodyText color="inherit" preventTransition>
          Modifier
        </BodyText>
        <ModeEditIcon />
      </Stack>
    </Stack>
  )
}
