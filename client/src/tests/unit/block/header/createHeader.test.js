import createHeader from "../../../../../../js/blockchain/header";

const previousHash =
  "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8";
const merkleRoot =
  "e1d49c34244bb47c16b232183e8d33719112978838d88c1966261aa542efe6cd";

describe("create header", () => {
  it("testing", () => {
    let result = createHeader(previousHash, merkleRoot);
    expect(result.length).toBe(2);
    expect(result[0].length).toBe(64);
    expect(result[1].previousHash).toBe(previousHash);
    expect(result[1].merkleRoot).toBe(merkleRoot);
  });
});
