import React, { useRef } from "react"
import { Box, Button, Slide, Stack, Typography } from "@mui/material"
import SaveAltIcon from "@mui/icons-material/SaveAlt"

export default function FilmsExperiencePart(props) {
  const {} = props

  return (
    <>
      <Stack
        sx={{
          backgroundImage: "url(/medias/Untitled.png)",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          height: { xs: "600px", md: "900px" },
        }}
      >
        <Slide direction="left" {...{ timeout: 1000 }} in>
          <Stack width="100%" alignItems="start">
            <Stack
              width="80%"
              alignItems="start"
              sx={{
                padding: {
                  xs: "1rem",
                  sm: "2rem",
                  md: "2rem 4rem",
                  lg: "4rem",
                },
              }}
            >
              <Typography
                variant="h1"
                fontFamily="Ethereal"
                fontWeight="bold"
                textAlign="start"
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                  fontSize: {
                    xs: "4.5rem",
                    sm: "12vw",
                  },
                  lineHeight: {
                    xs: "5rem",
                    md: "10rem",
                    lg: "13rem",
                    xl: "17rem",
                  },
                  zIndex: 0,
                  padding: {
                    xs: "1.5rem 1rem 1rem 0",
                    sm: "1.5rem 1rem 1rem 0",
                    md: "1.5rem 5rem 1rem 0",
                  },
                }}
              >
                Exp .
              </Typography>
              <Typography
                fontFamily="Arial"
                marginBottom="3rem"
                sx={{
                  alignSelf: "start",
                  color: (theme) => theme.palette.text.secondaryDark,
                  width: { xs: "95%", sm: "80%", md: "70%" },
                  fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
                  letterSpacing: { xs: 0.25, sm: 1, md: 2 },
                  lineHeight: { xs: "1.3rem", sm: "1.5rem", md: "2rem" },
                }}
              >
                D'abord pris de passion pour la réalisation de courts-métrages,
                j'apprends rapidement à diriger une équipe de tournage amateure.
                <br />
                <br />
                Je prends goût à tous les corps du métier, mais c'est dans la
                direction photographique, le cadrage et le montage que je me
                sens le plus créatif.
                <br />
                <br />
                Je réalise rapidement mes premiers clips musicaux et
                événementiels.
              </Typography>

              <Button
                variant="contained"
                color="secondary"
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  letterSpacing: "1.2px",
                }}
                startIcon={<SaveAltIcon />}
              >
                Télécharger mon CV
              </Button>
            </Stack>
          </Stack>
        </Slide>

        <Box
          sx={{
            backgroundImage: "url(/medias/prout.png)",
            backgroundSize: "cover",
            backgroundPosition: "0% 50%",
            position: "absolute",
            right: 0,
            width: "50%",
            height: { xs: "700px", md: "900px" },
            mixBlendMode: "multiply",
          }}
        />
      </Stack>
    </>
  )
}
