const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");

const trackAddres = require("../js/blockchain/trackTransaction");

app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

router.post("/trackaddress", cors(), (req, resp) => {
  console.log("enter route");
  // Initialize variables
  let inputTransactions = req.body.input;
  let outputTransactions = req.body.output;
  let blockData = req.body.blockData;

  let inputsOutputs = trackAddres(
    inputTransactions,
    outputTransactions,
    blockData
  );

  resp.status(200).send({ inputsOutputs: inputsOutputs });
});

module.exports = router;
