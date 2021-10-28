import { Alert } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Auth = (props) => {
  const { children } = props;
  const [auth, setAuth] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:5000/api/users/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: window.localStorage.getItem("token") }),
    }).then((res) => {
      if (res.status == 200) {
        console.log("Authorized");
        setAuth(true);
      } else {
        console.error("Unauthorized");
        setAuth(false);
      }
    });
  }, []);

  return (
    <div>
      {auth == false ? (
        <div>
          <Alert severity="error">
            <Link to="/signin">Sign In</Link> to be able to access this page.
          </Alert>
        </div>
      ) : auth == true ? (
        <div>{children}</div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Auth;
