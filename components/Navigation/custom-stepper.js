import { Box, Step, StepButton, Stepper } from "@mui/material"

export default function CustomStepper({
  steps,
  activeStep,
  setActiveStep,
  ...props
}) {
  const handleStep = (step) => () => {
    setActiveStep(step)
  }

  return (
    <Box width="100%">
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          "& .MuiStepLabel-labelContainer": {
            color: (theme) => theme.palette.grey[800],
          },
          "& .Mui-active": {
            color: (theme) => `${theme.palette.text.secondary} !important`,
          },
          "& .Mui-completed": {
            color: (theme) => `${theme.palette.text.secondary} !important`,
          },
        }}
      >
        {steps.map((label, index) => (
          <Step key={index}>
            <StepButton
              onClick={handleStep(index)}
              sx={{
                "& .MuiStepLabel-label.Mui-active": {
                  color: (theme) => theme.palette.text.secondary,
                },
                "& .MuiStepLabel-label.Mui-completed": {
                  color: (theme) => theme.palette.text.secondary,
                },
                "&& .MuiStepIcon-text": {
                  fill: "#000 !important",
                  fontSize: "1rem",
                },
              }}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
