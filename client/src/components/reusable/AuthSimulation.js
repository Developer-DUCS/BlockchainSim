import { Alert } from "@mui/material";
import React from "react";
import { Container } from "@mui/material";

const AuthSimulation = (props) => {
  const { children, email, sim_id } = props;
  const [auth, setAuth] = React.useState(null);

  // On Page Load
  React.useEffect(() => {
    if (email) {
      // Fetch "/auth" via POST
      fetch(
        `${process.env.SCHEME}://${process.env.REACT_APP_API_URL}/api/users/auth/simulation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, sim_id: sim_id }),
        }
      )
        .then((res) => {
          if (res.status == 200) {
            setAuth(true);
          } else {
            setAuth(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [email]);

  return (
    <div>
      {auth == false ? (
        <Container maxWidth="sm" sx={{ mt: 2 }}>
          <Alert severity="error">
            You are not authorized to view this simulation
          </Alert>
        </Container>
      ) : auth == true ? (
        <div>{children}</div>
      ) : null}
    </div>
  );
};

export default AuthSimulation;
