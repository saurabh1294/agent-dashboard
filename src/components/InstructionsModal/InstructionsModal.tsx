import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
// import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";

import { useCookies } from "react-cookie";

// let isCheckboxChecked = false;

const styles = (theme: any) => ({
  "@global": {
    html: {
      [theme.breakpoints.up("sm")]: {
        fontSize: 15
      }
    }
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
    background: "#2980B9"
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  title: {
    textAlign: "center",
    color: "white"
  }
});

const DialogTitle = withStyles(styles as any)((props: any) => {
  const { children, classes, onClose, ...other } = props;

  console.log(children, "children");

  return (
    <MuiDialogTitle disableTypography className={`${classes.root}`} {...other}>
      <Typography variant="h6" className={classes.title}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    maxWidth: "450px"
  }
}))(MuiDialogContent);

// const DialogActions = withStyles(theme => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(1)
//   }
// }))(MuiDialogActions);

export function CustomizedDialogs() {
  const [open, setOpen] = React.useState(true);
  const [cookies, setCookie] = useCookies(["hideModal"]);

  let [checked, setChecked] = React.useState(false);

  const handleClose = () => {
    // if (cookies.hasOwnProperty("checked")) {
    //   setCookie("hideModal", cookies["checked"]);
    // }
    console.log("cookies", cookies);
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCookie("checked", event.target.checked);
    setChecked(event.target.checked);
  };

  console.log(
    "cookies",
    cookies,
    cookies["checked"],
    cookies.hasOwnProperty("checked"),
    !cookies.hasOwnProperty("checked") || !cookies["checked"]
  );

  return !cookies.hasOwnProperty("checked") ||
    cookies["checked"] === "false" ? (
    <div>
      <Grid container spacing={2} style={{ margin: "auto" }}>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          PaperProps={{
            style: { borderRadius: 0 }
          }}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Instructions
          </DialogTitle>
          <DialogContent dividers>
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>
              Welcome to Just Fix it Dashboard
            </p>
            <Typography gutterBottom>
              1. Search for a customer in the top bar to pull up their current
              status, and useful information about their accounts performance
              and stability
            </Typography>
            <Typography gutterBottom style={{ marginTop: "15px" }}>
              2. Wait for important data to load into the
              <br />
              panels provided
            </Typography>
            <Typography
              gutterBottom
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                margin: "15px 0px 15px 0px"
              }}
            >
              <i>*Note: Some panels take longer than other to load due</i>
              <i>to their connection to different external systems</i>
            </Typography>
            <Button
              size="large"
              style={{
                background: "yellow",
                fontWeight: "bold",
                width: "100%",
                height: "50px",
                borderRadius: "0"
              }}
              onClick={handleClose}
            >
              Got it !
            </Button>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "primary checkbox" }}
            />{" "}
            <p style={{ fontWeight: "bold", display: "inline" }}>
              {" "}
              Don't show this again{" "}
            </p>
          </DialogContent>
        </Dialog>
      </Grid>
    </div>
  ) : null;
}

export class InstructionsModal extends React.Component<any, any> {
  render() {
    return <CustomizedDialogs />;
  }
}

export default withStyles(styles as any)(InstructionsModal);
