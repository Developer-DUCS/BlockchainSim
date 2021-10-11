NumberOfMiners = 16;

const random = (min = 0, max = (NumberOfMiners - 1)) => {
    let num = Math.random() * (max - min) + min;
    return Math.floor(num);
  };

var AllMiners = ["KermitPhrog", "JonTron", "milksteak", "nfectedbrowny", "gorgonzola", "Akira1988", "holycannoli", "ravioliravioli", "SquidGame", "spooderman", "M-Takanaka", "T-Ohnuki", "T-Yamashita", "Melonhead", "LeroyJenkins", "TheLegend27"];

var MiningPool = [];

var i;
for (i = 0; i < NumberOfMiners; i++) {
  MiningPool.push(AllMiners[i])
}

RandomMiner = random();
Miner = MiningPool[RandomMiner];

//console.log(Miner)
