import React, { Component } from "react";
// import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
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
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.tileContainer}> Tiled view layout placeholder </div>
              <Box mt={8}>
                <Footer />
              </Box>
            
            </Container>
            </div>
          );
    }
}

export default withStyles(styles as any)(Dashboard);

