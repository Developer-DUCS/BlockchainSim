/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// core components
import Button from "./Button.js";

import styles from "./extra_components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const { setTheme, signIn, toggleSignIn } = props;
  const [toggle, setToggle] = React.useState(false);

  /*const toggleTheme = () => {
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
*/
  //need to put switch in for toggle light mode
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          component={Link}
          to={`${process.env.PUBLIC_URL}/signin`}
          color="transparent"
          fontSize="20px"
        >
          Sign In
        </Button>
        <Button
          component={Link}
          to={`${process.env.PUBLIC_URL}/signup`}
          color="transparent"
        >
          Sign Up
        </Button>
      </ListItem>
    </List>
  );
}
