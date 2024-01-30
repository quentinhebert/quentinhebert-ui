import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded"
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded"
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded"
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined"
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined"

export const PROSPECT_STATES = {
  ALL: {
    severity: "disabled2",
    label: "Tous les prospects",
    icon: <SubjectOutlinedIcon fontSize="inherit" />,
  },
  REQUEST: {
    severity: "warning",
    label: "1er contact reçu",
    icon: <MarkEmailUnreadOutlinedIcon fontSize="inherit" />,
  },
  DRAFT: {
    severity: "disabled",
    label: "Non contacté(e)",
    icon: <HourglassTopRoundedIcon fontSize="inherit" />,
  },
  CONTACTED: {
    severity: "warning",
    label: "1er contact émis",
    icon: <ForwardToInboxRoundedIcon fontSize="inherit" />,
  },
  AWAITING: {
    severity: "info",
    label: "Discussion en cours",
    icon: <ChatBubbleOutlineOutlinedIcon fontSize="inherit" />,
  },
  CONVERTED: {
    severity: "success",
    label: "Converti(e)",
    icon: <CheckCircleOutlineRoundedIcon fontSize="inherit" />,
  },
  CANCELED: {
    severity: "error",
    label: "Abandonné(e)",
    icon: <CloseRoundedIcon fontSize="inherit" />,
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
