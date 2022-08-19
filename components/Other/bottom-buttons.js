import { Button, DialogActions } from "@mui/material";

export const BottomButtons = (props) => {
  const {
    cancelOnChange,
    mainButtonDisabled,
    mainButtonText,
    mainButtonOnClick,
  } = props;
  return (
    <DialogActions sx={{ marginTop: "1rem" }}>
      <Button variant="outlined" onClick={cancelOnChange}>
        Cancel
      </Button>
      <Button
        variant="contained"
        onClick={mainButtonOnClick}
        autoFocus
        disabled={mainButtonDisabled}
      >
        {mainButtonText}
      </Button>
    </DialogActions>
  );
};
