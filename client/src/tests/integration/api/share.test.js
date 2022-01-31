const share = require("../../../../../api/share");
const users = require("../../../../../api/users");
const data = require("../../../../../api/data");
const assert = require("assert");
const db = require("../../../../../dbConn");

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use("/", share);
app.use("/", users);
app.use("/", data);
app.use("/", DataTransferItemList);

const email = "testonly@test.com";
const password = "testonly";
const role = "dev";
const sim_id = 1;

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
test("Route /share works", (done) => {
  request(app)
    .post("/")
    .type("form")
    .send({ id: email, sim_id: sim_id })
    .expect(201)
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});
