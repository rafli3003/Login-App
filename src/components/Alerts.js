import React, { useState } from "react";
import { Alert, Snackbar, Stack } from "@mui/material";

const Alerts = ({ showAlert, setShowAlert, alertMessage }) => {
  const [snackBar] = useState({ vertical: "bottom", horizontal: "center" });
  const handleClose = () => setShowAlert(false);

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Snackbar
        anchorOrigin={snackBar}
        open={showAlert}
        onClose={handleClose}
        key={snackBar}
        autoHideDuration={2000}
      >
        <Alert variant="filled" severity="error">
          {alertMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Alerts;
