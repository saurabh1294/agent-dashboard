import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

import { InstructionsModal } from "../InstructionsModal/InstructionsModal";
import { ConnectedDevicesModal } from "../ConnectedDevicesModal/ConnectedDevicesModal";

import Divider from "@material-ui/core/Divider";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import CachedIcon from "@material-ui/icons/Cached";
import {
  fetchCustomerInfo,
  fetchDIMPSOnlineStatus,
  fetchRadiusDropOuts,
  fetchAvcCvcIds,
  fetchWifiStats
} from "../../actions/actions";

import { connect } from "react-redux";

import { logout, isAuthenticated } from "../../actions/actions";

import { Redirect } from "react-router";

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
    nsiGetAvcGsid: state.loginReducer.nsiGetAvcGsid, // get customer AVC and CVC ID
    acsWiFi: state.loginReducer.acsWiFi, // get customer WIFI stats
    isAuthenticated: state.loginReducer.data?.sessionInfo?.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    // same effect
    fetchCustomerInfo: (searchQuery: string, type: string) =>
      dispatch(fetchCustomerInfo(searchQuery, type)),

    logoutUser: () => dispatch(logout()),
    checkIfAgentAuthenticated: () => dispatch(isAuthenticated()),
    fetchDIMPSOnlineStatus: (customer: string) =>
      dispatch(fetchDIMPSOnlineStatus(customer)),
    fetchRadiusDropOuts: (customer: string) =>
      dispatch(fetchRadiusDropOuts(customer)),
    fetchAvcCvcIds: (gsID: string) => dispatch(fetchAvcCvcIds(gsID)),
    fetchWifiStats: (model: string, serial: string) =>
      dispatch(fetchWifiStats(model, serial))
  };
};

// default style hook from material-ui
const styles = (theme: any) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "left"
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
    background: "teal"
  },

  tileContainer: {
    height: "550px",
    width: "100%",
    textAlign: "center",
    border: "2px solid black",
    display: "inline-block",
    margin: "0 auto",
    marginTop: "20px"
  },
  div: {
    display: "flex",
    flexDirection: "row wrap",
    padding: 20,
    width: "100%"
  },
  paperLeft: {
    flex: 1,
    height: "100%",
    margin: 10,
    textAlign: "center",
    padding: 10
  },
  paperRight: {
    // height: 600,
    flex: 4,
    margin: 10,
    textAlign: "center"
  },

  topTile: {
    borderRadius: "0",
    height: "auto",
    color: "black",
    fontWeight: "bold",
    fontSize: "24px",
    fontFamily: "Arial",
    lineHeight: "25px",
    padding: "15px",
    minHeight: "200px"
  },

  header1: {
    backgroundColor: "orange",
    borderRadius: "0",
    height: "auto",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "25px",
    padding: "15px"
  },

  header2: {
    borderRadius: "0",
    height: "auto",
    backgroundColor: "purple",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "25px",
    padding: "15px"
  },

  header3: {
    borderRadius: "0",
    height: "auto",
    backgroundColor: "#4B0082",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "25px",
    padding: "15px"
  },

  serviceInfoTile1: {
    borderRadius: "0",
    minHeight: "320px",
    fontWeight: "bold",
    lineHeight: "25px",
    padding: "15px",
    marginTop: "20px"
  },

  serviceInfoTile2: {
    borderRadius: "0",
    minHeight: "320px",
    fontWeight: "bold",
    lineHeight: "25px",
    padding: "15px",
    marginTop: "20px"
  },

  connectivityTile: {
    borderRadius: "0",
    minHeight: "156px",
    fontWeight: "bold",
    lineHeight: "25px",
    padding: "20px",
    marginTop: "20px",
    width: "100%"
  },

  provisioningTile: {
    borderRadius: "0",
    minHeight: "156px",
    fontWeight: "bold",
    lineHeight: "25px",
    padding: "20px",
    width: "100%"
  },

  radiusDropoutTile: {
    borderRadius: "0",
    minHeight: "156px",
    fontWeight: "bold",
    lineHeight: "25px",
    padding: "20px",
    width: "100%"
  },

  title: {
    fontWeight: "bold",
    fontSize: "20px"
  },

  cachedIcon: {
    display: "inline",
    position: "absolute",
    marginLeft: "50px",
    color: "gray",
    cursor: "pointer"
  },

  cachedIconAnimating: {
    display: "inline",
    position: "absolute",
    marginLeft: "50px",
    color: "gray",
    animation: `$rotateAnimation 3000ms linear infinite`,
    cursor: "pointer"
  },

  "@keyframes rotateAnimation": {
    from: {
      transform: "rotate(0deg)"
    },
    to: {
      transform: "rotate(360deg)"
    }
  },

  cachedIconSmallTile: {
    display: "inline",
    position: "absolute",
    marginLeft: "30px",
    color: "gray",
    cursor: "pointer"
  },

  cachedIconSmallTileAnimating: {
    display: "inline",
    position: "absolute",
    marginLeft: "30px",
    color: "gray",
    animation: `$rotateAnimation 3000ms linear infinite`,
    cursor: "pointer"
  },

  loader: {
    position: "absolute",
    zIndex: 99999999,
    top: "calc(50% - 4em)",
    left: "calc(50% - 4em)",
    width: "10em",
    height: "10em",
    border: "1.1em solid rgba(0, 0, 0, 0.2)",
    borderLeft: "1.1em solid #000000",
    borderRadius: "50%",
    animationDuration: "2s",
    animation: `$load8 3000ms linear infinite`,
    transition: "opacity 0.3s"
  },

  overlay: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: "999999"
  },

  overlayOpacity: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: "999999",
    background: "gray",
    opacity: 0.5
  },

  loaderHide: {
    opacity: "0"
  },

  "@keyframes load8": {
    "0%": {
      transform: "rotate(0deg)"
    },

    "100%": {
      transform: "rotate(360deg)"
    }
  },

  active: {
    color: "#00875A"
  },

  abuse: {
    color: "red"
  },

  online: {
    color: "#00875A"
  },

  offline: {
    color: "red"
  }
});

class Dashboard extends Component<any, any> {
  state = {
    avcId: "",
    username: "",
    priId: "",
    cvcId: "",
    firstName: "",
    lastName: "",
    deviceModel: "",
    deviceSerial: "",
    mac: "",
    ipaddr: "",
    serviceStatus: "",
    accessType: "",
    speedProfile: "",
    gsID: "",
    voiceLines: [{ number: "" }],
    dimpsOnline: "",
    radiusDropouts: { last24: undefined, last48: undefined },
    isLoggedIn: false, // TODO refine this by having only one state in reducer
    isAuthenticated: false,
    idTypeHasError: false,
    openConnectedDevicesModal: false,
    stopAnimationAccStatus: true,
    stopAnimation: true,
    stopAnimationWifiStats: true,
    wifiSpeed1: "",
    wifiSpeed2: "",
    wifiEnabled1: "",
    wifiEnabled2: "",
    showStartupSpinner: false
  };

  showLoader() {
    this.setState({ showStartupSpinner: true });
  }

  hideLoader() {
    this.setState({ showStartupSpinner: false });
  }

  componentDidMount() {
    try {
      this.getAuthenticationStatus().then((data: any) => {
        /*console.log(
          "got here in componentDidMount of Dashboard.tsx: getAuthenticationStatus()",
          this.props
        );*/
        this.setState({
          isAuthenticated: this.props?.isAuthenticated === "true"
        });
      });
    } catch (err) {
      console.log("Error getting authentication status");
    } finally {
      console.log("Finally block get authentication status");
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

  componentWillUnmount() {
    console.log("unmounting dashboard");
  }

  async getCustomerInfoCallback(data: any, type: string = "") {
    if (type.length === 0) {
      this.setState({ stopAnimation: false });
    }
    await this.sleep(100);

    console.log("inside customer info callback", data);
    const customer = data?.getCustomer?.customer;
    const nsiGetAvcGsid = data?.nsiGetAvcGsid?.data;
    this.setState({ avcId: nsiGetAvcGsid?.avcID });
    this.setState({ priId: customer?.priID });
    this.setState({ username: customer?.username });
    this.setState({ cvcId: nsiGetAvcGsid?.cvcID });
    this.setState({ firstName: customer?.firstName || "" });
    this.setState({ lastName: customer?.lastName || "" });
    this.setState({ serviceStatus: customer?.serviceStatus });
    this.setState({ accessType: customer?.accessType });
    this.setState({ speedProfile: customer?.speedProfile });
    this.setState({ voiceLines: customer?.voiceLines });
    this.setState({ gsID: customer?.gsID });

    // TODO fix JFI-588 and changing FNN number doesn't clear mac, ipaddr and deviceModel bug
    const customerOnline =
      data?.getCustomerOnline?.result === "BAD" ? {} : data?.getCustomerOnline;
    const deviceInfo =
      data?.getCustomer?.result === "BAD" ? {} : data?.getDeviceInfo;
    const wifiStats = data?.getCustomer?.result === "BAD" ? {} : data?.acsWiFi;

    const userOnline = data?.userOnline;
    const userDropoutCount = data?.userDropoutCount;

    data?.getCustomer?.result === "GOOD"
      ? this.setState({ radiusDropouts: userDropoutCount })
      : this.setState({
          radiusDropouts: { last24: undefined, last48: undefined }
        });

    data?.getCustomer?.result === "GOOD"
      ? this.setState({
          dimpsOnline: userOnline.online === "true" ? "Online" : "Offline"
        })
      : this.setState({ dimpsOnline: "" });

    if (data?.getCustomer?.result === "GOOD") {
      if (wifiStats.result === "UGLY") {
        this.setState({ wifiSpeed1: "Timed out. Please retry!!" });
        this.setState({ wifiEnabled1: "" });
        this.setState({ wifiSpeed2: "" });
        this.setState({ wifiEnabled2: "" });
      } else {
        const wifiArr = wifiStats?.wifi;
        this.setState({
          wifiSpeed1: Array.isArray(wifiArr) ? wifiStats?.wifi[0]?.band : ""
        });
        this.setState({
          wifiSpeed2: Array.isArray(wifiArr) ? wifiStats?.wifi[1]?.band : ""
        });
        this.setState({
          wifiEnabled1: Array.isArray(wifiArr)
            ? wifiStats?.wifi[0]?.enabled
              ? "Enabled"
              : "Disabled"
            : ""
        });

        const enabled1 = Array.isArray(wifiArr)
          ? `${this.state.wifiEnabled1}(${wifiStats?.wifi[0]?.status})`
          : "";
        this.setState({ wifiEnabled1: enabled1 });
        this.setState({
          wifiEnabled2: Array.isArray(wifiArr)
            ? wifiStats?.wifi[1]?.enabled
              ? "Enabled"
              : "Disabled"
            : ""
        });

        const enabled2 = Array.isArray(wifiArr)
          ? `${this.state.wifiEnabled2}(${wifiStats?.wifi[1]?.status})`
          : "";
        this.setState({ wifiEnabled2: enabled2 });
      }

      this.setState({ mac: customerOnline?.info?.mac });
      this.setState({ ipaddr: customerOnline?.info?.ipaddr });
    } else {
      this.setState({ mac: "" });
      this.setState({ ipaddr: "" });
      this.setState({ wifiSpeed1: "" });
      this.setState({ wifiSpeed2: "" });
      this.setState({ wifiEnabled1: "" });
      this.setState({ wifiEnabled2: "" });
    }

    const wanMac = deviceInfo?.device?.wanMac;
    const mac = customerOnline?.info?.mac;

    // JFI-592/JFI-640 condition check
    if (wanMac !== mac) {
      this.setState({ deviceModel: "" });
      this.setState({ deviceSerial: "" });
    } else {
      this.setState({ deviceModel: deviceInfo?.device?.deviceModel });
      this.setState({ deviceSerial: deviceInfo?.device?.deviceSerial });
    }
    if (type.length === 0) {
      this.setState({ stopAnimation: true });
    }
    this.hideLoader();
  }

  getAccStatus(state: any) {
    switch (state) {
      case "C":
        return "Active";

      case "W":
        return "Withdrawn";

      case "S":
        return "Suspended";

      case "A":
        return "Abuse";

      default:
        return "";
    }
  }

  getClass(status: any) {
    const { classes } = this.props as any;

    switch (status) {
      case "C":
        return classes.active;

      case "S":
      case "W":
      case "A":
        return classes.abuse;

      case "Online":
        return classes.online;

      case "Offline":
        return classes.offline;

      default:
        return "";
    }
  }

  openModal(e: any) {
    this.setState({ openConnectedDevicesModal: true });
  }

  closeModalCallback(state: boolean) {
    this.setState({ openConnectedDevicesModal: state });
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async refreshAccountStatus() {
    const username = this.props?.getCustomer?.customer?.username;
    if (!username) return; // edge case when no user is/was searched

    this.setState({ stopAnimationAccStatus: false });
    const { fetchCustomerInfo } = this.props;
    console.log("inside refresehAccountStatus", this.props);

    await fetchCustomerInfo(username, "username");
    await this.getCustomerInfoCallback(this.props, "ACC_STATUS");
    await this.sleep(500);
    this.setState({ stopAnimationAccStatus: true });
  }

  async refreshWifiStats() {
    const data = this.props;
    const deviceInfo =
      data?.getCustomer?.result === "BAD" ? {} : data?.getDeviceInfo;
    const model = deviceInfo?.device?.deviceModel;
    const serial = deviceInfo?.device?.deviceSerial;

    if (!model || !serial) {
      return;
    }
    const { fetchWifiStats } = this.props;
    this.setState({ stopAnimationWifiStats: false });

    await fetchWifiStats(model, serial);
    await this.sleep(500);

    const wifiStats = data?.getCustomer?.result === "BAD" ? {} : data?.acsWiFi;
    const wifiArr = wifiStats?.wifi;

    if (wifiStats.result === "UGLY") {
      this.setState({ wifiSpeed1: "Timed out. Please retry!!" });
      this.setState({ wifiEnabled1: "" });
      this.setState({ wifiSpeed2: "" });
      this.setState({ wifiEnabled2: "" });
    } else {
      // TODO code refactoring move the below 10 lines and the same 10 lines from getCustomerInfoCallback into a single function
      this.setState({
        wifiSpeed1: Array.isArray(wifiArr) ? wifiStats?.wifi[0]?.band : ""
      });
      this.setState({
        wifiSpeed2: Array.isArray(wifiArr) ? wifiStats?.wifi[1]?.band : ""
      });
      this.setState({
        wifiEnabled1: Array.isArray(wifiArr)
          ? wifiStats?.wifi[0]?.enabled
            ? "Enabled"
            : "Disabled"
          : ""
      });

      const enabled1 = Array.isArray(wifiArr)
        ? `${this.state.wifiEnabled1}(${wifiStats?.wifi[0]?.status})`
        : "";
      this.setState({ wifiEnabled1: enabled1 });
      this.setState({
        wifiEnabled2: Array.isArray(wifiArr)
          ? wifiStats?.wifi[1]?.enabled
            ? "Enabled"
            : "Disabled"
          : ""
      });

      const enabled2 = Array.isArray(wifiArr)
        ? `${this.state.wifiEnabled2}(${wifiStats?.wifi[1]?.status})`
        : "";
      this.setState({ wifiEnabled2: enabled2 });
    }
    this.setState({ stopAnimationWifiStats: true });
  }

  getRadiusDropoutFormatting(radiusDrops: any) {
    const { classes } = this.props as any;
    if (radiusDrops >= 5) return classes.abuse;
    else return classes.active;
  }

  disableParent(event: any) {
    if (this.state.showStartupSpinner) {
      event.preventDefault();
      return;
    }
  }

  render() {
    const { classes } = this.props as any;

    if (this.state.isAuthenticated || this.props.location.state?.isLoggedIn) {
      return (
        <div
          className={
            this.state.showStartupSpinner ? classes.overlayOpacity : ""
          }
        >
          {this.state.openConnectedDevicesModal && (
            <ConnectedDevicesModal
              modalCloseCallback={this.closeModalCallback.bind(this)}
            />
          )}
          <InstructionsModal />

          <div className={this.state.showStartupSpinner ? classes.overlay : ""}>
            <div
              className={
                this.state.showStartupSpinner ? classes.overlayOpacity : ""
              }
            >
              <div
                className={
                  this.state.showStartupSpinner
                    ? classes.loader
                    : classes.loaderHide
                }
              ></div>
            </div>
          </div>

          <Header
            {...this.props}
            getCustomerInfoCallback={(data: any) =>
              this.getCustomerInfoCallback(data)
            }
            showLoader={this.showLoader.bind(this)}
          />

          <div style={{ marginTop: "10px", marginLeft: "9%" }}>
            <Box display="flex" flexDirection="row" p={1} m={1}>
              <Box p={1}>
                <Typography variant="h6" style={{ color: "teal" }}>
                  Customer{" "}
                  <span
                    style={{
                      color:
                        `${this.props?.getCustomer?.result}` === "BAD"
                          ? "red"
                          : "black",
                      fontWeight: "bold"
                    }}
                  >
                    {this.props?.getCustomer?.result === "BAD"
                      ? "Not Found"
                      : `${this.state.firstName} ${this.state.lastName}`}
                  </span>
                </Typography>
              </Box>
            </Box>
          </div>

          <div
            style={{ marginLeft: "10%", marginTop: "-70px", width: "80%" }}
            className={classes.root}
          >
            <Paper className={`${classes.paper} ${classes.topTile}`}>
              <Grid container spacing={2}>
                <Grid item className={classes.title}>
                  General Service Status
                </Grid>
                <Grid item xs={12} sm={12} container>
                  <Grid
                    item
                    xs={2}
                    container
                    direction="column"
                    style={{ padding: "15px", marginRight: "50px" }}
                    spacing={2}
                  >
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        Service Status{" "}
                        <CachedIcon
                          className={
                            this.state.stopAnimation
                              ? classes.cachedIcon
                              : classes.cachedIconAnimating
                          }
                        />
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                      >
                        DIMPS
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          fontWeight: "bold",
                          fontSize: "18px"
                        }}
                      >
                        <span className={this.getClass(this.state.dimpsOnline)}>
                          {this.state.dimpsOnline}
                        </span>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider orientation="vertical" flexItem />

                  <Grid
                    item
                    xs={2}
                    container
                    direction="column"
                    style={{ padding: "15px", marginRight: "50px" }}
                    spacing={2}
                  >
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        Account Status{" "}
                        <CachedIcon
                          className={
                            this.state.stopAnimationAccStatus
                              ? classes.cachedIcon
                              : classes.cachedIconAnimating
                          }
                          onClick={this.refreshAccountStatus.bind(this)}
                        />
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                      >
                        ISE Prov DB
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          fontWeight: "bold",
                          fontSize: "18px"
                        }}
                      >
                        <span
                          className={this.getClass(this.state.serviceStatus)}
                        >
                          {this.getAccStatus(this.state.serviceStatus)}
                        </span>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider orientation="vertical" flexItem />

                  <Grid
                    item
                    xs={2}
                    container
                    direction="column"
                    style={{ padding: "15px", marginRight: "50px" }}
                    spacing={2}
                  >
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        {/* NBN Network{" "} */}
                        <CachedIcon className={classes.cachedIcon} />
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                      >
                        {/* AVC */}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          color: "#00CCFF",
                          fontWeight: "bold",
                          fontSize: "18px"
                        }}
                      >
                        {/* //TODO - use some state here instead//  No Outage */}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider orientation="vertical" flexItem />

                  <Grid
                    item
                    xs={2}
                    container
                    direction="column"
                    style={{ padding: "15px", marginRight: "50px" }}
                    spacing={2}
                  >
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        {/* PRI  */}
                        <CachedIcon className={classes.cachedIcon} />
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                      >
                        {/* NBN */}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        style={{
                          color: "#00CCFF",
                          fontWeight: "bold",
                          fontSize: "18px"
                        }}
                      >
                        {/* //TODO - use some state here instead// Active */}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider orientation="vertical" flexItem />

                  <Grid
                    item
                    xs={2}
                    container
                    direction="column"
                    style={{ padding: "15px", marginRight: "0px" }}
                    spacing={2}
                  >
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        {/* PRI  */}
                        <CachedIcon className={classes.cachedIcon} />
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                      >
                        {/* Co-existence */}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          color: "#00CCFF",
                          fontWeight: "bold",
                          fontSize: "18px"
                        }}
                      >
                        {/* //TODO - use some state here instead//  Yes */}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>

          <div style={{ marginLeft: "10%", marginTop: "-50px", width: "80%" }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Paper className={`${classes.paper} ${classes.header1}`}>
                  Service Information
                </Paper>

                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <Paper
                      className={`${classes.papers} ${classes.serviceInfoTile1}`}
                    >
                      <Typography
                        gutterBottom
                        color="textSecondary"
                        style={{ fontSize: "11px" }}
                      >
                        AVC
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {this.state.avcId}
                      </Typography>

                      <Typography
                        gutterBottom
                        color="textSecondary"
                        style={{ fontSize: "11px" }}
                      >
                        Technology Type
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {this.state.accessType}
                      </Typography>

                      <Typography
                        gutterBottom
                        color="textSecondary"
                        style={{ fontSize: "11px" }}
                      >
                        Username
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {this.state.username}
                      </Typography>

                      <Typography
                        gutterBottom
                        color="textSecondary"
                        style={{ fontSize: "11px" }}
                      >
                        FNN Number
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {this.state.voiceLines &&
                          this.state.voiceLines[0]?.number}
                      </Typography>

                      <Typography
                        gutterBottom
                        color="textSecondary"
                        style={{ fontSize: "11px" }}
                      >
                        PRI Number
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {this.state.priId}
                      </Typography>

                      <Typography
                        gutterBottom
                        color="textSecondary"
                        style={{ fontSize: "11px" }}
                      >
                        CVC
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {this.state.cvcId}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper
                      className={`${classes.papers} ${classes.serviceInfoTile2}`}
                    >
                      <Typography
                        gutterBottom
                        style={{ fontSize: "12px", fontWeight: "bold" }}
                      >
                        Modem Connected{" "}
                        <CachedIcon
                          className={
                            this.state.stopAnimation
                              ? classes.cachedIcon
                              : classes.cachedIconAnimating
                          }
                        />
                      </Typography>

                      <Typography
                        gutterBottom
                        color="textSecondary"
                        style={{ marginTop: "20px", fontSize: "11px" }}
                      >
                        Modem Model
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <span style={{ fontWeight: "bold" }}>Model #</span> :{" "}
                        {this.state.deviceModel}
                        {/* //TODO - use some state here instead// XXXX XXXXX */}
                      </Typography>

                      <Typography
                        gutterBottom
                        color="textSecondary"
                        style={{ fontSize: "11px" }}
                      >
                        Modem Specs
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <span style={{ fontWeight: "bold" }}>MAC</span> :{" "}
                        {this.state.mac}
                        {/* //TODO - use some state here instead//  XXXX */}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {/* //TODO - use some state here instead//  XXXXXX */}
                        <span style={{ fontWeight: "bold" }}>
                          IP ADDRESS
                        </span> : {this.state.ipaddr}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <span style={{ fontWeight: "bold" }}>
                          Device Serial #
                        </span>{" "}
                        : {this.state.deviceSerial}
                        {/* //TODO - use some state here instead// XXXX XXXXX */}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {/* //TODO - use some state here instead//  XXXXXXXXXX */}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {/* //TODO - use some state here instead// XXXXX XXXX */}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {/* //TODO - use some state here instead// XX/XXXX */}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Paper className={`${classes.paper} ${classes.header2}`}>
                  Connectivity
                </Paper>

                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12}>
                    <Paper
                      className={`${classes.papers} ${classes.connectivityTile}`}
                    >
                      <Typography
                        style={{
                          marginBottom: "10px",
                          fontSize: "12px",
                          fontWeight: "bold"
                        }}
                      >
                        Line State Test{" "}
                        <CachedIcon className={classes.cachedIconSmallTile} />
                      </Typography>
                      <Typography
                        style={{ fontSize: "14px" }}
                        color="textSecondary"
                      >
                        {/* Service Status */}
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "24px",
                          fontWeight: "bold",
                          color: "#00CCFF"
                        }}
                      >
                        {/* //TODO - use some state here instead//  FTTN/B */}
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={12} style={{ marginTop: "-20px" }}>
                    <Paper
                      className={`${classes.papers} ${classes.connectivityTile}`}
                    >
                      <Typography
                        style={{
                          marginBottom: "10px",
                          fontSize: "12px",
                          fontWeight: "bold"
                        }}
                      >
                        DIMPS{" "}
                        <CachedIcon className={classes.cachedIconSmallTile} />
                      </Typography>
                      <Typography
                        style={{ fontSize: "14px" }}
                        color="textSecondary"
                      >
                        {/* Phone Line Status */}
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "24px",
                          fontWeight: "bold",
                          color: "#00CCFF"
                        }}
                      >
                        {/* //TODO - use some state here instead// Active */}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Paper className={`${classes.paper} ${classes.header3}`}>
                  Performance & Stability
                </Paper>

                <Grid container spacing={1}>
                  <Grid item container xs={6} sm={6}>
                    <Paper
                      className={`${classes.papers} ${classes.connectivityTile}`}
                    >
                      <Typography
                        style={{
                          marginBottom: "10px",
                          fontSize: "12px",
                          fontWeight: "bold"
                        }}
                      >
                        Wifi Status{`  ${new Date().toLocaleTimeString()}`}
                        <CachedIcon
                          className={
                            this.state.stopAnimationWifiStats
                              ? classes.cachedIconSmallTile
                              : classes.cachedIconSmallTileAnimating
                          }
                          onClick={this.refreshWifiStats.bind(this)}
                        />
                      </Typography>
                      <Grid container>
                        <Typography>
                          <span
                            style={{
                              fontSize: "14px",
                              color:
                                `${this.state.wifiSpeed1}` ===
                                "Timed out. Please retry!!"
                                  ? "red"
                                  : "black",
                              fontWeight: "bold"
                            }}
                          >
                            {this.state.wifiSpeed1}
                          </span>
                        </Typography>
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontWeight: "bold",
                            fontSize: "14px"
                          }}
                          className={
                            this.state.wifiEnabled1?.split("(")[0] === "Enabled"
                              ? classes.active
                              : classes.abuse
                          }
                        >
                          {this.state.wifiEnabled1}
                        </Typography>
                      </Grid>

                      <Grid container>
                        <Typography
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                        >
                          {this.state.wifiSpeed2}
                        </Typography>
                        <Typography
                          style={{
                            marginLeft: "20px",
                            fontWeight: "bold",
                            fontSize: "14px"
                          }}
                          className={
                            this.state.wifiEnabled2?.split("(")[0] === "Enabled"
                              ? classes.active
                              : classes.abuse
                          }
                        >
                          {this.state.wifiEnabled2}
                        </Typography>
                      </Grid>
                    </Paper>

                    <Grid
                      item
                      container
                      style={{ marginTop: "-12px" }}
                      xs={12}
                      sm={12}
                    >
                      <Paper
                        className={`${classes.papers} ${classes.connectivityTile}`}
                      >
                        <Typography
                          style={{
                            marginBottom: "10px",
                            fontSize: "12px",
                            fontWeight: "bold"
                          }}
                        >
                          Connected Devices{" "}
                          <CachedIcon
                            style={{ marginLeft: "15px" }}
                            className={classes.cachedIconSmallTile}
                          />
                        </Typography>

                        <Typography
                          style={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            color: "purple",
                            textAlign: "center"
                          }}
                        >
                          {/* //TODO - use some state here instead//  12 */}
                        </Typography>

                        <Typography
                          style={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "blue",
                            textAlign: "right",
                            float: "right",
                            cursor: "pointer",
                            margin: "70px 0px 0px 5px"
                          }}
                        >
                          <span
                            data-toggle="modal"
                            onClick={this.openModal.bind(this)}
                          >
                            {"More Info >>"}
                          </span>
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>

                  <Grid item container xs={6} sm={6}>
                    <Paper
                      className={`${classes.papers} ${classes.connectivityTile}`}
                    >
                      <Typography
                        style={{
                          marginBottom: "10px",
                          fontSize: "12px",
                          fontWeight: "bold"
                        }}
                      >
                        TR143{" "}
                        <CachedIcon className={classes.cachedIconSmallTile} />
                      </Typography>
                      <Grid container>
                        <Typography
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                        >
                          {/* //TODO - use some state here instead//  19Mbps */}
                        </Typography>
                        <Typography
                          style={{
                            marginLeft: "5px",
                            color: "#00CCFF",
                            fontWeight: "bold",
                            fontSize: "14px"
                          }}
                        >
                          {/* //TODO - use some state here instead//  <ArrowUpwardIcon></ArrowUpwardIcon> */}
                          {/* //TODO - use some state here instead// <span style={{ position: "absolute" }}>Up</span> */}
                        </Typography>
                      </Grid>

                      <Grid container>
                        <Typography
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                        >
                          {/* //TODO - use some state here instead//  43Mbps */}
                        </Typography>
                        <Typography
                          style={{
                            marginLeft: "5px",
                            color: "rgba(233,77,84,0.81)",
                            fontWeight: "bold",
                            fontSize: "14px"
                          }}
                        >
                          {/* //TODO - use some state here instead// <ArrowDownwardIcon> </ArrowDownwardIcon> */}
                          {/* //TODO - use some state here instead//  <span style={{ position: "absolute" }}>Down</span> */}
                        </Typography>
                      </Grid>
                    </Paper>
                    <Grid
                      item
                      container
                      style={{ marginTop: "-12px" }}
                      xs={12}
                      sm={12}
                    >
                      <Paper
                        className={`${classes.papers} ${classes.connectivityTile}`}
                      >
                        <Typography
                          style={{
                            marginBottom: "10px",
                            fontSize: "12px",
                            fontWeight: "bold"
                          }}
                        >
                          Line State Test{" "}
                          <CachedIcon className={classes.cachedIconSmallTile} />
                        </Typography>
                        <Typography
                          style={{ fontSize: "14px" }}
                          color="textSecondary"
                        >
                          {/* Stability */}
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "#00CCFF"
                          }}
                        >
                          {/* //TODO - use some state here instead//  FTTN/B */}
                        </Typography>

                        <Typography
                          style={{ fontSize: "14px" }}
                          color="textSecondary"
                        >
                          {/* In Home Wiring LQD */}
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "#00CCFF"
                          }}
                        >
                          {/* //TODO - use some state here instead//  FTTN/B */}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>

          <div style={{ marginLeft: "10%", width: "80%" }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Paper
                  className={`${classes.papers} ${classes.provisioningTile}`}
                >
                  <Typography
                    style={{
                      marginBottom: "10px",
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}
                  >
                    Provisioning Match{" "}
                    <CachedIcon
                      className={
                        this.state.stopAnimation
                          ? classes.cachedIcon
                          : classes.cachedIconAnimating
                      }
                    />
                  </Typography>
                  <Grid item container xs={12}>
                    <Typography color="textSecondary">Speed</Typography>
                    <Typography
                      style={{ marginLeft: "47%" }}
                      color="textSecondary"
                    >
                      {/* AVC */}
                    </Typography>
                  </Grid>

                  <Grid item container xs={12}>
                    <Typography
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                    >
                      {this.state.speedProfile}
                    </Typography>
                    <Typography
                      style={{
                        marginLeft: "34%",
                        fontWeight: "bold",
                        fontSize: "14px"
                      }}
                    >
                      {/* //TODO - use some state here instead//  XXXX XXXXXXX */}
                    </Typography>
                  </Grid>

                  <Grid item container xs={12}>
                    <Typography color="textSecondary">{/* CVC */}</Typography>
                    <Typography
                      style={{ marginLeft: "49%" }}
                      color="textSecondary"
                    >
                      {/* CTAG */}
                    </Typography>
                  </Grid>

                  <Grid item container xs={12}>
                    <Typography
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                    >
                      {/* //TODO - use some state here instead// XXXX XXXXXXX */}
                    </Typography>
                    <Typography
                      style={{
                        marginLeft: "34%",
                        fontWeight: "bold",
                        fontSize: "14px"
                      }}
                    >
                      {/* //TODO - use some state here instead//  XXXX XXXXXXX */}
                    </Typography>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item container xs={6} sm={2}>
                {/* <Paper
                  className={`${classes.papers} ${classes.radiusDropoutTile}`}
                >
                  TBD - What info to show here?
                </Paper> */}
              </Grid>

              <Grid item container xs={6} sm={2}>
                <Paper
                  className={`${classes.papers} ${classes.radiusDropoutTile}`}
                >
                  <Typography
                    style={{
                      marginBottom: "10px",
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}
                  >
                    Radius Dropouts
                    <CachedIcon
                      className={
                        this.state.stopAnimation
                          ? classes.cachedIconSmallTile
                          : classes.cachedIconAnimating
                      }
                    />
                  </Typography>
                  <Typography
                    style={{ fontSize: "14px" }}
                    color="textSecondary"
                  >
                    Last 24 hours
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold"
                    }}
                    className={this.getRadiusDropoutFormatting(
                      this.state.radiusDropouts?.last24
                    )}
                  >
                    {this.state.radiusDropouts?.last24}
                  </Typography>
                  <Typography
                    style={{ fontSize: "14px" }}
                    color="textSecondary"
                  >
                    Last 48 hours
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold"
                    }}
                    className={this.getRadiusDropoutFormatting(
                      this.state.radiusDropouts?.last48
                    )}
                  >
                    {this.state.radiusDropouts?.last48}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item container xs={6} sm={2}>
                <Paper
                  className={`${classes.papers} ${classes.radiusDropoutTile}`}
                >
                  <Typography
                    style={{
                      marginBottom: "10px",
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}
                  >
                    Last Modem Reboot{" "}
                    <CachedIcon
                      style={{ marginLeft: "10px" }}
                      className={classes.cachedIconSmallTile}
                    />
                  </Typography>
                  <Typography
                    style={{ fontSize: "14px" }}
                    color="textSecondary"
                  >
                    {/* Date */}
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#ffae42"
                    }}
                  >
                    {/* //TODO - use some state here instead//  25/03/20 */}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </div>

          <Footer />
        </div>
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/",
            // instead of ORing with false or with this.props.isAuthenticated
            state: { isLoggedIn: this.state?.isLoggedIn || false }
          }}
        />
      );
    }
  }
}

// export default withStyles(styles as any)(Dashboard);
// connect to the store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles as any)(Dashboard));
