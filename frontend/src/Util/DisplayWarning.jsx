import {
  Snackbar,
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

export const DisplayInfo = (props) =>{
  const {
    displayMessage,
    displaySuccess,
    displayWarning,
    successMessage,
    failedMessage,
    WarningMessage,
    handleCloseMessage,
  } = props
  let alertMessage;
  if (displaySuccess) {
    alertMessage = (
      <MuiAlert elevation={6} variant="filled" onClose={handleCloseMessage} severity="success">
        {successMessage}
      </MuiAlert>
    )
  }
  else if (!displaySuccess && !displayWarning) {
    alertMessage = (
      <MuiAlert elevation={6} variant="filled" onClose={handleCloseMessage} severity="error">
        {failedMessage}
      </MuiAlert>
    )
  }
  else if (!displaySuccess && displayWarning) {
    alertMessage = (
      <MuiAlert elevation={6} variant="filled" onClose={handleCloseMessage} severity="warning">
        {WarningMessage}
      </MuiAlert>
    )
  }
  return (
    <Snackbar
      open={displayMessage}
      autoHideDuration={4000}
      onClose={handleCloseMessage}
    >
      {alertMessage}
    </Snackbar>
  )
}