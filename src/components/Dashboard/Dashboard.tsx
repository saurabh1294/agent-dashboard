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

import Divider from "@material-ui/core/Divider";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

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
    padding: "15px"
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
    minHeight: "300px",
    fontWeight: "bold",
    lineHeight: "25px",
    padding: "15px",
    marginTop: "20px"
  },

  serviceInfoTile2: {
    borderRadius: "0",
    minHeight: "300px",
    fontWeight: "bold",
    lineHeight: "25px",
    padding: "15px",
    marginTop: "20px"
  },

  connectivityTile: {
    borderRadius: "0",
    minHeight: "146px",
    fontWeight: "bold",
    lineHeight: "25px",
    padding: "20px",
    marginTop: "20px",
    width: "100%"
  },

  provisioningTile: {
    borderRadius: "0",
    minHeight: "150px",
    fontWeight: "bold",
    lineHeight: "25px",
    padding: "20px",
    width: "100%"
  },

  radiusDropoutTile: {
    borderRadius: "0",
    minHeight: "150px",
    fontWeight: "bold",
    lineHeight: "25px",
    padding: "20px",
    width: "100%"
  },

  title: {
    fontWeight: "bold",
    fontSize: "20px"
  }
});

class Dashboard extends Component<any> {
  render() {
    console.log(
      "in dashboard component ",
      this.props,
      this.props.location.state.isLoggedIn
    );

    const { classes } = this.props as any;

    return (
      <div>
        <Header {...this.props} />

        <div style={{ marginTop: "10px", marginLeft: "9%" }}>
          <Box display="flex" flexDirection="row" p={1} m={1}>
            <Box p={1}>
              <Typography variant="h6" style={{ color: "teal" }}>
                Customer <span style={{ color: "black" }}> Jane Bird</span>
              </Typography>
            </Box>
          </Box>
        </div>
        {/* <div style={{ marginLeft: "10%", marginTop: "-70px", width: "80%" }}>
          <Grid container spacing={1}>
            <Grid item xs={6} sm={12}>
              <Paper className={`${classes.paper} ${classes.topTile}`}>
                General Service Status
              </Paper>
            </Grid>
          </Grid>
        </div> */}

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
                      Service Status
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
                        color: "#00CCFF",
                        fontWeight: "bold",
                        fontSize: "18px"
                      }}
                    >
                      Online
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
                      Account Status
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
                      color="textSecondary"
                      style={{
                        color: "rgba(233, 77, 84, 0.81)",
                        fontWeight: "bold",
                        fontSize: "18px"
                      }}
                    >
                      Suspended
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
                      NBN Network
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      AVC
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        color: "#00CCFF",
                        fontWeight: "bold",
                        fontSize: "18px"
                      }}
                    >
                      No Outage
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
                      PRI
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      NBN
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
                      Active
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
                      PRI
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      Co-existence
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        color: "#00CCFF",
                        fontWeight: "bold",
                        fontSize: "18px"
                      }}
                    >
                      Yes
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
                      XXXXXXXX
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
                      XXXXXXXX111222
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
                      XXXXXXXX
                    </Typography>

                    <Typography
                      gutterBottom
                      color="textSecondary"
                      style={{ fontSize: "11px" }}
                    >
                      CVC
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      XXXXXXXX
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
                      Modem Connected
                    </Typography>

                    <Typography
                      gutterBottom
                      color="textSecondary"
                      style={{ marginTop: "20px", fontSize: "11px" }}
                    >
                      Modem Model
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      XXXX XXXXX
                    </Typography>

                    <Typography
                      gutterBottom
                      color="textSecondary"
                      style={{ fontSize: "11px" }}
                    >
                      Modem Specs
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      XXXX
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      XXXXXX
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      XXXXXXXXXX
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      XXXXX XXXX
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      XX/XXXX
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
                      Line State Test
                    </Typography>
                    <Typography
                      style={{ fontSize: "14px" }}
                      color="textSecondary"
                    >
                      Service Status
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#00CCFF"
                      }}
                    >
                      FTTN/B
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
                      DIMPS
                    </Typography>
                    <Typography
                      style={{ fontSize: "14px" }}
                      color="textSecondary"
                    >
                      Phone Line Status
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#00CCFF"
                      }}
                    >
                      Active
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
                      Wifi Status
                    </Typography>
                    <Grid container>
                      <Typography
                        style={{ fontSize: "14px", fontWeight: "bold" }}
                      >
                        2.4 GHz
                      </Typography>
                      <Typography
                        style={{
                          marginLeft: "20px",
                          color: "#00CCFF",
                          fontWeight: "bold",
                          fontSize: "14px"
                        }}
                      >
                        Enabled
                      </Typography>
                    </Grid>

                    <Grid container>
                      <Typography
                        style={{ fontSize: "14px", fontWeight: "bold" }}
                      >
                        5 GHz
                      </Typography>
                      <Typography
                        style={{
                          marginLeft: "20px",
                          color: "#00CCFF",
                          fontWeight: "bold",
                          fontSize: "14px"
                        }}
                      >
                        Enabled
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
                        Connected Devices
                      </Typography>

                      <Typography
                        style={{
                          fontSize: "24px",
                          fontWeight: "bold",
                          color: "purple",
                          textAlign: "center"
                        }}
                      >
                        12
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
                      TR143
                    </Typography>
                    <Grid container>
                      <Typography
                        style={{ fontSize: "14px", fontWeight: "bold" }}
                      >
                        19Mbps
                      </Typography>
                      <Typography
                        style={{
                          marginLeft: "5px",
                          color: "#00CCFF",
                          fontWeight: "bold",
                          fontSize: "14px"
                        }}
                      >
                        <ArrowUpwardIcon></ArrowUpwardIcon>
                        <span style={{ position: "absolute" }}>Up</span>
                      </Typography>
                    </Grid>

                    <Grid container>
                      <Typography
                        style={{ fontSize: "14px", fontWeight: "bold" }}
                      >
                        43Mbps
                      </Typography>
                      <Typography
                        style={{
                          marginLeft: "5px",
                          color: "rgba(233,77,84,0.81)",
                          fontWeight: "bold",
                          fontSize: "14px"
                        }}
                      >
                        <ArrowDownwardIcon> </ArrowDownwardIcon>
                        <span style={{ position: "absolute" }}>Down</span>
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
                        Line State Test
                      </Typography>
                      <Typography
                        style={{ fontSize: "14px" }}
                        color="textSecondary"
                      >
                        Stability
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "#00CCFF"
                        }}
                      >
                        FTTN/B
                      </Typography>

                      <Typography
                        style={{ fontSize: "14px" }}
                        color="textSecondary"
                      >
                        In Home Wiring LQD
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "#00CCFF"
                        }}
                      >
                        FTTN/B
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>

        <div style={{ marginLeft: "10%", marginTop: "20px", width: "80%" }}>
          <Grid container spacing={1}>
            {/* <Grid item xs={6} sm={3}>
              <Paper
                className={`${classes.papers} ${classes.serviceInfoTile1}`}
              >
                Service Information
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper
                className={`${classes.papers} ${classes.serviceInfoTile2}`}
              >
                Connectivity
              </Paper>
            </Grid> */}

            {/* <Grid item container xs={6} sm={2}>
              <Paper
                className={`${classes.papers} ${classes.connectivityTile}`}
              >
                Service Information
              </Paper>
              <Grid
                item
                container
                style={{ marginTop: "10px" }}
                xs={12}
                sm={12}
              >
                <Paper
                  className={`${classes.papers} ${classes.connectivityTile}`}
                >
                  Service Information
                </Paper>
              </Grid>
            </Grid> */}

            {/* <Grid item container xs={6} sm={2}>
              <Paper
                className={`${classes.papers} ${classes.connectivityTile}`}
              >
                Service Information
              </Paper>
              <Grid
                item
                container
                style={{ marginTop: "10px" }}
                xs={12}
                sm={12}
              >
                <Paper
                  className={`${classes.papers} ${classes.connectivityTile}`}
                >
                  Service Information
                </Paper>
              </Grid>
            </Grid>

            <Grid item container xs={6} sm={2}>
              <Paper
                className={`${classes.papers} ${classes.connectivityTile}`}
              >
                Service Information
              </Paper>
              <Grid
                item
                container
                style={{ marginTop: "10px" }}
                xs={12}
                sm={12}
              >
                <Paper
                  className={`${classes.papers} ${classes.connectivityTile}`}
                >
                  Service Information
                </Paper>
              </Grid>
            </Grid> */}
          </Grid>
        </div>

        <div style={{ marginLeft: "10%", width: "80%" }}>
          <Grid container spacing={1}>
            <Grid item xs={6} sm={6}>
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
                  Provisioning Match
                </Typography>
                <Grid container>
                  <Typography color="textSecondary">Speed</Typography>
                  <Typography
                    style={{ marginLeft: "200px" }}
                    color="textSecondary"
                  >
                    AVC
                  </Typography>
                </Grid>

                <Grid container>
                  <Typography style={{ fontSize: "14px", fontWeight: "bold" }}>
                    XXXX XXXXXXX
                  </Typography>
                  <Typography
                    style={{
                      marginLeft: "138px",
                      fontWeight: "bold",
                      fontSize: "14px"
                    }}
                  >
                    XXXX XXXXXXX
                  </Typography>
                </Grid>

                <Grid container>
                  <Typography color="textSecondary">CVC</Typography>
                  <Typography
                    style={{ marginLeft: "210px" }}
                    color="textSecondary"
                  >
                    CTAG
                  </Typography>
                </Grid>

                <Grid container>
                  <Typography style={{ fontSize: "14px", fontWeight: "bold" }}>
                    XXXX XXXXXXX
                  </Typography>
                  <Typography
                    style={{
                      marginLeft: "138px",
                      fontWeight: "bold",
                      fontSize: "14px"
                    }}
                  >
                    XXXX XXXXXXX
                  </Typography>
                </Grid>
              </Paper>
            </Grid>
            <Grid item container xs={6} sm={2}>
              <Paper
                className={`${classes.papers} ${classes.radiusDropoutTile}`}
              >
                TBD - What info to show here?
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
                  Radius Dropouts
                </Typography>
                <Typography style={{ fontSize: "14px" }} color="textSecondary">
                  Last 24/48 hours
                </Typography>
                <Typography
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "rgba(233,77,84,0.81)"
                  }}
                >
                  15 drops
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
                  Last Modem Reboot
                </Typography>
                <Typography style={{ fontSize: "14px" }} color="textSecondary">
                  Date
                </Typography>
                <Typography
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#ffae42"
                  }}
                >
                  25/03/20
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
  }
}

export default withStyles(styles as any)(Dashboard);
