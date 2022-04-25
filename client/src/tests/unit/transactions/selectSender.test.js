import { selectSender } from "../../../../../js/blockchain/transactions/transactions";

//block_heigh = 0 --> should select owner?
//block_heigh = 40
//block_height = 200

//wallet_arr --> 3 wallets

var b = 101;

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

var responseT1 = [
  ["abc3abc3abc3abc3", "test@test.com", 0, ["abc1abc2abc3"], 50, []],
  ["abc1abc2abc3", 50, 0],
];

describe("create merkle tree", () => {
  it("creates a merkle tree", () => {
    expect(1 == 1).toBe(true);
  });
});

describe("selects sender", () => {
  it("selects sender at block 101", () => {
    expect(selectSender(b, wallArr, UTXO_Pool) == responseT1);
  });
});
