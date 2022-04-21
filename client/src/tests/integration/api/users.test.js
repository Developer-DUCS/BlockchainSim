const users = require("../../../../../api/users");
const assert = require("assert");
const db = require("../../../../../dbConn");

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", users);

const email = "testonly@test.com";
const password = "testonly";
const role = "dev";

// Clear Database before testing (removes test data)
beforeAll((done) => {
  let qry = `DELETE FROM user WHERE email='${email}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      qry = `DROP TABLE IF EXISTS blocks_testonly_test_com`;
      db.query(qry, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          done();
        }
      });
    }
  });
});

// Clear Database after testing (removes test data)
afterAll((done) => {
  let qry = `DELETE FROM user WHERE email='${email}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      qry = `DROP TABLE IF EXISTS blocks_testonly_test_com`;
      db.query(qry, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          done();
        }
      });
    }
  });
});

/* USER REGISTRATION TESTS */

// Test registration of a valid user
test("Route /register works", (done) => {
  request(app)
    .post("/register")
    .type("form")
    .send({ id: email, pass: password, role: role })
    .expect(201)
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

// Test registration fail if a user has been already register
test("Route /register fails, email already taken", (done) => {
  request(app)
    .post("/register")
    .type("form")
    .send({ id: email, pass: password, role: role })
    .expect(409)
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

/* LOG IN API TESTS */

// Login with an existing account
test("Route /login success", (done) => {
  request(app)
    .post("/login")
    .type("form")
    .send({ email: email, password: password })
    .expect(200)
    .then((response) => {
      assert(response.body.msg == "user authenticated");
      done();
    })
    .catch((err) => {
      done(err);
    });
});

// Log in with an existing account but bad password
test("Route /login bad password", (done) => {
  request(app)
    .post("/login")
    .type("form")
    .send({ email: email, password: "failing" })
    .expect(401)
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

// Log in with an non existing account
test("Route /login no account", (done) => {
  request(app)
    .post("/login")
    .type("form")
    .send({ email: "noaccount@noaccount.com", password: "noaccount" })
    .expect(400)
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

// Bad user input
test("Route /login form broke", (done) => {
  request(app)
    .post("/login")
    .type("form")
    .send({ broke: "asdfoijascom", fail: "asdf" })
    .expect(401)
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

// Authenticaction pass test
test("Route /auth success", (done) => {
  request(app)
    .post("/login")
    .type("form")
    .send({ email: email, password: password })
    .expect(200)
    .then((response) => {
      assert(response.body.msg == "user authenticated");
      request(app)
        .post("/auth")
        .type("form")
        .send({ token: response.body.token })
        .expect(200)
        .then(() => {
          assert(response.body.token);
          done();
        })
        .catch((err) => {
          done(err);
        });
    })
    .catch((err) => {
      done(err);
    });
});

// authentication fail test
test("Route /auth fails", (done) => {
  request(app)
    .post("/auth")
    .type("form")
    .send({ token: "test" })
    .expect(401)
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});
