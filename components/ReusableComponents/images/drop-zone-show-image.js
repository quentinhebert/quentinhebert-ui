import { Box, Stack } from "@mui/material"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import BodyText from "../text/body-text"
import FileUploadIcon from "@mui/icons-material/FileUpload"

export default function DropzoneShowImage({
  bgImage,
  detachBgImage,
  file,
  setFile,
  hidden,
  ...props
}) {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the file
    const filesArray = acceptedFiles.map((oneFile) => {
      oneFile.URL = URL.createObjectURL(oneFile)
      return oneFile
    })
    setFile(filesArray[0])
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  })

  const removeSelectedFile = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setFile(null)
  }

  return (
    <Stack
      {...getRootProps()}
      justifyContent="center"
      alignItems="center"
      width="100%"
      minHeight="200px"
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

      <Box
        sx={{
          visibility: hidden ? "hidden" : "visible",
          width: "100%",
          height: "100%",
          position: "absolute",
          background: file
            ? `url(${file.URL})`
            : bgImage
            ? `url(${bgImage})`
            : "#282828",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      />

      <Stack
        zIndex={1}
        alignItems="center"
        sx={{
          textShadow: "2px 4px 10px rgba(0,0,0,0.87)",
        }}
      >
        {file ? (
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
