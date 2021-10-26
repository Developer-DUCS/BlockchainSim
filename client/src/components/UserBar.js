import * as React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/icons-material/Menu";
import Menu from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import lightTheme from "../js/themes/lightTheme";
import darkTheme from "../js/themes/darkTheme";

const UserBar = (props) => {
  const { setTheme } = props;
  const [toggle, setToggle] = React.useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const toggleTheme = () => {
    if (toggle) {
      setTheme(lightTheme);
      setToggle(false);
    } else {
      setTheme(darkTheme);
      setToggle(true);
    }
  };

  const toolbarStyle = {
    minHeight: "30px",
  };

  const [anchorel, setanchorel] = React.useState(null);

  const handleMenu = (event) => {
    setanchorel(event.currentTarget);
  };

  const handleClose = () => {
    setanchorel(null);
  };

  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <React.Fragment>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={2}
        sx={{ zIndex: 0 }}
      >
        <Toolbar style={toolbarStyle}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs></Grid>
            <Grid item xs />
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                Simulations
              </Typography>
            </Grid>
            <Grid item xs />
          </Grid>
          <Grid item>
            <Switch onChange={toggleTheme} />
          </Grid>
          <Grid item>
            <Tooltip title="Alerts • No alerts">
              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        position="static"
        elevation={0}
        sx={{ zIndex: 20 }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="mysim" label="My Simulations" />
          <Tab value="sharedsim" label="Shared With Me" />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
};
export default UserBar;
