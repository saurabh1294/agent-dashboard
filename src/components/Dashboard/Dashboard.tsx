import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
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
    }
  });


class Dashboard extends React.Component {
    render() {
        console.log('in dashboard component ', this.props);
        return (
            <div>
            <Header {...this.props}
            />
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