import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import lightTheme from "../js/themes/lightTheme";
import darkTheme from "../js/themes/darkTheme";

const NavBar = (props) => {
  const { setTheme, signIn, toggleSignIn } = props;
  const [toggle, setToggle] = React.useState(false);

  const toggleTheme = () => {
    if (toggle) {
      setTheme(lightTheme);
      setToggle(false);
    } else {
      setTheme(darkTheme);
      setToggle(true);
    }
  };

  const signOut = () => {
    try {
      // Remove token
      window.localStorage.removeItem("token");
    } catch (err) {
      console.error(err);
    } finally {
      // Toggle Sign In state
      toggleSignIn();

      // Refresh the page (make sure everything is in sync)
      history.go(0);
    }
  };

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
          {signIn == false ? (
            <>
              <Button
                component={Link}
                to={"/signin"}
                color="primary"
                variant="outlined"
                sx={{ mr: 2 }}
              >
                Sign In
              </Button>
              <Button
                component={Link}
                to={"/signup"}
                color="primary"
                variant="contained"
              >
                Sign Up
              </Button>
            </>
          ) : (
            <Button color="error" variant="contained" onClick={signOut}>
              Sign Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
