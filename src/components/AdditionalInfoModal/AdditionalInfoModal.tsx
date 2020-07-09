import React from "react";

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
  LineMarkSeries,
  MarkSeries,
  MarkSeriesCanvas,
  Hint
} from "react-vis";

import "../../../node_modules/react-vis/dist/style.css";

import { withStyles, makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 600
  },
  container: {
    maxHeight: 500,
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
    color: "#00CCFF"
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

export function generatePoints() {
  const points: any = [];

  const sessions = [
    {
      duration: 600,
      end: "2020-06-22T19:37:32Z",
      start: "2020-06-22T19:27:32Z"
    },
    {
      duration: 170400,
      end: "2020-06-24T18:59:38Z",
      start: "2020-06-22T19:39:38Z"
    },
    {
      duration: 617400,
      end: "2020-07-01T22:34:09Z",
      start: "2020-06-24T19:04:09Z"
    }
  ];

  for (let i = 0; i < sessions.length; i++) {
    const start = new Date(sessions[i].start) as any;
    const end = new Date(sessions[i].end) as any;
    console.log(
      start,
      start.getDate() + "/" + start.getMonth() + "/" + start.getFullYear(),
      end,
      end.getDate() + "/" + end.getMonth() + "/" + end.getFullYear()
    );
    console.log(
      start.getHours() + start.getMinutes() / 60 + start.getSeconds() / 3600,
      end.getHours() + end.getMinutes() / 60 + end.getSeconds() / 3600
    );

    const diffTime = Math.abs(start - end);

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffDays);

    let startMonth = start.getMonth() + 1;
    let endMonth = end.getMonth() + 1;

    let startObj = {
      x: start.getDate() /*+"/"+startMonth+"/"+start.getFullYear()*/,
      y: start.getHours() + start.getMinutes() / 60 + start.getSeconds() / 3600
    };
    //console.log(startObj);
    let interimObj = {};

    for (let t = 1; t <= diffDays - 1; t++) {
      let dt = new Date(
        startMonth + "/" + start.getDate() + "/" + start.getFullYear()
      );

      dt.setDate(dt.getDate() + 1);
      start.setDate(start.getDate() + 1);

      for (let hrs = 1; hrs <= 24; hrs++) {
        const month = dt.getMonth() + 1;
        interimObj = {
          x: dt.getDate() /*+"/"+month+"/"+dt.getFullYear()*/,
          y: hrs
        };
        points.push(interimObj);
      }
    }

    var endObj = {
      x: end.getDate() /*+"/"+endMonth+"/"+end.getFullYear()*/,
      y: end.getHours() + end.getMinutes() / 60 + end.getSeconds() / 3600
    };
    points.push(startObj);
    points.push(endObj);
    console.log("points", points);
  }
  return points;
}

export function CustomizedAdditionalInfoDialog(props: any) {
  const [open, setOpen] = React.useState(true);

  const classes = useStyles();

  const handleClose = () => {
    props.parentCallback(false);

    setOpen(false);
  };

  const dataPoints = generatePoints();

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
            <span style={{ fontSize: "12px" }}>
              Radius dropout history for past month as of{" "}
              {new Date().toLocaleString()}
            </span>
            <CachedIcon className={classes.cachedIcon} />
          </DialogTitle>
          <DialogContent dividers>
            {/* <XYPlot style={{display:"inline"}} width={450} height={450}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis title="Days" />
              <YAxis title="No. of Radius Dropouts"/>
              <LineSeries
                data={[
                  { x: 0, y: 0 },
                  { x: 1, y: 0 },
                  { x: 2, y: 0 },
                  { x: 3, y: 0 },
                  { x: 4, y: 0 },
                  { x: 5, y: 0 },
                  { x: 6, y: 0 },
                  { x: 7, y: 0 },
                  { x: 8, y: 0 },
                  { x: 9, y: 0 },
                  { x: 10, y: 0 },
                  { x: 11, y: 1 },
                  { x: 12, y: 1 },
                  { x: 13, y: 3 },
                  { x: 14, y: 3 },
                  { x: 15, y: 3 },
                  { x: 16, y: 3 },
                  { x: 17, y: 3 },
                  { x: 18, y: 3 },
                  { x: 19, y: 3 },
                  { x: 20, y: 3 },
                  { x: 21, y: 3 },
                  { x: 22, y: 3 },
                  { x: 23, y: 3 },
                  { x: 24, y: 3 },
                  { x: 25, y: 3 },
                  { x: 26, y: 3 },
                  { x: 27, y: 3 },
                  { x: 28, y: 3 },
                  { x: 29, y: 3 }
                ]}
              />
              <Hint value={{ x: 1, y: 10 }} />
            </XYPlot> */}
            <XYPlot width={500} height={500} xType="ordinal" yDomain={[1, 24]}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis
                title={`Dates ${
                  new Date().getMonth() + 1
                }/${new Date().getFullYear()}`}
              />
              <YAxis title="Hours" />
              {/* <LineMarkSeries
        className="linemark-series-example"
        style={{
          strokeWidth: '3px'
        }}
        lineStyle={{stroke: 'red'}}
        markStyle={{stroke: 'blue'}}
        data={[
          {
            "x": "23/6/2020",
            "y": 5.458888888888889
          },
          {
            "x": "23/6/2020",
            "y": 5.625555555555556
          },
          {
            "x": "23/6/2020",
            "y": 5.660555555555556
          },
          {
            "x": "25/6/2020",
            "y": 4.993888888888889
          },
          {
            "x": "25/6/2020",
            "y": 5.069166666666667
          },
          {
            "x": "2/7/2020",
            "y": 8.569166666666666
          }
        ]}
      /> */}
              <LineMarkSeries
                className="linemark-series-example-2"
                curve={"curveMonotoneX"}
                data={dataPoints}
              />
            </XYPlot>

            {/* <ScatterPlot /> */}
          </DialogContent>
        </Dialog>
      </Grid>
    </div>
  );
}

const getRandomData = () => {
  return new Array(100).fill(0).map(row => ({
    x: Math.random() * 10,
    y: Math.random() * 20,
    size: Math.random() * 10,
    color: Math.random() * 10,
    opacity: Math.random() * 0.5 + 0.5,
    duration: Math.random() * 10
  }));
};

export class ScatterPlot extends React.Component<any, any> {
  randomData = getRandomData();
  value: string = "";

  state = {
    drawMode: 0,
    data: this.randomData,
    colorType: "typeA",
    value: false
  };

  colorRanges = {
    [this.value]: "",
    typeA: ["#59E4EC", "#0D676C"],
    typeB: ["#EFC1E3", "#B52F93"]
  };

  nextType = {
    [this.value]: "",
    typeA: "typeB",
    typeB: "typeA"
  };

  nextModeContent = {
    [this.value]: "",
    canvas: "SWITCH TO SVG",
    svg: "SWITCH TO CANVAS"
  };

  drawModes = ["canvas", "svg"];

  render() {
    const { drawMode, data, colorType } = this.state;
    const markSeriesProps: any = {
      animation: true,
      className: "mark-series-example",
      sizeRange: [5, 15],
      seriesId: "radius-dropouts-scatterplot",
      colorRange: this.colorRanges[colorType],
      opacityType: "literal",
      data,
      onNearestXY: (value: any) => this.setState({ value })
    };

    const mode = this.drawModes[drawMode];
    return (
      <div className="canvas-wrapper">
        <div className="canvas-example-controls">
          <div>{`MODE: ${mode}`}</div>
        </div>
        <XYPlot
          onMouseLeave={() => this.setState({ value: false })}
          width={600}
          height={300}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          {mode === "canvas" && <MarkSeriesCanvas {...markSeriesProps} />}
          {mode === "svg" && <MarkSeries {...markSeriesProps} />}
          {this.state.value ? <Hint value={this.state.value as any} /> : null}
        </XYPlot>
      </div>
    );
  }
}

export class AdditionalInfoModal extends React.Component<any, any> {
  render() {
    const { modalCloseCallback } = this.props;

    return (
      <CustomizedAdditionalInfoDialog parentCallback={modalCloseCallback} />
    );
  }
}

export default withStyles(styles as any)(AdditionalInfoModal);
