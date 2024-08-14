import React from "react";
import { signin } from "../../services/AuthService";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";

function Login() {
  const googleOauth2Handler = () => {
    window.location.href = "https://urcarcher-local.kro.kr:8443/oauth2/authorization/google"
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const username = data.get("username");
    const password = data.get("password");
    
    signin({ memberId: username, password: password });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
        </Grid>
      </Grid>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="패스워드"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              로그인
            </Button>
          </Grid>
        </Grid>
      </form>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" onClick={googleOauth2Handler}>
              Google 로그인
            </Button>
          </Grid>
    </Container>
  );
}

export default Login;
