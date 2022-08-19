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
import { ActionButtons } from "../Modals/Modal-Components/modal-action-buttons";

function withAddAvatar(WrappedComponent) {
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
          `Some of the pictures you have selected have a size greater than ${sizeLimit}Mo. Please select only images lower than ${sizeLimit}Mo.`
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
        setMessageSnack("Your avatar has been changed successfully");
        setSeverity("success");
        setOpenSnackBar(true);
        setOpenModal(false);
        setIsLoading(false);
        setUploadSuccess(true); // to notify lower component
      }
    };

    // SUB-COMPONENTS
    const ConfirmContent = () => {
      return (
        <DialogContent sx={{ zIndex: 1 }}>
          <DialogContentText>
            <b>Your pictures have been uploaded.</b> We are optimizing them,
            this might take few minutes. Please reload your page if the pictures
            are not visible.
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
              Close
            </Button>
          </ButtonsContainer>
        </DialogContent>
      );
    };
    const UploadingContent = () => {
      return (
        <Stack justifyContent="center" alignItems="center" direction="column">
          <h3>
            Currently uploading... ({nbOfSentFiles}/{totalSelectedFiles} images)
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
              <DialogTitle>Add photos</DialogTitle>
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
                                Drop your picture, otherwise click here to
                                upload...
                              </Typography>
                              <Typography component="span" variant="body2">
                                (the new pictures will override the active
                                selection)
                              </Typography>
                              <Typography sx={{ marginTop: "1rem" }}>
                                Selected files:
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
                              Drop your pictures or click here to upload them...
                            </Typography>
                          )}
                        </Stack>

                        <AlertInfo
                          content={{
                            text: `JPG or PNG (${sizeLimit}Mo maximum)`,
                            severity: "warning",
                          }}
                        />
                        <AlertInfo
                          content={{
                            text: "After clicking on Add, the upload of your pictures might take few minutes.",
                            severity: "info",
                          }}
                        />
                      </>
                    )}
                  </DialogContent>

                  <ActionButtons
                    middleButtonText="Cancel"
                    middleButtonOnClick={() => setOpenModal(false)}
                    rightButtonText={`Add${
                      files && files.length ? ` ${files.length} image(s)` : ``
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

export default withAddAvatar;
