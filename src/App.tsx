import React, { Component } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';


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


export class App extends Component {
  state = {
    email: '', 
    password: '',
    emailError: false,
    passwordError: false, 
    email_error_text: null, 
    password_error_text: null,
    isLoggedIn: false
  };

  async handleChange(e: any, type: any) {
    const value = e.target.value;
    
    if (type === 'password')
      await this.setState({password : value});

    if (type === 'email')
      await this.setState({email : value});

    if (type === 'password') {
      if (this.state.password.length === 0)
        await this.setState({passwordError: true});
      else
        await this.setState({passwordError: false});
    }
    
    if (type === 'email') {
      if (this.state.email.length === 0)
        await this.setState({emailError: true});
      else
        await this.setState({emailError: false});
    }   
  }

  async handleLogin(e: any) {
    console.log(this.state);
    if (this.state.password.length === 0)
      this.setState({passwordError: true});
    
    if (this.state.email.length === 0)
      this.setState({emailError: true});

    // test code to check login credentials
    if (this.state.email === 'admin@optus.com.au' && this.state.password === 'test123') {
      await this.setState({isLoggedIn : true});
      alert('login successful.. redirecting');
      //e.preventDefault();
    } else {
      alert('login failed');
    }

    // e.preventDefault();
    // on auth successful handle redirection here
  }

  render() {
    const { classes } = this.props as any;

    return (
      <div>
      <Header {...this.props}
      isLoggedIn={this.state.isLoggedIn}
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={this.state.email === '' && this.state.emailError}
              helperText={this.state.email === '' && this.state.emailError ? 'Email is required!' : ' '}
              onChange={e => this.handleChange(e, 'email')}
              autoFocus
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={this.state.password === '' && this.state.passwordError}
              helperText={this.state.password === '' && this.state.passwordError ? 'Password is required!' : ' '}
              onChange={e => this.handleChange(e, 'password')}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={e => this.handleLogin(e)}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Footer />
        </Box>
      </Container>
      </div>
    );
  }
}


// App.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles as any)(App);