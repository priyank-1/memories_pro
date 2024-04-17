import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined.js";
import useStyles from "./styles.js";
import Input from "./Input.js";
import Icon from "./icon.js";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth.js";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const classes = useStyles();
  const [showPassword, setshowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [formData, setFormData] = useState(initialState);

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setshowPassword(false);
  };

  const handleShowPassword = () =>
    setshowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const googleSuccess = async (res) => {
    const result = jwt_decode(await res?.credential);
    const token = await res?.credential;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history("/");
    } catch (error) {
      console.log(error);
    }
  };
  
  const googleFailure = (err) => {
    console.log(err);
    console.log("Google Sign In was unsuccessful.Try Again Later");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  xs={6}
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign up" : "Sign in"}
          </Button>
          <GoogleOAuthProvider clientId="571393456694-ccaft3s59m8sd0tdsr9bmrh794fu4q25.apps.googleusercontent.com">
            <GoogleLogin
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onError={googleFailure}
              cookiePolicy={"single_host_origin"}
            />
          </GoogleOAuthProvider>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account ? Sign In"
                  : "Don't have an account ? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
