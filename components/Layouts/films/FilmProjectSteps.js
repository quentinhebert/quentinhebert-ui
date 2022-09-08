import CenteredMaxWidthContainer from "../../ReusableComponents/containers/centered-max-width-container"
import BigTitle from "../../ReusableComponents/titles/big-title"
import styles from "../../../styles/TextShine.module.css"
import theme from "../../../config/theme"
import { Box, Stack, Typography } from "@mui/material"
import GradientTitleCard from "../../ReusableComponents/cards/gradient-title-card"
import BodyText from "../../ReusableComponents/text/body-text"
import * as React from "react"
import { styled } from "@mui/material/styles"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector"
import GradingIcon from "@mui/icons-material/Grading"
import VideocamIcon from "@mui/icons-material/Videocam"
import EuroIcon from "@mui/icons-material/Euro"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import StrokeText from "../../ReusableComponents/text/stroke-text"

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient( 95deg, ${theme.palette.background.secondary} 20%, ${theme.palette.background.main} 80%)`,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient( 95deg, ${theme.palette.background.secondary} 20%, ${theme.palette.background.main} 80%)`,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}))

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage: `linear-gradient(136deg, ${theme.palette.background.secondary} 20%, ${theme.palette.background.main} 80%)`,
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage: `linear-gradient( 95deg, ${theme.palette.background.secondary} 20%, ${theme.palette.background.main} 80%)`,
  }),
}))

function ColorlibStepIcon(props) {
  const { active, completed, className } = props

  const icons = {
    1: <GradingIcon />,
    2: <EuroIcon />,
    3: <VideocamIcon />,
    4: <AutoAwesomeIcon />,
  }

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
      sx={{
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.1)",
          transition: "transform 0.1s ease-in-out",
        },
      }}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  )
}

const steps = [
  {
    key: 1,
    label: "Établir vos besoins",
    title: () => (
      <>
        Écouter et établir vos <Keyword text="besoins" />
      </>
    ),
    description:
      "Nous discutons de vos attentes afin d'établir le cahier des charges.",
  },
  {
    key: 2,
    label: "Faire une proposition",
    title: () => (
      <>
        Une proposition <Keyword text="adaptée" />
      </>
    ),
    description:
      "Je vous propose un concept de vidéo qui répond à vos besoins, avec un devis personnalisé.",
  },
  {
    key: 3,
    label: "Réalisation du projet",
    title: () => (
      <>
        Réalisation du <Keyword text="projet" />
      </>
    ),
    description:
      "Je réalise le projet de A à Z : de l'écriture à la post-production, en passant par la prise de vues.",
  },
  {
    key: 4,
    label: "Retouches et rendu",
    title: () => (
      <>
        <Keyword text="Livraison" /> de la vidéo
      </>
    ),
    description:
      "Je vous livre la vidéo qui peut être modifiée jusqu'à ce qu'elle soit parfaite à vos yeux.",
  },
]

function CustomizedSteppers({ activeStep, setActiveStep }) {
  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        sx={{
          "& .MuiStepLabel-labelContainer": {
            color: (theme) => theme.palette.grey[800],
          },
          "& .MuiStepLabel-label.Mui-active": {
            color: (theme) => theme.palette.text.secondary,
          },
          "& .MuiStepLabel-label.Mui-completed": {
            color: (theme) => theme.palette.text.secondary,
          },
        }}
      >
        {steps.map((step, key) => (
          <Step key={key} onClick={(e) => setActiveStep(key)}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  )
}

const Keyword = ({ text }) => (
  <Box
    component="span"
    sx={{
      color: (theme) => theme.palette.text.secondary,
      textTransform: "uppercase",
      fontStyle: "italic",
    }}
  >
    {text}
  </Box>
)

export default function FilmProjectSteps(props) {
  const [activeStep, setActiveStep] = React.useState(0)
  return (
    <Stack padding="4rem 0" zIndex={1} position="relative">
      <CenteredMaxWidthContainer gap={4}>
        <GradientTitleCard inversed="true">
          <StrokeText color={(theme) => theme.palette.secondary.main}>
            Quatre
          </StrokeText>{" "}
          <Box component="span" className={styles.shine}>
            étapes
          </Box>
        </GradientTitleCard>
        <Stack
          sx={{
            color: "#fff",
            height: { xs: "250px", md: "500px" },
            width: { xs: "275px", md: "500px" },
            margin: "auto",
            borderRadius: "50%",
            background: (theme) =>
              `linear-gradient(100deg, ${theme.palette.background.main} 0%, rgb(0,0,0,1) 80%)`,
          }}
        >
          <Stack position="relative">
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                backgroundColor: (theme) => theme.palette.background.secondary,
                width: { xs: "30px", md: "50px" },
                height: { xs: "30px", md: "50px" },
                borderRadius: "50px",
                position: "absolute",
                top: { xs: "20px", md: "130px" },
                left: { xs: "0px", md: "50px" },
                zIndex: 2,
              }}
            >
              <Typography sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}>
                {steps[activeStep].key}
              </Typography>
            </Stack>

            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                backgroundColor: (theme) => theme.palette.background.main,
                position: "absolute",
                top: { xs: "30px", md: "150px" },
                left: { xs: "20px", md: "80px" },
                borderRadius: "5px",
                padding: { xs: "1rem", md: "1rem 2rem" },
              }}
            >
              <Typography sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}>
                {steps[activeStep].title()}
              </Typography>
            </Stack>
          </Stack>

          <Stack
            position="absolute"
            alignItems="center"
            justifyContent="center"
            sx={{
              margin: "auto",
              width: { xs: "250px", md: "500px" },
              top: { xs: "275px", md: "60%" },
            }}
          >
            <BodyText textAlign="center" sx={{ width: "75%" }}>
              {steps[activeStep].description}
            </BodyText>
          </Stack>
        </Stack>
        <CustomizedSteppers
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </CenteredMaxWidthContainer>
    </Stack>
  )
}
