import { Stack, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React, { useState } from "react";
import { ModalActionButtons } from "../Modals/Modal-Components/modal-action-buttons";
import { ModalTitle } from "../Modals/Modal-Components/modal-title";

function withConfirmAction(WrappedComponent) {
  function Enhancer(props) {
    const [actionToFire, setActionToFire] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [confirmTitle, setConfirmTitle] = useState("Confirmer");
    const [nextButtonText, setNextButtonText] = useState("Continuer");
    const [confirmContent, setConfirmContent] = useState({
      text: null,
      js: null,
    });

    const closeAndcleanState = () => {
      setActionToFire(null);
      setConfirmTitle("Confirmer");
      setNextButtonText("Continuer");
      setConfirmContent({ text: null, js: null });
      setOpenModal(false);
    };

    const handleCancel = (e) => {
      e.preventDefault();
      closeAndcleanState();
    };

    const handleNext = async (e) => {
      e.preventDefault();
      actionToFire();
      closeAndcleanState();
    };

    return (
      <>
        <WrappedComponent
          {...props}
          setActionToFire={setActionToFire}
          setOpenConfirmModal={setOpenModal}
          setConfirmTitle={setConfirmTitle}
          setNextButtonText={setNextButtonText}
          setConfirmContent={setConfirmContent}
        />

        <Dialog
          open={
            !!(
              openModal &&
              nextButtonText &&
              (confirmContent.js || confirmContent.text)
            )
          }
          onClose={() => setOpenModal(false)}
          fullScreen={fullScreen}
          sx={{
            ".MuiPaper-root": { bgcolor: "#000" },
          }}
        >
          <ModalTitle text={confirmTitle} />

          <Stack
            alignItems="center"
            justifyContent="center"
            gap={2}
            sx={{ margin: "1rem auto", width: "400px" }}
          >
            {confirmContent.text ? (
              <Typography>{confirmContent.text}</Typography>
            ) : null}
            {confirmContent.js ? content.js : null}
            <ModalActionButtons
              middleButtonText="Annuler"
              middleButtonOnClick={handleCancel}
              rightButtonText={nextButtonText}
              rightButtonOnClick={handleNext}
            />
          </Stack>
        </Dialog>
      </>
    );
  }

  return Enhancer;
}

export default withConfirmAction;
