import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';

import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

// default style hook from material-ui
const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    }
  },
}));



export class Header extends React.Component <any, any> {
  render() {
    const { classes } = this.props as any;
    
    console.log(this.props, 'props');

    return (
        <div className={classes.root}>
          <AppBar style={{ background: '#004D45' }} position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <MenuIcon style={{ color: '#80FFF2' }} />
              </IconButton>
              <Typography className={classes.title} variant="h6" noWrap>
                Just<span style={{fontWeight: 'bold'}}>Fix</span>
                <span style={{color: 'yellow'}}>it</span><span style={{color: '#80FFF2'}}> ʸᵉˢ</span>
              </Typography>

              {this.props.location && this.props.location?.state?.isLoggedIn && <div className={classes.search}>
                <InputBase
                  startAdornment={<SearchIcon />}
                  placeholder="Search Customer"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  style={{'color': 'white', 'fontWeight': 'bold', 
                  'background': '#00332E', 'marginLeft': '75px'}}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>}
              {/* show a profile icon with logout in menu dropdown here is isLoggedIn is true */}
            </Toolbar>
          </AppBar>
        </div>
      );
  }  
}

export default withStyles(styles as any)(Header);