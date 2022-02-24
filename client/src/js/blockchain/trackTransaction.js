// File to track addresses appearance given an initial address and a block height

// where is it connected
// do I need to call the API of do already have all the block needed?

const trackAddres = (adr, blocks) => {
    var adrTreeHist = []; // [ [input, output], [input, output]] --> do we include amout?
    var blockHist = []; // [ [hash,heigth] , [hash,heigth] ]

    //find first address block appearance
    // check if it is an input of an output
    // if output --> get input; which one of them if there is more than one? all?
    // if input --> find matching output in another block
    // do I want to store the transaction hash so we show it too?


    return [adrTreeHist, blockHist]
}

module.exports = { trackAddres}