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

import Divider from "@material-ui/core/Divider";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import CachedIcon from "@material-ui/icons/Cached";
import { fetchCustomerInfo } from "../../actions/actions";

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
    isAuthenticated: state.loginReducer.data?.sessionInfo?.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    // same effect
    fetchCustomerInfo: (searchQuery: string) =>
      dispatch(fetchCustomerInfo(searchQuery)),

    logoutUser: () => dispatch(logout()),
    checkIfAgentAuthenticated: () => dispatch(isAuthenticated())
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
    lineHeight: "25px",
    padding: "15px"
  },

  header2: {
    borderRadius: "0",
    height: "auto",
    backgroundColor: "purple",
    color: "white",
    fontWeight: "bold",
    lineHeight: "25px",
    padding: "15px"
  },

  header3: {
    borderRadius: "0",
    height: "auto",
    backgroundColor: "#4B0082",
    color: "white",
    fontWeight: "bold",
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
    color: "gray"
  },

  cachedIconSmallTile: {
    display: "inline",
    position: "absolute",
    marginLeft: "30px",
    color: "gray"
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
    isLoggedIn: false // TODO temp state remove it
  };

  componentDidMount() {
    try {
      this.getAuthenticationStatus().then((data: any) =>
        console.log(
          "got here in componentDidMount of Dashboard.tsx: getAuthenticationStatus()",
          this.props
        )
      );
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

  getCustomerInfoCallback(data: any) {
    // TODO set state here to show info on tiles using data which has response from graphql
    // const result = {
    //   data: {
    //     getCustomer: {
    //       customer: {
    //         accessType: "HFC",
    //         addressLines: [
    //           "Unit 2 23",
    //           "CARRINGTON Street",
    //           "NORTH STRATHFIELD NSW 2137"
    //         ],
    //         avcID: "AVC000000000001",
    //         cvcID: "CVC000000000001",
    //         firstName: "CHRISTINA",
    //         lastName: "LIM",
    //         macID: "123456789ABC",
    //         priID: "PRI400035253337",
    //         speed: "1138",
    //         username: "limchristina"
    //       },
    //       result: "GOOD"
    //     }
    //   }
    // };
    // alert(JSON.stringify(data));
    const customer = data?.customer;
    this.setState({ avcId: customer?.avcID });
    this.setState({ priId: customer?.priID });
    this.setState({ username: customer?.username });
    this.setState({ cvcId: customer?.cvcID });
    this.setState({ firstName: customer?.firstName });
    this.setState({ lastName: customer?.lastName });
  }

  render() {
    // TODO check if user is logged in or not, if yes then render this else redirect to home page
    // console.log(
    //   "in dashboard component ",
    //   this.props,
    //   this.props.location.state?.isLoggedIn,
    //   this.props.location.state?.isLoggedOut,
    //   this.state
    // );

    const { classes } = this.props as any;

    // console.log(
    //   "Checking if agent is authenticated",
    //   this.getAuthenticationStatus(),
    //   this.state
    // );
    // TODO check isAgentAuthenticated here instead of this flag
    if (this.props?.isAuthenticated === "true" || this.props.location.state?.isLoggedIn) {
      return (
        <div>
          <InstructionsModal />
          <Header
            {...this.props}
            getCustomerInfoCallback={(data: any) =>
              this.getCustomerInfoCallback(data)
            }
          />

          <div style={{ marginTop: "10px", marginLeft: "9%" }}>
            <Box display="flex" flexDirection="row" p={1} m={1}>
              <Box p={1}>
                <Typography variant="h6" style={{ color: "teal" }}>
                  Customer{" "}
                  <span style={{ color: "black" }}>
                    {`${this.state.firstName} ${this.state.lastName}`}
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
                        {/* Service Status{" "} */}
                        <CachedIcon className={classes.cachedIcon} />
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                      >
                        {/* DIMPS */}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          color: "#00CCFF",
                          fontWeight: "bold",
                          fontSize: "18px"
                        }}
                      >
                        {/* //TODO - use some state here instead//  Online */}
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
                        {/* Account Status{" "} */}
                        <CachedIcon className={classes.cachedIcon} />
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                      >
                        {/* ISE Prov DB */}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        style={{
                          color: "rgba(233, 77, 84, 0.81)",
                          fontWeight: "bold",
                          fontSize: "18px"
                        }}
                      >
                        {/* //TODO - use some state here instead// Suspended */}
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
                        XXXXXXXX
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
                        XXXXXXXX
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
                        <CachedIcon className={classes.cachedIcon} />
                      </Typography>

                      <Typography
                        gutterBottom
                        color="textSecondary"
                        style={{ marginTop: "20px", fontSize: "11px" }}
                      >
                        Modem Model
                      </Typography>
                      <Typography variant="body2" gutterBottom>
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
                        {/* //TODO - use some state here instead//  XXXX */}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {/* //TODO - use some state here instead//  XXXXXX */}
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
                        Wifi Status{" "}
                        <CachedIcon className={classes.cachedIconSmallTile} />
                      </Typography>
                      <Grid container>
                        <Typography
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                        >
                          {/* //TODO - use some state here instead// 2.4 GHz */}
                        </Typography>
                        <Typography
                          style={{
                            marginLeft: "20px",
                            color: "#00CCFF",
                            fontWeight: "bold",
                            fontSize: "14px"
                          }}
                        >
                          {/* //TODO - use some state here instead// Enabled */}
                        </Typography>
                      </Grid>

                      <Grid container>
                        <Typography
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                        >
                          {/* //TODO - use some state here instead//  5 GHz */}
                        </Typography>
                        <Typography
                          style={{
                            marginLeft: "20px",
                            color: "#00CCFF",
                            fontWeight: "bold",
                            fontSize: "14px"
                          }}
                        >
                          {/* //TODO - use some state here instead//  Enabled */}
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
                          fontSize: "12px"
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
                    <CachedIcon className={classes.cachedIcon} />
                  </Typography>
                  <Grid item container xs={12}>
                    <Typography color="textSecondary">{/* Speed */}</Typography>
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
                      {/* //TODO - use some state here instead//  XXXX XXXXXXX */}
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
                    Radius Dropouts{" "}
                    <CachedIcon className={classes.cachedIconSmallTile} />
                  </Typography>
                  <Typography
                    style={{ fontSize: "14px" }}
                    color="textSecondary"
                  >
                    {/* Last 24/48 hours */}
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "rgba(233,77,84,0.81)"
                    }}
                  >
                    {/* //TODO - use some state here instead//  15 drops */}
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

          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box mt={8}>
              <Footer />
            </Box>
          </Container>
        </div>
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/",
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
