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

const email1 = "testonly@test.com";
const password1 = "testonly";
const email2 = "onlytest@test.com";
const password2 = "onlytest";
const role = "dev";
o;
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
// Register two users to test sharing simulations
test("Route /register works", (done) => {
  request(app)
    .post("/users/register")
    .type("form")
    .send({ id: email1, pass: password1, role: role })
    .expect(201)
    .then(() => {
      request(app)
        .post("/users/register")
        .type("form")
        .send({ id: email2, pass: password2, role: role })
        .expect(201)
        .then(() => {
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

// Create variables for a simulation
//Creates the simulation
const initValues = {
  name: "test name",
  desc: "test description",
  gendate: "2009-01-09",
  gentime: "10:30",
  blockwin: "10",
  numblocks: "100",
  transactions: "5",
  subsidy: "50",
  coin: "btc",
  mining: "pow",
  numminers: "50",
};

var miningPool = createMinerPool(initValues.numminers, email1); //create mining pool

var bithash = sjcl.hash.sha256.hash(initValues.desc);
var initialHash = sjcl.codec.hex.fromBits(bithash);

let initTime = [initValues.gendate, initValues.gentime];
var timeStampArr = timeStamp(
  initTime,
  initValues.numblocks,
  initValues.blockwin
);
var simulation = simulationCreator(
  initValues.numblocks,
  initialHash,
  timeStampArr,
  miningPool,
  email1,
  initValues.transactions
);

var newSimulation = {
  user: email1,
  sim_name: initValues.name,
  sim_shared: `{${email2}}`,
  sim_description: initValues.desc,
  sim_created: new Date(),
  sim_modified: new Date(),
  sim_blocks: simulation[0],
};

var data = {
  simulation: newSimulation,
  blocks: simulation[1],
};

// Test create a simulation
test("Route /createsim works", (done) => {
  request(app)
    .post("/createsim")
    .type("form")
    .send(data)
    .expect(200)
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
    .send({ id: email2 })
    .expect(201)
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});
