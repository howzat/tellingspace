import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import React from "react";

export const Copyright = (): JSX.Element => {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://toldspaces.com/">
              TOLDSPACES.COM
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
      </Typography>
    );
}