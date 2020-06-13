import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
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
    data: state.loginReducer.data,
    isAuthenticated: state.loginReducer.data?.sessionInfo?.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    // same effect
    checkIfAgentAuthenticated: () => dispatch(isAuthenticated())
    // retrieveCustomerInfo: (searchQuery: string) =>
    //   dispatch(fetchCustomerInfo(searchQuery))
  };
};

export class Header extends React.Component<any, any> {
  state = {
    profileClicked: false
  };

  getCustomerInfo(customerInfo: string) {
    // fetch customer info here
    const { fetchCustomerInfo } = this.props;

    console.log("this is the function &&&&&*****", this.props);

    try {
      return fetchCustomerInfo(customerInfo);
      // const {data} = this.props;
      // return data;
    } catch (err) {
      console.log("error fetching customer info for user", customerInfo);
    }
  }

  handleSearch(event: any) {
    if (event.charCode === 13) {
      console.log("Searching for", event.target.value);
      const customerInfo = event.target.value;
      const { getCustomerInfoCallback } = this.props;

      try {
        this.getCustomerInfo(customerInfo)
          .then((data: any) => {
            // pass customer data obtained from API to dashboard
            getCustomerInfoCallback(this.props.data);
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
  }

  deleteCookie(cname: string) {
    document.cookie =
      cname + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

  async logout() {
    console.log(this.props, "this is the props here in logout");
    const { logoutUser } = this.props;
    const response = await logoutUser();
    console.log(
      "Logging out user and response from logout graphql endpoint is",
      response
    );
    // Redirect user to login page here
    this.props.history.push("/");
    // delete auth session cookie
    this.deleteCookie("stok");
  }

  async handleProfileDropdown(event: any) {
    await this.setState({ profileClicked: !this.state.profileClicked });
  }

  async getAuthenticationStatus() {
    const { checkIfAgentAuthenticated } = this.props;
    try {
      const response = await checkIfAgentAuthenticated();
      return response;
    } catch (err) {
      console.log("Error calling isAuthenticated API");
    } finally {
      console.log("getAuthenticationStatus finally block");
    }
  }

  render() {
    const { classes } = this.props as any;

    console.log(this.props, "props in header.tsx");

    console.log(
      "Checking if agent is authenticated",
      this.getAuthenticationStatus(),
      this.state
    );

    return (
      <div className={classes.root}>
        <AppBar style={{ background: "#004D45" }} position="static">
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

            {/* TODO check if agentIsAuthenticated using sessionInfo query here instead */}
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

                <Grid item xs={2}>
                  <InputBase
                    startAdornment={<SearchIcon />}
                    placeholder="Search"
                    onKeyPress={this.handleSearch.bind(this)}
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
                      padding: "4px 0px 0px 0px"
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </Grid>
              </div>
            )}

            {this.props.location && this.props.location?.state?.isLoggedIn && (
              <div
                style={{
                  marginLeft: "25%",
                  marginTop: "20px",
                  display: "flex",
                  bottom: "10px"
                }}
              >
                LoggedIn Agent:
                <Avatar
                  alt="Profile Avatar"
                  style={{
                    display: "flex",
                    marginLeft: "10px",
                    bottom: "10px",
                    backgroundColor: "teal",
                    cursor: "pointer"
                  }}
                >
                  <span onClick={e => this.handleProfileDropdown(e)}>JB</span>
                </Avatar>
                {this.state.profileClicked && (
                  <Paper
                    className={classes.paper}
                    style={{
                      position: "absolute",
                      margin: "30px 40px",
                      color: "white",
                      borderRadius: "0px",
                      background: "#00332E"
                    }}
                  >
                    <MenuList>
                      <MenuItem>Profile</MenuItem>
                      <MenuItem>My account</MenuItem>
                      <MenuItem onClick={this.logout.bind(this)}>
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Paper>
                )}
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
