import createMerkleTree from "../../../../../../js/blockchain/block/merkleTree";

describe("create merkle tree", () => {
  const transactions = [
    {
      hash: "ae53c61dc7d117a27d9f525530a8274b2293c47ce838404c52fa0d2633fe6aff",
    },
    {
      hash: "9f00017e41c81544ada18338001147481e6f9f23b874523bd693583d4715f777",
    },
    {
      hash: "e1d49c34244bb47c16b232183e8d33719112978838d88c1966261aa542efe6cd",
    },
  ];
  it("with multiple transactions", () => {
    let result = createMerkleTree(transactions);
    expect(result.length).toBe(64);
  });
});

describe("create merkle tree", () => {
  const transactions = [
    {
      hash: "ae53c61dc7d117a27d9f525530a8274b2293c47ce838404c52fa0d2633fe6aff",
    },
  ];
  it("returns only hash", () => {
    let result = createMerkleTree(transactions);
    expect(result).toEqual(transactions[0].hash);
  });
});
