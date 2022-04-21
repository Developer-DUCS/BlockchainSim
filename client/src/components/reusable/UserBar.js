import * as React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import lightTheme from "../../themes/lightTheme";
import darkTheme from "../../themes/darkTheme";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import LockOpen from "@mui/icons-material/LockOpen";
import Auth from "../reusable/Auth";
import Add from "@mui/icons-material/Add";
import { ClickAwayListener } from "@mui/material";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import BookIcon from "@mui/icons-material/Book";
const drawerWidth = 270;

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//   ({ theme, openDrawer }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(openDrawer && {
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   })
// );

// const appbar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, openDrawer }) => ({
//   transition: theme.transitions.create(["margin", "width"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(openDrawer && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(["margin", "width"], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  variant: "permanent",
}));

const UserBar = (props) => {
  const [user, setUser] = React.useState({});

  const history = useHistory();
  const theme = useTheme();
  // setTheme: function that updates app theme
  // barTitle: String
  // tabNames: Array<String>
  // setSelectedTab: React state function
  // selectedTab: Number (index of tab)
  const { setTheme, barTitle, tabNames, setSelectedTab, selectedTab } = props;
  const [openDrawer, setOpen] = React.useState(false);
  const [toggle, setToggle] = React.useState(
    theme.mode === "dark" ? true : false
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const signOut = () => {
    try {
      // Remove token
      removeCookie("token", { path: "/BtB" });
    } catch (err) {
      console.error(err);
    } finally {
      // Refresh the page (make sure everything is in sync)
      history.push(`${process.env.PUBLIC_URL}/signin`);
    }
  };

  const toolbarStyle = {
    minHeight: "30px",
  };

  const toggleTheme = () => {
    if (toggle) {
      setTheme(lightTheme);
      setToggle(false);
    } else {
      setTheme(darkTheme);
      setToggle(true);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Auth setUser={setUser}>
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
        {/* </AppBar> */}
        {/* <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      > */}
        <Toolbar>
          <ClickAwayListener onClickAway={handleDrawerClose}>
            <div style={{ width: "50px" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(openDrawer && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                ModalProps={{
                  onBackdropClick: handleDrawerClose,
                  onEscapeKeyDown: handleDrawerClose,
                }}
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                  },
                }}
                variant="persistent"
                anchor="left"
                open={openDrawer}
              >
                <DrawerHeader>
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "ltr" ? (
                      <ChevronLeftIcon />
                    ) : (
                      <ChevronRightIcon />
                    )}
                  </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                  <ListItem
                    button
                    key={"home"}
                    onClick={handleDrawerClose}
                    component={Link}
                    to={`${process.env.PUBLIC_URL}/simulation`}
                  >
                    <ListItemIcon>
                      <HomeIcon color="tertiary" />
                    </ListItemIcon>
                    <ListItemText primary={"Home"} />
                  </ListItem>
                  <ListItem
                    button
                    key={"add"}
                    onClick={handleDrawerClose}
                    component={Link}
                    to={`${process.env.PUBLIC_URL}/createsimulation`}
                  >
                    <ListItemIcon>
                      <Add color="tertiary" />
                    </ListItemIcon>
                    <ListItemText primary={"Create New Simulation"} />
                  </ListItem>
                  <ListItem
                    button
                    key={"tutorial"}
                    onClick={handleDrawerClose}
                    component={Link}
                    to={`${process.env.PUBLIC_URL}/tutorialHome`}
                  >
                    <ListItemIcon>
                      <BookIcon color="tertiary" />
                    </ListItemIcon>
                    <ListItemText primary={"Tutorials"} />
                  </ListItem>
                  <ListItem button key={"settings"} onClick={handleDrawerClose}>
                    <ListItemIcon>
                      <Settings color="tertiary" />
                    </ListItemIcon>
                    <ListItemText primary={"Settings"} />
                  </ListItem>
                </List>
              </Drawer>
            </div>
          </ClickAwayListener>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <Avatar /> {user.email}
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" color="tertiary" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={signOut}>
              <ListItemIcon>
                <Logout fontSize="small" color="tertiary" />
              </ListItemIcon>
              Sign Out
            </MenuItem>
          </Menu>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {barTitle}
              </Typography>
            </Grid>
            <Grid item xs />
          </Grid>

          <Grid item>
            <Switch checked={toggle} onChange={toggleTheme} color="secondary" />
          </Grid>
          <Grid item>
            <Tooltip title="Alerts • No alerts">
              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Account settings">
              <IconButton onClick={handleClick} size="medium" color="inherit">
                <AccountCircle />
              </IconButton>
            </Tooltip>
          </Grid>
        </Toolbar>
        <Tabs
          value={selectedTab}
          onChange={setSelectedTab}
          textColor="inherit"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          {tabNames &&
            tabNames.map((tabName, index) => (
              <Tab key={tabName} value={index} label={tabName} />
            ))}
        </Tabs>
      </AppBar>
    </Auth>
  );
};
export default UserBar;
