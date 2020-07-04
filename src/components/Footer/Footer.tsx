import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import React from "react";

export class Footer extends React.Component {
  // constructor(props: any) {
  //     super(props);
  // }

  render() {
    return (
      <Container
        style={{ height: "75px", background: "teal", width: "100%" }}
        maxWidth={false}
      >
        <CssBaseline />
        <Box mt={8}>
          <Typography
            variant="body2"
            align="center"
            style={{
              lineHeight: "75px",
              fontWeight: "bold",
              color: "white",
              fontSize: "20px"
            }}
          >
            {`Copyright ©${new Date().getFullYear()} Singtel Optus Pty Limited. `}
            <Link color="inherit" href="https://optus.com.au">
              Visit Site
            </Link>{" "}
            {"."}
          </Typography>
        </Box>
      </Container>
    );
  }
}
