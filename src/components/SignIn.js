import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignIn({ setToken }) {
  const [pwdType, setPwdType] = useState("password");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    let user = {
      email: values.email,
      password: values.password,
    };
    await axios
      .post("http://localhost:7000/auth/login", user)
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          navigate("/");
          setToken(res.data.data.token);
          localStorage.setItem(
            "TOKENPORT",
            JSON.stringify(res.data.data.token)
          );
        }
      })
      .catch((err) => {
        if (typeof err.response.data == "string") {
          Swal.fire("Too Many Request", err.response.data, "error");
        } else if (err.response.data.type === "NOT_FOUND") {
          Swal.fire("Login Failed", err.response.data.message, "error");
        }
      });
  };
  const showPwd = () => {
    if (pwdType === "password") {
      setPwdType("text");
    } else {
      setPwdType("password");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "text.secondary" }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={pwdType}
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
            <FormControlLabel
              control={
                <Checkbox onClick={showPwd} value="remember" color="primary" />
              }
              label="Show password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
