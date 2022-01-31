import timeStamp from "../../../js/blockchain/block/timeStamp";
import simulationCreator from "../../../js/blockchain/simulation";
import { createMinerPool } from "../../../js/blockchain/block/miningPool";
import sjcl from "../../../sjcl";

const datapath = require("../../../../../api/data");
const users = require("../../../../../api/users");
const db = require("../../../../../dbConn");

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

app.use("/", datapath);
app.use("/users/", users);

const email1 = "testonly@test.com";
const password1 = "testonly";
const email2 = "onlytest@test.com";
const password2 = "onlytest";
const role = "dev";

// Clear Database before testing (removes test data)
beforeAll((done) => {
  let qry = `DELETE FROM user WHERE email='${email1}' OR email='${email2}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      qry = `DROP TABLE IF EXISTS blocks_testonly_test_com, blocks_onlytest_test_com`;
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
  let qry = `DELETE FROM user WHERE email='${email1}' OR email='${email2}'`;
  db.query(qry, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      qry = `DROP TABLE IF EXISTS blocks_testonly_test_com, blocks_onlytest_test_com`;
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
    .send({ data })
    .expect(200)
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

// Test delete a simulation
// Expect 200
test("Route /deletesim success", (done) => {
  request(app)
    .post("/deletesim")
    .type("form")
    .send({ email: email1, sim_id: "18" })
    .expect(200)
    .then(() => done())
    .catch((err) => {
      done(err);
    });
});

// Test get simulations
test("Route /getsimulations success", (done) => {
  request(app)
    .post("/getsimulations")
    .type("form")
    .send({ email: email1 })
    .expect(200)
    .then(() => done())
    .catch((err) => {
      done(err);
    });
});

// Test get simulation id
test("Route /getsimulation/id success", (done) => {
  request(app)
    .post("/getsimulations/id")
    .type("form")
    .send({ id: "18" })
    .expect(200)
    .then(() => done())
    .catch((err) => {
      done(err);
    });
});
// Test get blocks
test("Route /getblocks success", (done) => {
  request(app)
    .post("/getblocks")
    .type("form")
    .send({ owner: email1, blocks: simulation.blocks })
    .expect(200)
    .then(() => done())
    .catch((err) => {
      done(err);
    });
});
// Test get shared simulations
test("Route /getsharedsimulations success", (done) => {
  request(app)
    .post("/getsharedsimulations")
    .type("form")
    .send({ email: email2 })
    .expect(200)
    .then(() => done())
    .catch((err) => {
      done(err);
    });
});
