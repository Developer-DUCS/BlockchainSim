const users = require("../../../../../api/users");
const assert = require("assert");

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use("/", users);

test("Route /login success", (done) => {
  request(app)
    .post("/login")
    .type("form")
    .send({ email: "testing@testing.com", password: "testing" })
    .expect(200)
    .then((response) => {
      assert(response.body.msg == "user authenticated");
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("Route /login bad password", (done) => {
  request(app)
    .post("/login")
    .type("form")
    .send({ email: "testing@testing.com", password: "failing" })
    .expect(401)
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

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

test("Route /auth success", (done) => {
  request(app)
    .post("/login")
    .type("form")
    .send({ email: "testing@testing.com", password: "testing" })
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
