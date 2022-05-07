import { Button, DialogActions } from "@mui/material";

export const ActionButtons = (props) => {
  const {
    leftButtonText,
    leftButtonOnClick,
    middleButtonText,
    middleButtonOnClick,
    rightButtonText,
    rightButtonOnClick,
    rightButtonDisabled,
    rightButtonSubmit,
    rightBgColor,
    rightColor,
  } = props;
  return (
    <DialogActions>
      {leftButtonText && leftButtonOnClick ? (
        <Button sx={{ textTransform: "inherit" }} onClick={leftButtonOnClick}>
          {leftButtonText}
        </Button>
      ) : null}
      {middleButtonText && middleButtonOnClick ? (
        <Button variant="outlined" onClick={middleButtonOnClick}>
          {middleButtonText}
        </Button>
      ) : null}
      <Button
        variant="contained"
        onClick={rightButtonOnClick}
        disabled={rightButtonDisabled}
        type={rightButtonSubmit ? "submit" : null}
        sx={{
          color: rightColor || null,
          backgroundColor: rightBgColor || null,
        }}
      >
        {rightButtonText}
      </Button>
    </DialogActions>
  );
};
