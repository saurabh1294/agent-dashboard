import React from "react";
import { Redirect } from "react-router";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
// import Badge from "@material-ui/core/Badge";
// import MenuItem from "@material-ui/core/MenuItem";
// import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import MailIcon from "@material-ui/icons/Mail";
// import NotificationsIcon from "@material-ui/icons/Notifications";
// import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

import { connect } from "react-redux";
import { isAuthenticated } from "../../actions/actions";

import {
  fade,
  withStyles,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";

import NativeSelect from "@material-ui/core/NativeSelect";

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
        borderRadius: 0,
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
    borderRadius: 0,
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    goBtn: {
      background: "teal",
      width: "40px",
      height: "34px",
      borderRadius: 0
    },
    logoutBtn: {
      background: "teal",
      borderRadius: 0,
      width: "auto",
      marginLeft: "3%"
    },
    searchBox: {
      width: "200px"
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    },
    search: {
      position: "relative",
      borderRadius: 0,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
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
      [theme.breakpoints.up("md")]: {
        width: "20ch"
      }
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex"
      }
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    },
    appBarBg: {
      background: "#004D45"
    }
  })
);

export function PrimarySearchAppBar(props: any) {
  const classes = useStyles();

  const handleSelect = (event: React.MouseEvent<HTMLElement>) => {
    console.log("this props is &&&", props);
    props.compositeData.handleSelect(event);
  };

  const handleSearch = (event: React.MouseEvent<HTMLElement>) => {
    console.log("this props is &&&", props);
    props.compositeData.handleSearch(event);
  };

  const handleChange = (event: React.KeyboardEvent<HTMLElement>) => {
    console.log("this props is handleChange", event);
    props.compositeData.handleChange(event);
  };

  const logout = (event: React.MouseEvent<HTMLElement>) => {
    console.log("this props is &&&", props);
    props.compositeData.logout(event);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBarBg}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap>
            Just<span style={{ fontWeight: "bold" }}>Fix</span>
            <span style={{ color: "yellow" }}>it</span>
            <span style={{ color: "#80FFF2" }}> ʸᵉˢ</span>
          </Typography>

          {/* // TODO also check for isAuthenticated (Session management) */}
          {/* // TODO instead of repeating the same condition, wrap in one jsx */}
          {props.compositeData.props.location &&
            props.compositeData.props.location?.state?.isLoggedIn && (
              <Typography variant="h6">
                <span
                  style={{
                    position: "absolute",
                    margin: "-15px 13%",
                    fontWeight: "bold"
                  }}
                >
                  Search
                </span>
              </Typography>
            )}

          {props.compositeData.props.location &&
            props.compositeData.props.location?.state?.isLoggedIn && (
              <NativeSelect
                style={{ marginLeft: "22%" }}
                id="demo-customized-select-native"
                onChange={(e: any) => handleSelect(e)}
                input={<BootstrapInput />}
              >
                <option
                  value="Username"
                  style={{ backgroundColor: "#00332E", color: "white" }}
                >
                  Username
                </option>
                <option
                  value="FNN Number"
                  style={{ backgroundColor: "#00332E", color: "white" }}
                >
                  FNN Number
                </option>
              </NativeSelect>
            )}

          {props.compositeData.props.location &&
            props.compositeData.props.location?.state?.isLoggedIn && (
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  onKeyPress={(e: any) => handleSearch(e)}
                  onChange={(e: any) => handleChange(e)}
                  className={classes.searchBox}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            )}

          {props.compositeData.props.location &&
            props.compositeData.props.location?.state?.isLoggedIn && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.goBtn}
                onClick={e => handleSearch(e)}
              >
                Go
              </Button>
            )}

          {props.compositeData.props.location &&
            props.compositeData.props.location?.state?.isLoggedIn && (
              <span style={{ marginLeft: "2%" }}>LoggedIn Agent:</span>
            )}

          {props.compositeData.props.location &&
            props.compositeData.props.location?.state?.isLoggedIn && (
              <Avatar
                alt="Profile Avatar"
                style={{
                  marginLeft: "1%",
                  backgroundColor: "teal",
                  cursor: "pointer"
                }}
              >
                <span style={{ fontSize: "14px" }}>
                  {props.compositeData?.loggedInUser?.toUpperCase() ||
                    props.compositeData.props.location?.state?.username?.toUpperCase()}
                </span>
              </Avatar>
            )}

          {props.compositeData.props.location &&
            props.compositeData.props.location?.state?.isLoggedIn && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.logoutBtn}
                onClick={(e: any) => logout(e)}
              >
                LogOut
              </Button>
            )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export class Header extends React.Component<any, any> {
  state = {
    customerId: "",
    loggedInUser: "",
    isLoggedOut: true,
    customerIdType: "username" // default value from dropdown is username
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

  async getCustomerAvcCvcIds(gsID: string) {
    console.log("inside getCustomerAvcCvcIds()", this.props);
    const { fetchAvcCvcIds } = this.props;
    try {
      await fetchAvcCvcIds(gsID);
    } catch (err) {
      console.log("error inside getCustomerAvcCvcIds", err);
    }
  }

  async getCustomerWifiStats(model: string, serial: string) {
    console.log("inside customer get Wifi status", this.props);
    const { fetchWifiStats } = this.props;
    try {
      await fetchWifiStats(model, serial);
    } catch (err) {
      console.log("error fetching customer wifi stats", err);
    }
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

  async getCustomerInfo(customerInfo: string, type: string) {
    // fetch customer info here
    const { fetchCustomerInfo } = this.props;

    console.log("this is the function &&&&&*****", this.props);

    try {
      // trim leading and trailing spaces from username/FNN
      await fetchCustomerInfo(customerInfo.trim(), type);
    } catch (err) {
      console.log("error fetching customer info for user", customerInfo);
    }
  }

  async getCustomerOnlineInfo(customerInfo: string, type: string) {
    // fetch customer info here
    const { fetchCustomerOnlineInfo } = this.props;

    console.log("this is the function &&&&&*****", this.props);

    try {
      // trim leading and trailing spaces from username/FNN
      await fetchCustomerOnlineInfo(customerInfo.trim(), type);
    } catch (err) {
      console.log("error fetching customer online info for user", customerInfo);
    }
  }

  async getDeviceInfo(customerInfo: string, type: string) {
    // fetch customer info here
    const { fetchDeviceInfo } = this.props;

    console.log("this is the function &&&&&*****", this.props);

    try {
      // trim leading and trailing spaces from username/FNN
      await fetchDeviceInfo(customerInfo.trim(), type);
    } catch (err) {
      console.log("error fetching device info for user", customerInfo);
    }
  }

  handleChange(event: any) {
    this.setState({ customerId: event.target.value?.toLowerCase() });
  }

  async handleSearch(event: any) {
    if (event.charCode === 13 || event.type === "click") {
      const customerInfo =
        event.type !== "click"
          ? event.target?.value?.toLowerCase()
          : this.state.customerId;
      const { getCustomerInfoCallback } = this.props;
      const { showLoader } = this.props;
      // start the loader/spinner
      showLoader();

      try {
        await this.getCustomerInfo(customerInfo, this.state.customerIdType);
        // JFI-643 added on 04/07/2020
        await this.getDeviceInfo(customerInfo, this.state.customerIdType);
        await this.getCustomerOnlineInfo(
          customerInfo,
          this.state.customerIdType
        );

        // pass customer data obtained from API to dashboard
        // get the username first
        const uname = this.props?.getCustomer?.customer?.username.toLowerCase();

        const gsID = this.props?.getCustomer?.customer?.gsID;
        const device = this.props?.getDeviceInfo?.device;

        // if ID type is FNN call getCustomerInfo again with that ID type to fetch device info customerOnline
        if (this.state.customerIdType === "fnn") {
          await this.getCustomerInfo(uname, "username");
          // JFI-643 added on 04/07/2020
          await this.getDeviceInfo(uname, "username");
          await this.getCustomerOnlineInfo(uname, "username");
        }

        // fetch DIMPS online status
        await this.getCustomerDIMPSOnlineStatus(uname);

        // fetch customer RADIUS dropout stats
        await this.getCustomerRadiusDropoutCount(uname);

        // fetch customer AVC and CVC ID
        await this.getCustomerAvcCvcIds(gsID);

        // fetch customer Wifi stats
        await this.getCustomerWifiStats(
          device?.deviceModel,
          device?.deviceSerial
        );

        console.log("this is props in customer info", this.props);

        getCustomerInfoCallback(this.props);
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
      // TODO to fix session management bug, set below state to false in some way
      // this.props?.location?.setState({isLoggedIn : false});
      // this.props.history.push("/");
      await this.setState({ isLoggedOut: true });
      await this.getAuthenticationStatus();
      // delete auth session cookie
      this.deleteCookie("stok");
    } catch (err) {
      console.log("error logging out user");
    } finally {
      console.log("logout finally block");
    }
  }

  async componentDidMount() {
    try {
      await this.getAuthenticationStatus();
      await this.setState({
        loggedInUser: this.props?.data?.sessionInfo?.authenticatedUser
      });
      console.log("inside header: componentDidMount()", this.props);
    } catch (err) {
      console.log("Error getting authentication status");
    } finally {
      console.log("Finally block get authentication status");
    }
  }

  // TODO fix delay in fetching getAuthenticationStatus() on page load via componentWillReceiveProps() alternative
  static getDerivedStateFromProps(props: any, state: any) {
    // ...
    if (props.data !== state.data) {
      return {
        selected: props.data
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    if (snapshot) {
      this.setState({
        loggedInUser: this.props?.data?.sessionInfo?.authenticatedUser
      });
    }
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
    const compositeData = {
      handleSelect: this.handleSelect.bind(this),
      handleChange: this.handleChange.bind(this),
      handleSearch: this.handleSearch.bind(this),
      logout: this.logout.bind(this),
      loggedInUser: this.state.loggedInUser,
      props: this.props
    };

    if (this.state.isLoggedOut && this.props.isAuthenticated === "false") {
      return (
        <Redirect
          to={{
            pathname: "/",
            // instead of ORing with false or with this.props.isAuthenticated
            state: { isLoggedIn: false }
          }}
        />
      );
    }
    return <PrimarySearchAppBar compositeData={compositeData} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles as any)(Header));
