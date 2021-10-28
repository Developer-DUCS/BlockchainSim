import { Container, Typography, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";
import BlockComponent from "./BlockComponent";
import UserBar from "./UserBar";
import SimTable from "./SimTable";

const LandingPage = () => {
  return (
    <Auth>
      <Container>
        <Grid container spacing={3} sx={{ p: 2 }}>
          <Grid item xs={60}>
            <SimTable />
          </Grid>
        </Grid>
      </Container>
    </Auth>
  );
};
export default LandingPage;

// import * as React from "react";
// import PropTypes from "prop-types";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import AppBar from "@mui/material/AppBar";
// import Grid from "@mui/material/Grid";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import MenuItem from "@mui/icons-material/Menu";
// import Menu from "@mui/icons-material/Menu";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import Tab from "@mui/material/Tab";
// import Tabs from "@mui/material/Tabs";
// import Toolbar from "@mui/material/Toolbar";
// import Tooltip from "@mui/material/Tooltip";
// import Typography from "@mui/material/Typography";

// const EansPage = (props) => {
//   // const [auth, setAuth] = React.useState(true);
//   const [anchorel, setanchorel] = React.useState(null);

//   // const handleChange = (event) => {
//   //   setAuth(event.target.checked);
//   // };

//   const handleMenu = (event) => {
//     setanchorel(event.currentTarget);
//   };

//   const handleClose = () => {
//     setanchorel(null);
//   };

//   // const { onDrawerToggle } = props;

//   return (
//     <React.Fragment>
//       <AppBar color="primary" position="sticky" elevation={0}>
//         <Toolbar>
//           <Grid container spacing={1} alignItems="center">
//             <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
//               <IconButton color="inherit" aria-label="open drawer" edge="start">
//                 <MenuIcon />
//               </IconButton>
//             </Grid>
//             <Grid item xs />
//           </Grid>
//         </Toolbar>
//       </AppBar>
//       <AppBar
//         component="div"
//         color="primary"
//         position="static"
//         elevation={0}
//         sx={{ zIndex: 0 }}
//       >
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="open drawer"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Grid container alignItems="center" spacing={1}>
//             <Grid item xs>
//               <Typography color="inherit" variant="h5" component="h1">
//                 Simulations
//               </Typography>
//             </Grid>
//             <Grid item xs />
//             <Grid item>
//               <Tooltip title="Alerts • No alerts">
//                 <IconButton color="inherit">
//                   <NotificationsIcon />
//                 </IconButton>
//               </Tooltip>
//             </Grid>
//             <Grid item>
//               <div>
//                 <IconButton
//                   size="large"
//                   aria-label="account of current user"
//                   aria-controls="menu-appbar"
//                   aria-haspopup="true"
//                   onClick={handleMenu}
//                   color="inherit"
//                 >
//                   <AccountCircle />
//                 </IconButton>
//                 {/*  */}
//               </div>
//             </Grid>
//           </Grid>
//         </Toolbar>
//       </AppBar>
//       <AppBar
//         component="div"
//         position="static"
//         elevation={0}
//         sx={{ zIndex: 0 }}
//       >
//         <Tabs value={0} textColor="inherit">
//           <Tab label="My Simulations" />
//           <Tab label="Shared with me" />
//         </Tabs>
//       </AppBar>
//     </React.Fragment>
//   );
// };

// // UserBar.propTypes = {
// //   onDrawerToggle: PropTypes.func.isRequired,
// // };

// export default EansPage;

// import * as React from "react";
// import PropTypes from "prop-types";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import AppBar from "@mui/material/AppBar";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
// import HelpIcon from "@mui/icons-material/Help";
// import IconButton from "@mui/material/IconButton";
// import Link from "@mui/material/Link";
// import MenuIcon from "@mui/icons-material/Menu";
// import MenuItem from "@mui/icons-material/Menu";
// import Menu from "@mui/icons-material/Menu";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import Tab from "@mui/material/Tab";
// import Tabs from "@mui/material/Tabs";
// import Toolbar from "@mui/material/Toolbar";
// import Tooltip from "@mui/material/Tooltip";
// import Typography from "@mui/material/Typography";

// const lightColor = "rgba(255, 255, 255, 0.7)";

// function EanPage(props) {
//   const [auth, setAuth] = React.useState(true);
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleChange = (event) => {
//     setAuth(event.target.checked);
//   };

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const { onDrawerToggle } = props;

//   return (
//     <React.Fragment>
//       {/* <AppBar color="primary" position="sticky" elevation={0}>
//         <Toolbar>
//           <Grid container spacing={1} alignItems="center">
//             <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
//               <IconButton
//                 color="inherit"
//                 aria-label="open drawer"
//                 onClick={onDrawerToggle}
//                 edge="start"
//               >
//                 <MenuIcon />
//               </IconButton>
//             </Grid>
//             <Grid item xs />
//             <Grid item>
//               <Tooltip title="Alerts • No alerts">
//                 <IconButton color="inherit">
//                   <NotificationsIcon />
//                 </IconButton>
//               </Tooltip>
//             </Grid>
//             <Grid item>
//               <IconButton color="primary" sx={{ p: 0.5 }}>
//                 <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
//               </IconButton>
//             </Grid>
//           </Grid>
//         </Toolbar>
//       </AppBar> */}
//       <AppBar
//         component="div"
//         color="primary"
//         position="static"
//         elevation={0}
//         sx={{ zIndex: 0 }}
//       >
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="open drawer"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Grid container alignItems="center" spacing={1}>
//             <Grid item xs>
//               <Typography color="inherit" variant="h5" component="h1">
//                 Simulations
//               </Typography>
//             </Grid>
//             <Grid item xs />
//             <Grid item>
//               <Tooltip title="Alerts • No alerts">
//                 <IconButton color="inherit">
//                   <NotificationsIcon />
//                 </IconButton>
//               </Tooltip>
//             </Grid>
//             <Grid item>
//               <div>
//                 <IconButton
//                   size="large"
//                   aria-label="account of current user"
//                   aria-controls="menu-appbar"
//                   aria-haspopup="true"
//                   onClick={handleMenu}
//                   color="inherit"
//                 >
//                   <AccountCircle />
//                 </IconButton>
//                 <Menu
//                   id="menu-appbar"
//                   anchorEl={anchorEl}
//                   anchorOrigin={{
//                     vertical: "top",
//                     horizontal: "right",
//                   }}
//                   keepMounted
//                   transformOrigin={{
//                     vertical: "top",
//                     horizontal: "right",
//                   }}
//                   open={Boolean(anchorEl)}
//                   onClose={handleClose}
//                 >
//                   <MenuItem onClick={handleClose}>Profile</MenuItem>
//                   <MenuItem onClick={handleClose}>My account</MenuItem>
//                 </Menu>
//               </div>
//               {/* <IconButton color="primary" sx={{ p: 0.5 }}>
//                 <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
//               </IconButton>
//               <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorEl}
//                 anchorOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 open={Boolean(anchorEl)}
//                 onClose={handleClose}
//               >
//                 <MenuItem onClick={handleClose}>Profile</MenuItem>
//                 <MenuItem onClick={handleClose}>My account</MenuItem>
//               </Menu> */}
//             </Grid>

//             {/* <Grid item>
//               <Button
//                 sx={{ borderColor: lightColor }}
//                 variant="outlined"
//                 color="inherit"
//                 size="small"
//               >
//                 Web setup
//               </Button>
//             </Grid> */}
//             {/* <Grid item>
//               <Tooltip title="Help">
//                 <IconButton color="inherit">
//                   <HelpIcon />
//                 </IconButton>
//               </Tooltip>
//             </Grid> */}
//           </Grid>
//         </Toolbar>
//       </AppBar>
//       <AppBar
//         component="div"
//         position="static"
//         elevation={0}
//         sx={{ zIndex: 0 }}
//       >
//         <Tabs value={0} textColor="inherit">
//           <Tab label="My Simulations" />
//           <Tab label="Shared with me" />
//         </Tabs>
//       </AppBar>
//     </React.Fragment>
//   );
// }

// EanPage.propTypes = {
//   onDrawerToggle: PropTypes.func.isRequired,
// };

// export default EanPage;

// import * as React from "react";
// import { styled } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Tab from "@mui/material/Tab";
// import Tabs from "@mui/material/Tab";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
// import MoreIcon from "@mui/icons-material/MoreVert";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";

// const StyledToolbar = styled(Toolbar)(({ theme }) => ({
//   alignItems: "flex-start",
//   paddingTop: theme.spacing(1),
//   paddingBottom: theme.spacing(2),
//   // Override media queries injected by theme.mixins.toolbar
//   "@media all": {
//     minHeight: 128,
//   },
// }));

// export default function ProminentAppBar() {
//   const [auth, setAuth] = React.useState(true);
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleChange = (event) => {
//     setAuth(event.target.checked);
//   };

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <StyledToolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="open drawer"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             variant="h5"
//             noWrap
//             component="div"
//             sx={{ flexGrow: 1, alignSelf: "flex-end" }}
//           >
//             Simulations
//           </Typography>

//           <IconButton size="large" aria-label="search" color="inherit">
//             <SearchIcon />
//           </IconButton>
//           <IconButton
//             size="large"
//             aria-label="display more actions"
//             edge="end"
//             color="inherit"
//           >
//             <MoreIcon />
//           </IconButton>
//           <div>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleMenu}
//               color="inherit"
//             >
//               <AccountCircle />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorEl}
//               anchorOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               open={Boolean(anchorEl)}
//               onClose={handleClose}
//             >
//               <MenuItem onClick={handleClose}>Profile</MenuItem>
//               <MenuItem onClick={handleClose}>My account</MenuItem>
//             </Menu>
//           </div>
//         </StyledToolbar>
//       </AppBar>
//       <AppBar
//         component="div"
//         position="static"
//         elevation={0}
//         sx={{ zIndex: 0 }}
//       >
//         <Tabs value={0} textColor="inherit">
//           <Tab label="My Simulations" />
//           <Tab label="Shared with me" />
//         </Tabs>
//       </AppBar>
//     </Box>
//   );
// }
