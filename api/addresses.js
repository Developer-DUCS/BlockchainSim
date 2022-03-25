const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");

const trackAddres = require("../js/blockchain/trackTransaction");

app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

router.post("trackaddress", cors(), (req, resp) => {
  console.log("enter route");
  // Initialize variables
  let inputTransactions = req.body.inputTransactions;
  let outputTransactions = req.body.outputTransactions;
  let blockData = req.body.blockData;

  console.log(
    "stuff passed in" + inputTransactions,
    outputTransactions,
    blockData
  );

  let inputsOutputs = trackAddres(
    inputTransactions,
    outputTransactions,
    blockData
  );

  console.log("prior to send response back");

  resp.status(200).json({
    inputsOutputs: inputsOutputs,
  });
});

module.exports = router;
