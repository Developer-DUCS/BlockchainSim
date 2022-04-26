import { createTransactions } from "../../../../../js/blockchain/transactions/transactions";

// initial mock values
var b = 101;
var miner = "12345";
var numtransactions = 3;
var subsidy = 50;
var halvings = 200;
var totalCoin = 1000; //calculate this
var wallArr = [
  ["abc3abc3abc3abc3", "test@test.com", 0, ["abc1abc2abc3"], 50, []],
  [
    "abc4abc4abc4abc4",
    "test@test.com",
    0,
    ["bcd1bcd2bcd3", "cde1cde2cde3"],
    50,
    [],
  ],
  ["abc5abc5abc5abc5", "12345", 0, [], 50, []],
  ["abc6abc6abc6abc6", "67890", 0, ["def1def2def3"], 0, []],
];
var UTXO_Pool = [
  ["abc1abc2abc3", 50, 0],
  ["bcd1bcd2bcd3", 50, 1],
  ["cde1cde2cde3", 50, 50],
  ["def1def2def3", 50, 88],
];
var responseT1 = [];

// tests at block 101
describe("block 101", () => {
  it("creates transactions", () => {
    expect(
      console.log(
        createTransactions(
          miner,
          numtransactions,
          b,
          subsidy,
          halvings,
          totalCoin,
          wallArr,
          UTXO_Pool
        )
      )
    );
  });
});
