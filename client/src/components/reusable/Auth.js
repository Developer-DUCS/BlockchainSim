import { Alert } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import { useCookies } from "react-cookie";

const Auth = (props) => {
  const { children, setUser } = props;
  const [auth, setAuth] = React.useState(null);
  const [cookies, setCookie] = useCookies(["token"]);

  // On Page Load
  React.useEffect(() => {
    // Fetch "/auth" via POST
    fetch(`${process.env.REACT_APP_URL_SCHEME}://${process.env.REACT_APP_API_URL}/api/users/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: cookies.token }),
    })
      .then((res) => {
        if (res.status == 200) {
          // Process the httpservletresponse
          return res.json();
        } else {
          setAuth(false);
        }
      })
      .then((user) => {
        if (user) {
          setAuth(true);
          if (setUser) {
            setUser(user);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      {auth == false ? (
        <Container maxWidth="sm" sx={{ mt: 2 }}>
          <Alert severity="error">
            <Link to={`${process.env.PUBLIC_URL}/signin`}>Sign In</Link> to be
            able to access this page.
          </Alert>
        </Container>
      ) : auth == true ? (
        <div>{children}</div>
      ) : null}
    </div>
  );
};

export default Auth;
