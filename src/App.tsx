import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

import { Redirect } from "react-router";
import { connect } from "react-redux";
import { authenticate, isAuthenticated } from "./actions/actions";

import Image from "./assets/images/login_bg.jpg"; // Import using relative path

const mapStateToProps = (state: any) => {
  console.log("this is the state", state);

  return {
    username: state.loginReducer.username,
    password: state.loginReducer.password,
    authToken: state.loginReducer.authToken,
    authError: state.loginReducer.authError,
    isLoggedIn: state.loginReducer.isLoggedIn,
    isLoggedOut: state.loginReducer.isLoggedOut,
    isCustInfoLoaded: state.loginReducer.isCustInfoLoaded,
    data: state.loginReducer.data, // session data - TODO rename it to sessionData to avoid confusion
    getCustomer: state.loginReducer.getCustomer, // get customer info when searching for it in dashboard
    isAuthenticated: state.loginReducer.data?.sessionInfo?.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    // same effect
    authCredentials: (username: string, password: string) =>
      dispatch(authenticate(username, password)),

    checkIfAgentAuthenticated: () => dispatch(isAuthenticated())
  };
};

interface AuthCallbackProperties {
  authCredentials: Function;
}

// default style hook from material-ui
const styles = (theme: any) => ({
  textField: {
    [`& fieldset`]: {
      borderRadius: 0
    }
  },
  paperContainer: {
    backgroundImage: `url(${Image})`
  },
  loginTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    textAlign: "center",
    background: "#39749B",
    height: "60px",
    minWidth: "444px",
    padding: "20px",
    margin: "0px 0px 20px 0px"
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "yellow",
    color: "black",
    fontWeight: "bold",
    borderRadius: "0",
    height: "50px"
  },
  error: {
    color: "#F44336",
    textAlign: "left"
  },
  loginDashboardTitle: {
    color: "white",
    textAlign: "center",
    fontSize: "48px",
    margin: "20px 0px -50px 0px"
  }
});

export class App extends React.Component<any, any> {
  state = {
    username: "",
    password: "",
    usernameError: false,
    passwordError: false,
    authError: "",
    isLoggedIn: false,
    isLoggedOut: false,
    isCustInfoLoaded: false
  };

  componentDidMount() {
    try {
      this.getAuthenticationStatus().then((data: any) =>
        console.log(
          "got here in componentDidMount of App.tsx: getAuthenticationStatus()",
          this.props
        )
      );
    } catch (err) {
      console.log("Error getting authentication status");
    } finally {
      console.log("Finally block get authentication status");
    }
  }

  setCookie(cname: string, cvalue: string, minutes: number) {
    var d = new Date();
    d.setTime(d.getTime() + minutes * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  async handleChange(e: any, type: any) {
    const value = e.target.value;

    if (type === "password") await this.setState({ password: value });

    if (type === "username") await this.setState({ username: value });

    if (type === "password") {
      if (this.state.password.length === 0)
        await this.setState({ passwordError: true });
      else await this.setState({ passwordError: false });
    }

    if (type === "username") {
      if (this.state.username.length === 0)
        await this.setState({ usernameError: true });
      else await this.setState({ usernameError: false });
    }
  }

  async handleLogin(e: any) {
    console.log(this.state);
    e.preventDefault();

    if (this.state.password.length === 0)
      this.setState({ passwordError: true });

    if (this.state.username.length === 0)
      this.setState({ usernameError: true });

    // test code to check login credentials - use try catch when API is ready
    /* As suggested by the business and Peter, trim leading and trailing spaces
    from username and passwd before auth API call */
    // fire API call to authenticate here and based on it's success or failure, state will be set
    try {
      const response = await this.props.authCredentials(
        this.state.username,
        this.state.password
      );
      console.log(response);
    } catch (err) {
      console.log("error hitting graphql endpoint");
    } finally {
      console.log("in finally block");
    }

    const { data } = this.props;

    // dispatch login complete action here and set the auth token in the session cookie
    if (data?.newSessionStaffauth?.result === "GOOD") {
      // TODO dispatch action here which will set global state

      // set auth token in cookie. Can get rid of this logic and save this in redux state
      this.setCookie("stok", data.newSessionStaffauth.stok, 15);
      await this.setState({ isLoggedOut: false });
      await this.setState({ isLoggedIn: true });
    } else {
      // dispatch action here which will set state
      await this.setState({ authError: data?.newSessionStaffauth?.result });
    }

    // update authentication status here
    try {
      this.getAuthenticationStatus().then((data: any) =>
        console.log("got here", this.props)
      );
    } catch (err) {
      console.log(
        "Error getting auth status post login in App.tsx: handleLogin()"
      );
    } finally {
      console.log("finally block of get auth status in handleLogin()");
    }
    // alert(this.props.isAuthenticated);
  }

  getAuthenticationStatus() {
    const { checkIfAgentAuthenticated } = this.props;
    try {
      return checkIfAgentAuthenticated();
      // return response;
    } catch (err) {
      console.log("Error calling isAuthenticated API");
    } finally {
      console.log("getAuthenticationStatus finally block");
    }
  }

  render() {
    const { classes } = this.props as any;

    // console.log(
    //   "Checking if agent is authenticated",
    //   this.getAuthenticationStatus(),
    //   this.state
    // );

    // TODO check this.props.isAuthenticated along with isLoggedIn here instead
    if (this.state.isLoggedIn) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: {
              isLoggedIn: this.state.isLoggedIn,
              isLoggedOut: this.state.isLoggedOut
            }
          }}
        />
      );
    } else
      return (
        <div className={classes.paperContainer}>
          <Header {...this.props} isLoggedIn={this.props.isLoggedIn} />
          <Typography className={classes.loginDashboardTitle} variant="h6">
            Just<span style={{ fontWeight: "bold" }}>Fix</span>
            <span style={{ color: "yellow" }}>it</span>
            <span
              style={{ color: "white", position: "absolute", fontSize: "24px" }}
            >
              {/* {" "} */}
              ᵈᵃˢʰᵇᵒᵃʳᵈ
            </span>
          </Typography>
          <Container
            component="main"
            maxWidth="xs"
            style={{ background: "white" }}
          >
            <CssBaseline />
            <div className={classes.paper}>
              <div className={classes.loginTitle}>Agent Login</div>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Staff Auth ID"
                  name="username"
                  autoComplete="username"
                  error={this.state.username === "" && this.state.usernameError}
                  helperText={
                    this.state.username === "" && this.state.usernameError
                      ? "Username is required!"
                      : " "
                  }
                  onChange={e => this.handleChange(e, "username")}
                  autoFocus
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={this.state.password === "" && this.state.passwordError}
                  helperText={
                    this.state.password === "" && this.state.passwordError
                      ? "Password is required!"
                      : " "
                  }
                  onChange={e => this.handleChange(e, "password")}
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                {this.state.authError !== "" ? (
                  this.state.authError === "BAD" ? (
                    <p className={classes.error}>Authentication failed</p>
                  ) : (
                    <p className={classes.error}>
                      We are having issues logging you in. Please retry !!
                    </p>
                  )
                ) : (
                  ""
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={e => this.handleLogin(e)}
                >
                  Login
                </Button>
              </form>
            </div>
            <Box mt={8}>
              <Footer />
            </Box>
          </Container>
        </div>
      );
  }
}

// export default withStyles(styles as any)(App);
// connect to the store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles as any)(App));
