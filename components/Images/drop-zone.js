import { Box, Grid, Stack } from "@mui/material"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import FileUploadIcon from "@mui/icons-material/FileUpload"
import BodyText from "../Text/body-text"

export default function Dropzone({
  bgImage,
  detachBgImage,
  files,
  setFiles,
  hidden,
  ...props
}) {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the file
    const filesArray = acceptedFiles.map((oneFile) => {
      oneFile.URL = URL.createObjectURL(oneFile)
      return oneFile
    })
    setFiles(filesArray)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  })

  const removeSelectedFile = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setFiles([])
  }

  return (
    <Stack
      {...getRootProps()}
      justifyContent="center"
      alignItems="center"
      width="100%"
      minHeight="200px"
      height="100%"
      borderRadius="5px"
      position="relative"
      overflow="hidden"
      sx={{
        cursor: "pointer",
        border: (theme) => `1px solid ${theme.palette.secondary.main}`,
        "&:hover": {
          "&& > .MuiBox-root": {
            transition: "filter 0.1s ease-in-out",
            filter: "blur(100px)",
          },
        },
      }}
    >
      <input {...getInputProps()} />

      <Stack
        zIndex={1}
        alignItems="center"
        sx={{
          textShadow: "2px 4px 10px rgba(0,0,0,0.87)",
        }}
      >
        {!!files.length ? (
          <>
            <BodyText textAlign="center">
              Glissez-déposez ou cliquez pour ajouter
              <Stack
                component="a"
                onClick={removeSelectedFile}
                sx={{
                  "&:hover": {
                    color: (theme) =>
                      `${theme.palette.text.secondary} !important`,
                  },
                }}
                {...props}
              >
                Supprimer la sélection
              </Stack>
            </BodyText>
            <Grid container spacing={1} padding={1}>
              {files.map((file) => (
                <Grid item xs={6} md={4} lg={3} xl={2}>
                  <Box
                    component="img"
                    src={URL.createObjectURL(file)}
                    width="100%"
                    height="100%"
                    sx={{ aspectRatio: 1, objectFit: "cover" }}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <>
            <BodyText textAlign="center">
              Glissez-déposez ou cliquez pour ajouter
            </BodyText>
            <FileUploadIcon
              sx={{
                fontSize: "3rem",
                color: "#fff",
                filter: "drop-shadow(2px 4px 10px rgba(0,0,0,0.87))",
              }}
            />
            {bgImage && detachBgImage && (
              <BodyText textAlign="center">
                <Stack
                  component="a"
                  onClick={detachBgImage}
                  sx={{
                    "&:hover": {
                      color: (theme) =>
                        `${theme.palette.text.secondary} !important`,
                    },
                  }}
                  {...props}
                >
                  Supprimer la vignette actuelle
                </Stack>
              </BodyText>
            )}
          </>
        )}
      </Stack>
    </Stack>
  )
}
