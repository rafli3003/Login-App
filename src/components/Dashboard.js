import { Box, Button, Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  const alert = {
    margin: "auto",
    width: "50%",
    marginTop: "50px",
  };
  return (
    <MuiAlert sx={alert} elevation={6} ref={ref} variant="filled" {...props} />
  );
});

const Dashboard = () => {
  const button = {
    marginTop: "20px",
    justifyContent: "center",
  };
  const ColorButton = styled(Button)(() => ({
    backgroundColor: blueGrey[500],
    "&:hover": {
      backgroundColor: blueGrey[700],
    },
  }));
  const navigate = useNavigate();
  const handleLogOut = () => {
    window.location.reload(navigate("/sign-in"));
    localStorage.removeItem("TOKENPORT");
  };
  return (
    <Box>
      <Alert severity="success">Anda Telah berhasil Login</Alert>
      <Stack sx={button} spacing={2} direction="row">
        <ColorButton
          onClick={handleLogOut}
          endIcon={<LogoutIcon />}
          variant="contained"
        >
          Log Out
        </ColorButton>
      </Stack>
    </Box>
  );
};

export default Dashboard;
