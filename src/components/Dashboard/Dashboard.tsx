import React, { Component } from "react";
// import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
// import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';


// default style hook from material-ui
const styles = (theme: any) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      background: 'teal'
    },

    tileContainer: {
      height:"550px", 
      width:"100%", 
      textAlign:"center", 
      border: "2px solid black",
      display:"inline-block",
      margin:"0 auto",
      marginTop: "20px"
    },
    div:{
      display: 'flex',
      flexDirection: 'row wrap',
      padding: 20,
      width: '100%'
    },
    paperLeft:{
      flex: 1,
      height: '100%',
      margin: 10,
      textAlign: 'center',
      padding: 10
    },
    paperRight:{
      // height: 600,
      flex: 4,
      margin: 10,
      textAlign: 'center',
    },

    topTile: {
      display: 'flex',
      flexDirection: 'row wrap',
      padding: 20,
      width: '80%',
      marginTop: '15px',
      marginLeft: '10%',
      backgroundColor: 'white'
    }

  });


class Dashboard extends Component <any> {
    render() {
        console.log('in dashboard component ', this.props, 
        this.props.location.state.isLoggedIn);

        const { classes } = this.props as any;

        return (
            <div>
            <Header {...this.props}
            />

            <div style={{marginTop:"20px", marginLeft: "10%"}}>
              <Grid id="top-row" container >
                <Grid item xs={1}>
                  <Typography  variant="h6" style={{color:"teal"}}>
                    Customer
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography  variant="h6">
                    Jane Bird
                  </Typography>
                </Grid>
              </Grid>
              <Grid id="bottom-row" container >
                <Grid item xs={1}>
                  <Typography variant="h6" style={{fontSize:"12px", fontWeight:"bold"}}>
                  Contact number
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography  variant="h6" style={{fontSize:"12px"}}>
                    0400 000 000
                  </Typography>
                </Grid>
              </Grid>
            </div>

            <div className={classes.topTile}>
              <Grid item xs={12}>
                {/* <Paper className={classes.paper}>xs=12</Paper> */}
              <div  style={{margin: "20px", width:"80%", height:"100px"}}></div>
              </Grid>
            </div>

           
           
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              {/* <div className={classes.tileContainer}> Tiled view layout placeholder </div> */}
              <Box mt={8}>
                <Footer />
              </Box>
            
            </Container>
            </div>
          );
    }
}

export default withStyles(styles as any)(Dashboard);

