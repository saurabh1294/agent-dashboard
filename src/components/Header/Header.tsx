import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

import Avatar from "@material-ui/core/Avatar";
import {
  fade,
  withStyles,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

import NativeSelect from "@material-ui/core/NativeSelect";
import Grid from "@material-ui/core/Grid";

// default style hook from material-ui
const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3)
      }
    },
    input: {
      // borderRadius: 4,
      // position: 'relative',
      backgroundColor: "#00332E",
      border: "1px solid",
      fontSize: 16,
      padding: "5px 26px 10px 12px",
      borderColor: "#00332E",
      color: "white",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
      }
    }
  })
)(InputBase);

const styles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  }
}));

export class Header extends React.Component<any, any> {
  state = {
    profileClicked: false
  };

  handleSearch(event: any) {
    if (event.charCode === 13) {
      console.log("Searching for", event.target.value);
    }
  }

  handleSelect(event: any) {
    console.log("ID Type", event.target.value);
  }

  async handleProfileDropdown(event: any) {
    await this.setState({ profileClicked: !this.state.profileClicked });
  }

  render() {
    const { classes } = this.props as any;

    console.log(this.props, "props in header.tsx");

    return (
      <div className={classes.root}>
        <AppBar style={{ background: "#004D45" }} position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon style={{ color: "#80FFF2" }} />
            </IconButton>
            <Typography className={classes.title} variant="h6">
              Just<span style={{ fontWeight: "bold" }}>Fix</span>
              <span style={{ color: "yellow" }}>it</span>
              <span style={{ color: "#80FFF2", position: "absolute" }}>
                {" "}
                ʸᵉˢ
              </span>
            </Typography>

            {this.props.location && this.props.location?.state?.isLoggedIn && (
              <div className={classes.search}>
                <Grid item xs={2}>
                  <Typography
                    style={{ position: "absolute", marginLeft: "15%" }}
                    variant="h6"
                  >
                    <span style={{ fontWeight: "bold" }}>Search</span>
                  </Typography>
                </Grid>

                <Grid item xs={2} spacing={5}>
                  <NativeSelect
                    style={{ position: "absolute", marginLeft: "22%" }}
                    id="demo-customized-select-native"
                    onChange={this.handleSelect}
                    input={<BootstrapInput />}
                  >
                    <option
                      aria-label="None"
                      value="ID Type"
                      style={{ backgroundColor: "#00332E", color: "white" }}
                    >
                      ID Type
                    </option>
                    <option
                      value={"Username"}
                      style={{ backgroundColor: "#00332E", color: "white" }}
                    >
                      Username
                    </option>
                    <option
                      value={"FNN Number"}
                      style={{ backgroundColor: "#00332E", color: "white" }}
                    >
                      FNN Number
                    </option>
                  </NativeSelect>
                </Grid>

                <Grid item xs={2}>
                  <InputBase
                    startAdornment={<SearchIcon />}
                    placeholder="Search"
                    onKeyPress={this.handleSearch}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      background: "#00332E",
                      marginLeft: "480px",
                      width: "200px",
                      padding: "4px 0px 0px 0px"
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </Grid>
              </div>
            )}

            {this.props.location && this.props.location?.state?.isLoggedIn && (
              <div
                style={{
                  marginLeft: "25%",
                  marginTop: "20px",
                  display: "flex",
                  bottom: "10px"
                }}
              >
                LoggedIn Agent:
                <Avatar
                  alt="Profile Avatar"
                  style={{
                    display: "flex",
                    marginLeft: "10px",
                    bottom: "10px",
                    backgroundColor: "teal",
                    cursor: "pointer"
                  }}
                >
                  <span onClick={e => this.handleProfileDropdown(e)}>JB</span>
                </Avatar>
                {this.state.profileClicked && (
                  <Paper
                    className={classes.paper}
                    style={{
                      position: "absolute",
                      margin: "30px 40px",
                      color: "white",
                      borderRadius: "0px",
                      background: "#00332E"
                    }}
                  >
                    <MenuList>
                      <MenuItem>Profile</MenuItem>
                      <MenuItem>My account</MenuItem>
                      <MenuItem>Logout</MenuItem>
                    </MenuList>
                  </Paper>
                )}
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles as any)(Header);
