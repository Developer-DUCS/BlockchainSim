import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const NavBar = (props) => {
  const { toggleTheme } = props;

  // Can be used in future for smaller devices
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box sx={{ flexGrow: 1, mb: 5 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Beyond the Block
            </Link>
          </Typography>
          <Switch onChange={toggleTheme} />
          <Button
            component={Link}
            to={"/login"}
            color="primary"
            variant="outlined"
            sx={{ mr: 2 }}
          >
            Sign In
          </Button>
          <Button
            component={Link}
            to={"/create"}
            color="primary"
            variant="contained"
          >
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
