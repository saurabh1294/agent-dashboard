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
        style={{
          margin: "0px",
          padding: "0px",
          height: "70px",
          background: "teal"
        }}
      >
        <CssBaseline />
        <Box mt={8}>
          <Typography variant="body2" align="center">
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
