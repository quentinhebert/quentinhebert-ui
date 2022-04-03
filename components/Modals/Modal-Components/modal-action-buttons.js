import { Button, DialogActions } from "@mui/material";

export const ModalActionButtons = (props) => {
  const {
    leftButtonText,
    leftButtonOnChange,
    middleButtonText,
    middleButtonOnChange,
    rightButtonText,
    rightButtonOnChange,
    rightButtonDisabled,
  } = props;
  return (
    <DialogActions sx={{ margin: "1rem" }}>
      <Button sx={{ textTransform: "inherit" }} onClick={leftButtonOnChange}>
        {leftButtonText}
      </Button>
      <Button variant="outlined" onClick={middleButtonOnChange}>
        {middleButtonText}
      </Button>
      <Button
        variant="contained"
        onClick={rightButtonOnChange}
        autoFocus
        disabled={rightButtonDisabled}
      >
        {rightButtonText}
      </Button>
    </DialogActions>
  );
};
