import React, { useRef } from "react"
import { Box, Button, Slide, Stack, Typography } from "@mui/material"
import SaveAltIcon from "@mui/icons-material/SaveAlt"
import theme from "../../../config/theme"
import BigTitle from "../../sections/big-title"

export default function FilmsExperiencePart(props) {
  const {} = props

  return (
    <>
      <Stack
        sx={{
          backgroundImage: "url(/medias/exp-film-bg-2.svg)",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          height: { xs: "550px", sm: "700px", md: "800px" },
        }}
      >
        <Slide direction="right" {...{ timeout: 1000 }} in>
          <Stack width="100%" alignItems="start">
            <Stack
              width="75%"
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
              <BigTitle
                title="Exp ."
                color={theme.palette.text.secondary}
                fontFamily="Ethereal"
              />
              <Typography
                fontFamily="Ethereal"
                sx={{
                  alignSelf: "start",
                  color: (theme) => theme.palette.text.secondaryDark,
                  width: { xs: "95%", sm: "80%", md: "80%" },
                  fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
                  letterSpacing: { xs: 0.25, sm: 1, md: 2 },
                  lineHeight: { xs: "1.3rem", sm: "1.5rem", md: "2rem" },
                  fontWeight: "bold",
                  marginBottom: { xs: "1.5rem", md: "3rem" },
                }}
              >
                D'abord pris de passion pour la réalisation de courts-métrages,
                j'apprends rapidement à diriger une équipe de tournage amateure.
                <p />
                Je prends goût à tous les corps du métier, mais c'est dans la
                direction photographique, le cadrage et le montage que je me
                sens le plus créatif.
                <p />
                Je réalise rapidement mes premiers clips musicaux et
                événementiels.
              </Typography>

              <Button
                variant="outlined"
                sx={{
                  color: theme.palette.text.primaryLight,
                  fontFamily: "Ethereal",
                  textTransform: "initial",
                  fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
                  fontWeight: "bold",
                  letterSpacing: { xs: "0.5px", md: "1.5px" },
                  border: `2px solid ${theme.palette.text.primaryLight}`,
                }}
                startIcon={<SaveAltIcon />}
              >
                Télécharger mon CV
              </Button>
            </Stack>
          </Stack>
        </Slide>

        <Slide direction="left" {...{ timeout: 1000 }} in>
          <Box
            sx={{
              backgroundImage: "url(/medias/prout.png)",
              backgroundSize: "cover",
              backgroundPosition: "0% 50%",
              position: "absolute",
              right: 0,
              width: "50%",
              height: { xs: "500px", md: "900px" },
              mixBlendMode: "multiply",
            }}
          />
        </Slide>
      </Stack>
    </>
  )
}
