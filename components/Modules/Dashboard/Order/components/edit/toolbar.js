import { Stack } from "@mui/material"
import BodyText from "../../../../../Text/body-text"
import { useContext } from "react"
import { Context, MODES } from "../../module"
import PillButton from "../../../../../Buttons/pill-button"
import { useRouter } from "next/router"

export default function Toolbar() {
  const { state, setState, handleSave } = useContext(Context)

  const router = useRouter()

  return (
    <Stack
      width="100%"
      sx={{
        position: "-webkit-sticky",
        position: "sticky",
        top: 50,
        background: "#000",
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
      <Stack flexGrow={1} />
      <Stack className="row" alignItems="center" gap={2}>
        <BodyText
          preventTransition
          fontSize="1rem"
          color={(theme) => theme.palette.text.secondary}
          className="cool-button pointer"
          onClick={() => {
            if (!state.order.id)
              return router.push("/dashboard?active_tab=orders")
            setState({ ...state, orderToUpdate: {}, mode: MODES.READONLY })
          }}
        >
          Annuler
        </BodyText>
        <PillButton onClick={handleSave}>Enregistrer</PillButton>
      </Stack>
    </Stack>
  )
}
