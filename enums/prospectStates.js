import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded"
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded"
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded"
import MarkEmailUnreadRoundedIcon from "@mui/icons-material/MarkEmailUnreadRounded"
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"

export const PROSPECT_STATES = {
  ALL: {
    severity: "disabled2",
    label: "Tout",
  },
  REQUEST: {
    severity: "warning",
    label: "Demande de contact (reçue)",
    icon: <MarkEmailUnreadRoundedIcon />,
  },
  DRAFT: {
    severity: "disabled",
    label: "Non contacté(e)",
    icon: <HourglassTopRoundedIcon />,
  },
  CONTACTED: {
    severity: "warning",
    label: "Demande de contact (émise)",
    icon: <ForwardToInboxRoundedIcon />,
  },
  AWAITING: {
    severity: "info",
    label: "Discussion en cours",
    icon: <ChatBubbleRoundedIcon />,
  },
  CONVERTED: {
    severity: "success",
    label: "Converti(e)",
    icon: <CheckCircleOutlineRoundedIcon />,
  },
  CANCELED: {
    severity: "error",
    label: "Abandonné(e)",
    icon: <CloseRoundedIcon />,
  },
}

export const PROSPECT_STATES_ENUM = [
  "ALL",
  "DRAFT",
  "REQUEST",
  "CONTACTED",
  "AWAITING",
  "CONVERTED",
  "CANCELED",
]

export default PROSPECT_STATES
