import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import withSnacks from "./withSnacks";
import AlertInfo from "../Other/alert-info";
import apiCall from "../../services/apiCalls/apiCall";
import { ModalActionButtons } from "../Modals/Modal-Components/modal-action-buttons";

function withAddNewPhotos(WrappedComponent) {
  function Enhancer(props) {
    const { user, refresh, setMessageSnack, setOpenSnackBar, setSeverity } =
      props;
    const [showConfirmMessage, setShowConfirmMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [files, setFiles] = useState([]);
    const [nbOfSentFiles, setNbOfSentFiles] = useState(0);
    const [totalSelectedFiles, setTotalSelectedFiles] = useState(0);

    // Max size limit is set to 20Mo if its an upload to a galery, otherwise the size limit is increased up to 50Mo if it's an upload to an album
    const sizeLimit = 6;

    const onDrop = useCallback((acceptedFiles) => {
      // Do something with the file
      const filesArray = acceptedFiles.map((oneFile) => {
        oneFile.URL = URL.createObjectURL(oneFile);
        return oneFile;
      });
      setFiles(filesArray);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
    });

    const handleSetPhotos = async (event) => {
      event.stopPropagation();
      setIsLoading(true);
      // Check max size limit whether its an album or a galery
      if (files.some((file) => file.size > sizeLimit * 1000 * 1000)) {
        setMessageSnack(
          `Certaines des photos que vous avez sélectionnées ont une taille supérieure à ${sizeLimit}Mo. Veuillez uniquement sélectionner des photos inférieures à ${sizeLimit}Mo.`
        );
        setSeverity("error");
        setOpenSnackBar(true);
        setIsLoading(false);
        return;
      }
      // Set the total files number in modal (progress count => 0/total photos... etc)
      setTotalSelectedFiles(files.length);
      // let processedIndexes = [];
      let formData = new FormData();
      // TODO: Limit the user (UX) to select only one file from drag and click
      formData.append("avatar", files[0]); // We will take the first of the list
      const res = await apiCall.users.updateAvatar({ formData, user });
      if (res && res.ok) {
        setMessageSnack("Votre avatar a été mis à jour avec succès");
        setSeverity("success");
        setOpenSnackBar(true);
        setOpenModal(false);
        setIsLoading(false);
        setUploadSuccess(true); // to notify lower component
      }
      // const upload = await Promise.all(
      // files.map(async (file, index) => {
      //   const up = await apiCall.users.updateAvatar(albumInfo.id, file);
      //   if (up && up.status === 202) {
      //     processedIndexes.push(index);
      //     setNbOfSentFiles(processedIndexes.length);
      //   } else {
      //     setMessageSnack(
      //       `Un problème est survenu avec le téléchargement de la photo ${file.name}...`
      //     );
      //     setSeverity("error");
      //     setOpenSnackBar(true);
      //   }
      // })
      // );
      // if (upload) {
      //   setMessageSnack("succès");
      //   setSeverity("success");
      //   setOpenSnackBar(true);
      //   setIsLoading(false);
      //   setShowConfirmMessage(true);
      //   setNbOfSentFiles(0);
      //   processedIndexes = [];
      // }
    };

    // SUB-COMPONENTS
    const ConfirmContent = () => {
      return (
        <DialogContent sx={{ zIndex: 1 }}>
          <DialogContentText>
            <b>Vos photos ont été téléchargées.</b> Nous sommes en train de les
            redimensionner et de les optimiser, cela peut prendre un peu de
            temps. Veuillez rafraîchir la page si elles n'apparaissent pas tout
            de suite.
          </DialogContentText>
          <ButtonsContainer>
            <Button
              onClick={() => {
                setOpenModal(false);
                setShowConfirmMessage(false);
                setTimeout(() => {
                  refresh();
                }, 1500);
              }}
            >
              Fermer
            </Button>
          </ButtonsContainer>
        </DialogContent>
      );
    };
    const UploadingContent = () => {
      return (
        <Stack justifyContent="center" alignItems="center" direction="column">
          <h3>
            Téléchargement en cours... ({nbOfSentFiles}/{totalSelectedFiles}{" "}
            photos)
          </h3>
          <CircularProgress style={{ margin: "20px 0 40px 0" }} />
        </Stack>
      );
    };

    return (
      <>
        <WrappedComponent
          {...props}
          setOpenAddNewPhotosModal={setOpenModal}
          uploadSuccess={uploadSuccess}
        />

        {openModal ? (
          <>
            <Dialog open={openModal} onClose={() => setOpenModal(false)}>
              <DialogTitle>Modifier mes photos</DialogTitle>
              {showConfirmMessage ? (
                <ConfirmContent />
              ) : (
                <>
                  <DialogContent>
                    {isLoading ? (
                      <UploadingContent />
                    ) : (
                      <>
                        <Stack
                          {...getRootProps()}
                          flexDirection="column"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            minHeight: "100px",
                            border: `solid 1px #fff`,
                            borderRadius: "5px",
                            cursor: "pointer",
                            padding: "1rem",
                          }}
                        >
                          <input {...getInputProps()} />

                          {files && files.length ? (
                            <>
                              <Typography component="span" variant="h6">
                                Déposez vos photos ou cliquez ici pour
                                ajouter...
                              </Typography>
                              <Typography component="span" variant="body2">
                                (les nouvelles photos sélectionnées écraseront
                                la sélection active)
                              </Typography>
                              <Typography sx={{ marginTop: "1rem" }}>
                                Fichiers sélectionnés :
                              </Typography>
                              {files.map((file, key) => {
                                return (
                                  <Typography
                                    component="span"
                                    variant="body1"
                                    key={key}
                                  >
                                    {file.name}
                                  </Typography>
                                );
                              })}
                            </>
                          ) : (
                            <Typography component="span" variant="h6">
                              Déposez vos photos ou cliquez ici pour ajouter...
                            </Typography>
                          )}
                        </Stack>

                        <AlertInfo
                          content={{
                            text: `JPG ou PNG (${sizeLimit}Mo maximum)`,
                            severity: "warning",
                          }}
                        />
                        <AlertInfo
                          content={{
                            text: "Après avoir cliqué sur Ajouter, le téléchargement complet de vos photos peut prendre plusieurs minutes.",
                            severity: "info",
                          }}
                        />
                      </>
                    )}
                  </DialogContent>

                  <ModalActionButtons
                    middleButtonText="Annuler"
                    middleButtonOnClick={() => setOpenModal(false)}
                    rightButtonText={`Ajouter${
                      files && files.length ? ` ${files.length} photo(s)` : ``
                    }`}
                    rightButtonOnClick={handleSetPhotos}
                    rightButtonDisabled={!(files && files.length)}
                  />
                </>
              )}
            </Dialog>
          </>
        ) : null}
      </>
    );
  }
  return withSnacks(Enhancer);
}

export default withAddNewPhotos;
