import React from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Redirect } from 'react-router'


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
  error: {
    color: 'red',
    textAlign: 'left'
  }
});


export class App extends React.Component {
  state = {
    username: '', 
    password: '',
    usernameError: false,
    passwordError: false, 
    authError: false,
    isLoggedIn: false
  };

  async handleChange(e: any, type: any) {
    const value = e.target.value;
    
    if (type === 'password')
      await this.setState({password : value});

    if (type === 'username')
      await this.setState({username : value});

    if (type === 'password') {
      if (this.state.password.length === 0)
        await this.setState({passwordError: true});
      else
        await this.setState({passwordError: false});
    }
    
    if (type === 'username') {
      if (this.state.username.length === 0)
        await this.setState({usernameError: true});
      else
        await this.setState({usernameError: false});
    }   
  }

  async handleLogin(e: any) {
    console.log(this.state);
    e.preventDefault();
    
    if (this.state.password.length === 0)
      this.setState({passwordError: true});
    
    if (this.state.username.length === 0)
      this.setState({usernameError: true});

    // test code to check login credentials - use try catch when API is ready
    if (this.state.username === '1331234' && this.state.password === 'test123') {
      await this.setState({isLoggedIn : true});
    } else {
      await this.setState({authError : true});
    }
  }

  render() {
    const { classes } = this.props as any;

    if (this.state.isLoggedIn) {
      return (
        <Redirect to={{
          pathname: '/dashboard',
          state: { isLoggedIn: this.state.isLoggedIn }
          }}
        />
      );
    }

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
              id="username"
              label="Staff Auth ID"
              name="username"
              autoComplete="username"
              error={this.state.username === '' && this.state.usernameError}
              helperText={this.state.username === '' && this.state.usernameError ? 'Username is required!' : ' '}
              onChange={e => this.handleChange(e, 'username')}
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
            {this.state.authError && <p className={classes.error}>Authentication failed</p>}
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