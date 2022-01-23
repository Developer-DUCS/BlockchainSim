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

test("Route /auth fails", (done) => {
  request(app)
    .post("/auth")
    .type("form")
    .send({ token: "test" })
    .expect(401)
    .then((response) => {
      assert(response.statusCode === 401);
      done();
    })
    .catch((err) => {
      done(err);
    });
});
