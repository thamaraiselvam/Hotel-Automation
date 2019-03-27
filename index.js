const floor = require('./controller/floor');
const config = require('./config/config.json');
const input = config.input;

const floorInstance = new floor(input.mainCorridor, input.subCorridor);
floorInstance.printState();
// const state = floorInstance.getState();
// console.log(JSON.stringify(state, null, "  "));