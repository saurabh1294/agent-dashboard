import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
// import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CachedIcon from "@material-ui/icons/Cached";

const styles = (theme: any) => ({
  "@global": {
    html: {
      [theme.breakpoints.up("sm")]: {
        fontSize: 15
      }
    }
  },
  root: {
    padding: theme.spacing(2),
    background: "white",
    marginLeft: "-40px",
    maxWidth: 550
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  title: {
    textAlign: "center",
    color: "black"
  }
});

interface Column {
  id: "device" | "signalStrength" | "channel";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "device", label: "Device", minWidth: 170 },
  { id: "signalStrength", label: "Signal\u00a0Strength", minWidth: 100 },
  {
    id: "channel",
    label: "Channel",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US")
  }
];

interface Data {
  device: string;
  signalStrength: string;
  channel: string;
}

function createData(
  device: string,
  signalStrength: string,
  channel: string
): Data {
  return { device, signalStrength, channel };
}

const rows = [
  createData("XnhbkjaAjkn 233", "Fair", "2.4Ghz"),
  createData("20kjnv YEEjjasd2", "Good", "5Ghz"),
  createData("Dad's iPhone", "Fair", "2.4Ghz"),
  createData("AcerInspire5000", "Bad", "5Ghz"),
  createData("HBhubbUU", "N/A", "Fixed"),
  createData("890CVBiOs", "N/A", "Fixed")
  // TODO more data will add here
];

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 550
  },
  container: {
    maxHeight: 440,
    marginTop: "20px"
  },
  modemNote: {
    color: "rgba(233,77,84,0.81)",
    fontSize: "18px",
    fontWeight: "bold"
  },
  cachedIcon: {
    display: "inline",
    position: "relative",
    margin: "2px -5px -5px 10px",
    color: "gray"
  },
  tableHeader: {
    fontWeight: "bold",
    fontSize: "18px"
  },
  cellFormatting: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "gray"
  },
  fair: {
    color: "#FFAE42"
  },
  good: {
    color: "#00875A"
  },
  bad: {
    color: "red"
  }
});

const DialogTitle = withStyles(styles as any)((props: any) => {
  const { children, classes, onClose, ...other } = props;

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
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

export function GetClass(value: string) {
  const classes = useStyles();

  const classMap = {
    [value]: "",
    Fair: classes.fair,
    Good: classes.good,
    Bad: classes.bad
  };

  return classMap[value];
}

export function CustomizedDialogs(props: any) {
  const [open, setOpen] = React.useState(true);

  const classes = useStyles();

  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  const handleClose = () => {
    props.parentCallback(false);

    setOpen(false);
  };

  return (
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
            Connected Devices as of {new Date().toLocaleString()}
            <CachedIcon className={classes.cachedIcon} />
          </DialogTitle>
          <DialogContent dividers>
            <span className={classes.modemNote}>
              {" "}
              Note:- Not all modems can record signal strength{" "}
            </span>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map(column => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        className={classes.tableHeader}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* TODO if using pagination use this rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
                  {rows.map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columns.map(column => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              className={
                                column.id === "signalStrength"
                                  ? `${GetClass(value)} ${
                                      classes.cellFormatting
                                    }`
                                  : classes.cellFormatting
                              }
                              key={column.id}
                              align={column.align}
                            >
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        </Dialog>
      </Grid>
    </div>
  );
}

export class ConnectedDevicesModal extends React.Component<any, any> {
  render() {
    const { modalCloseCallback } = this.props;

    return <CustomizedDialogs parentCallback={modalCloseCallback} />;
  }
}

export default withStyles(styles as any)(ConnectedDevicesModal);
