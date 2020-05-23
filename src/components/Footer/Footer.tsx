
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import React from "react";


export class Footer extends React.Component {
    // constructor(props: any) {
    //     super(props);
    // }

    render() {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
              {`Copyright ©${new Date().getFullYear()} Singtel Optus Pty Limited. `}
              <Link color="inherit" href="https://optus.com.au">
                Visit Site
              </Link>{' '}
              {'.'}
            </Typography>
        );
    }
}