import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Beyond the Block
          </Typography>
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
