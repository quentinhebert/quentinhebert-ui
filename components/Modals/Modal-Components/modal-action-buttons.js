import { Button, DialogActions } from "@mui/material";

export const ModalActionButtons = (props) => {
  const {
    leftButtonText,
    leftButtonOnClick,
    middleButtonText,
    middleButtonOnClick,
    rightButtonText,
    rightButtonOnClick,
    rightButtonDisabled,
    rightButtonSubmit,
  } = props;
  return (
    <DialogActions>
      <Button sx={{ textTransform: "inherit" }} onClick={leftButtonOnClick}>
        {leftButtonText}
      </Button>
      <Button variant="outlined" onClick={middleButtonOnClick}>
        {middleButtonText}
      </Button>
      <Button
        variant="contained"
        onClick={rightButtonOnClick}
        disabled={rightButtonDisabled}
        type={rightButtonSubmit ? "submit" : null}
      >
        {rightButtonText}
      </Button>
    </DialogActions>
  );
};
