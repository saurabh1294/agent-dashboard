import React, { Component } from "react";
// import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import { Paper, withTheme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

import Divider from "@material-ui/core/Divider";

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
    padding: "15px"
  },

  serviceInfoTile2: {
    borderRadius: "0",
    minHeight: "300px",
    fontWeight: "bold",
    lineHeight: "25px",
    padding: "15px"
  },

  connectivityTile: {
    borderRadius: "0",
    minHeight: "130px",
    fontWeight: "bold",
    lineHeight: "25px",
    padding: "20px"
  },

  provisioningTile: {
    borderRadius: "0",
    minHeight: "150px",
    fontWeight: "bold",
    lineHeight: "25px",
    padding: "20px"
  },

  radiusDropoutTile: {
    borderRadius: "0",
    minHeight: "150px",
    fontWeight: "bold",
    lineHeight: "25px",
    padding: "20px"
  },

  title: {
    fontWeight: "bold",
    fontSize: "24px",
    margin: "15px 15px -2px"
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
                    <Typography variant="body2" gutterBottom>
                      DIMPS
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
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
                    <Typography variant="body2" gutterBottom>
                      ISE Prov DB
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
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
                    <Typography variant="body2" gutterBottom>
                      AVC
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
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
                    <Typography variant="body2" gutterBottom>
                      NBN
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
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
                    <Typography variant="body2" gutterBottom>
                      Co-existence
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
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
            <Grid item xs={6} sm={6}>
              <Paper className={`${classes.paper} ${classes.header1}`}>
                Service Information
              </Paper>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Paper className={`${classes.paper} ${classes.header2}`}>
                Connectivity
              </Paper>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Paper className={`${classes.paper} ${classes.header3}`}>
                Performance & Stability
              </Paper>
            </Grid>
          </Grid>
        </div>

        <div style={{ marginLeft: "10%", marginTop: "20px", width: "80%" }}>
          <Grid container spacing={1}>
            <Grid item xs={6} sm={3}>
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
            </Grid>
          </Grid>
        </div>

        <div style={{ marginLeft: "10%", width: "80%" }}>
          <Grid container spacing={1}>
            <Grid item xs={6} sm={6}>
              <Paper
                className={`${classes.papers} ${classes.provisioningTile}`}
              >
                Service Information
              </Paper>
            </Grid>
            <Grid item container xs={6} sm={2}>
              <Paper
                className={`${classes.papers} ${classes.radiusDropoutTile}`}
              >
                Service Information
              </Paper>
            </Grid>

            <Grid item container xs={6} sm={2}>
              <Paper
                className={`${classes.papers} ${classes.radiusDropoutTile}`}
              >
                Service Information
              </Paper>
            </Grid>

            <Grid item container xs={6} sm={2}>
              <Paper
                className={`${classes.papers} ${classes.radiusDropoutTile}`}
              >
                Service Information
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
