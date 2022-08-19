import { Stack, Typography, useMediaQuery } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React, { useState } from "react";
import { ActionButtons } from "../Modals/Modal-Components/modal-action-buttons";
import { ModalTitle } from "../Modals/Modal-Components/modal-title";
import theme from "../../config/theme";

function withConfirmAction(WrappedComponent) {
  function Enhancer(props) {
    const [actionToFire, setActionToFire] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [confirmTitle, setConfirmTitle] = useState("Confirmation");
    const [nextButtonText, setNextButtonText] = useState("Continue");
    const [confirmContent, setConfirmContent] = useState({
      text: null,
      js: null,
    });

    const closeAndcleanState = () => {
      setActionToFire(null);
      setConfirmTitle("Confirmation");
      setNextButtonText("Continue");
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

    /********** STYLE **********/
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
            sx={{ margin: "1rem auto", padding: "1rem", width: "400px" }}
          >
            {confirmContent.text ? (
              <Typography>{confirmContent.text}</Typography>
            ) : null}
            {confirmContent.js ? content.js : null}
            <ActionButtons
              middleButtonText="Cancel"
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
