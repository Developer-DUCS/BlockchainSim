import {
  createMinerPool,
  chooseMiner,
} from "../../../../../js/blockchain/block/miningPool";
describe("Mining Pool Test", () => {
  it("creates a pool of miners", () => {
    let result = createMinerPool(100, "user");
    expect(result.length).toBe(100);
  });

  it("chooses a miner from the pool", () => {
    let minerPool = createMinerPool(100, "user");
    let result = chooseMiner(minerPool);
    expect(minerPool.includes(result)).toBe(true);
  });
});
