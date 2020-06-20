import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
// import Paper from "@material-ui/core/Paper";
// import MenuItem from "@material-ui/core/MenuItem";
// import MenuList from "@material-ui/core/MenuList";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import {
  fade,
  withStyles,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

import NativeSelect from "@material-ui/core/NativeSelect";
import Grid from "@material-ui/core/Grid";

import { isAuthenticated } from "../../actions/actions";

// default style hook from material-ui
const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3)
      }
    },
    input: {
      // borderRadius: 4,
      // position: 'relative',
      backgroundColor: "#00332E",
      border: "1px solid",
      fontSize: 16,
      padding: "5px 26px 10px 12px",
      borderColor: "#00332E",
      color: "white",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
      }
    }
  })
)(InputBase);

const styles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  }
}));

const mapStateToProps = (state: any) => {
  console.log("this is the state in mapStateToProps of Dashboard.tsx", state);
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
    getCustomerOnline: state.loginReducer.getCustomerOnline, // get customer online info when searching for it in dashboard
    getDeviceInfo: state.loginReducer.getDeviceInfo, // get customer device info when searching for it in dashboard
    userOnline: state.loginReducer.userOnline, // get DIMPS online/offline status
    userDropoutCount: state.loginReducer.userDropoutCount, // get customer RADIUS dropout count
    isAuthenticated: state.loginReducer.data?.sessionInfo?.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    // same effect
    checkIfAgentAuthenticated: () => dispatch(isAuthenticated())
    //    getCustDIMPSOnlineStatus: (customer: string) => dispatch(fetchDIMPSOnlineStatus(customer))
  };
};

export class Header extends React.Component<any, any> {
  state = {
    customerId: "",
    customerIdType: ""
  };

  async getCustomerDIMPSOnlineStatus(customerInfo: string) {
    console.log("inside DIMPS", this.props);
    const { fetchDIMPSOnlineStatus } = this.props;
    try {
      await fetchDIMPSOnlineStatus(customerInfo);
    } catch (err) {
      console.log("error in getCustomerDIMPSOnlineStatus", err);
    }
    return {};
  }

  async getCustomerRadiusDropoutCount(customerInfo: string) {
    console.log("inside getCustomerRadiusDropoutCount", this.props);
    const { fetchRadiusDropOuts } = this.props;
    try {
      await fetchRadiusDropOuts(customerInfo);
    } catch (err) {
      console.log("error in getCustomerRadiusDropoutCount", err);
    }
  }

  getCustomerInfo(customerInfo: string, type: string) {
    // fetch customer info here
    const { fetchCustomerInfo } = this.props;

    console.log("this is the function &&&&&*****", this.props);

    try {
      return fetchCustomerInfo(customerInfo, type);
      // const {data} = this.props;
      // return data;
    } catch (err) {
      console.log("error fetching customer info for user", customerInfo);
    }
  }

  handleChange(event: any) {
    this.setState({ customerId: event.target.value });
  }

  handleSearch(event: any) {
    if (event.charCode === 13 || event.type === "click") {
      const customerInfo =
        event.type !== "click" ? event.target.value : this.state.customerId;
      const { getCustomerInfoCallback } = this.props;

      try {
        // fetch DIMPS online status
        this.getCustomerDIMPSOnlineStatus(customerInfo);

        // fetch customer RADIUS dropout stats
        this.getCustomerRadiusDropoutCount(customerInfo);

        this.getCustomerInfo(customerInfo, this.state.customerIdType)
          .then((data: any) => {
            // pass customer data obtained from API to dashboard
            getCustomerInfoCallback(this.props);
          })
          .catch((err: any) =>
            console.log("Error fetching info from customer info API")
          );
      } catch (err) {
        console.log("error fetching customer info from API");
      } finally {
        console.log("finally block of get customer info API");
      }

      console.log(this.props, "header passed props");

      console.log(
        "Got customer info from the API for customer = ",
        customerInfo
      );
    }
  }

  handleSelect(event: any) {
    console.log("ID Type", event.target.value);
    this.setState({
      customerIdType: event.target.value === "FNN Number" ? "fnn" : "username"
    });
  }

  deleteCookie(cname: string) {
    document.cookie =
      cname + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

  async logout() {
    console.log(this.props, "this is the props here in logout");
    const { logoutUser } = this.props;
    try {
      const response = await logoutUser();
      console.log(
        "Logging out user and response from logout graphql endpoint is",
        response
      );
      // Redirect user to login page here
      this.props.history.push("/");
      // delete auth session cookie
      this.deleteCookie("stok");
    } catch (err) {
      console.log("error logging out user");
    } finally {
      console.log("logout finally block");
    }
  }

  componentDidMount() {
    try {
      this.getAuthenticationStatus().then((data: any) =>
        console.log(
          "got here in componentDidMount of Header.tsx: getAuthenticationStatus()",
          this.props
        )
      );
    } catch (err) {
      console.log("Error getting authentication status");
    } finally {
      console.log("Finally block get authentication status");
    }
  }

  // async handleProfileDropdown(event: any) {
  //   await this.setState({ profileClicked: !this.state.profileClicked });
  // }

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

    console.log(this.props, "props in header.tsx");

    // TODO make this AppBar markup more responsive
    return (
      <div className={classes.root}>
        <AppBar
          style={{ background: "#004D45", minWidth: "1400px" }}
          position="static"
        >
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon style={{ color: "#80FFF2" }} />
            </IconButton>
            <Typography className={classes.title} variant="h6">
              Just<span style={{ fontWeight: "bold" }}>Fix</span>
              <span style={{ color: "yellow" }}>it</span>
              <span style={{ color: "#80FFF2", position: "absolute" }}>
                {" "}
                ʸᵉˢ
              </span>
            </Typography>

            {/* TODO check if this.props.isAuthenticated or isLoggedIn here instead */}
            {this.props.location && this.props.location?.state?.isLoggedIn && (
              <div className={classes.search}>
                <Grid item xs={2}>
                  <Typography
                    style={{ position: "absolute", marginLeft: "15%" }}
                    variant="h6"
                  >
                    <span style={{ fontWeight: "bold" }}>Search</span>
                  </Typography>
                </Grid>

                <Grid item xs={2}>
                  <NativeSelect
                    style={{ position: "absolute", marginLeft: "22%" }}
                    id="demo-customized-select-native"
                    onChange={this.handleSelect.bind(this)}
                    input={<BootstrapInput />}
                  >
                    <option
                      aria-label="None"
                      value="ID Type"
                      style={{ backgroundColor: "#00332E", color: "white" }}
                    >
                      ID Type
                    </option>
                    <option
                      value={"Username"}
                      style={{ backgroundColor: "#00332E", color: "white" }}
                    >
                      Username
                    </option>
                    <option
                      value={"FNN Number"}
                      style={{ backgroundColor: "#00332E", color: "white" }}
                    >
                      FNN Number
                    </option>
                  </NativeSelect>
                </Grid>

                <Grid item xs={6}>
                  <InputBase
                    startAdornment={<SearchIcon />}
                    placeholder="Search"
                    onKeyPress={this.handleSearch.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      background: "#00332E",
                      marginLeft: "480px",
                      width: "200px",
                      padding: "5px 0px 0px 0px"
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />

                  <Button
                    style={{
                      width: "40px",
                      float: "right",
                      top: "-10px",
                      left: "60%",
                      position: "fixed"
                    }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={e => this.handleSearch(e)}
                  >
                    Go
                  </Button>
                </Grid>
              </div>
            )}

            {/* TODO check if this.props.isAuthenticated or isLoggedIn here instead */}
            {this.props.location && this.props.location?.state?.isLoggedIn && (
              <div
                style={{
                  marginLeft: "20%",
                  marginTop: "10px",
                  display: "flex"
                }}
              >
                <span style={{ marginTop: "10px" }}>LoggedIn Agent:</span>
                <Avatar
                  alt="Profile Avatar"
                  style={{
                    display: "flex",
                    marginLeft: "5px",
                    backgroundColor: "teal",
                    cursor: "pointer"
                  }}
                >
                  <span>JB</span>
                  {/* Replace the above username with props returned via graphql API */}
                </Avatar>
                {
                  // <Paper
                  //   className={classes.paper}
                  //   style={{
                  //     position: "relative",
                  //     margin: "0px 40px",
                  //     color: "white",
                  //     borderRadius: "0px",
                  //     background: "#00332E"
                  //   }}
                  // >
                  /* <MenuList>
                      <MenuItem>Profile</MenuItem>
                      <MenuItem>My account</MenuItem>
                      <MenuItem onClick={this.logout.bind(this)}>
                        Logout
                      </MenuItem>
                    </MenuList> */
                  <Button
                    style={{
                      margin: "0px 15px 15px",
                      width: "80px"
                    }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.logout.bind(this)}
                  >
                    LogOut
                  </Button>
                  // </Paper>
                }
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )withStyles(styles as any)(Header);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles as any)(Header));
