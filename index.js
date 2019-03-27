const app = require('express')();
const floor = require('./controller/floor');
const config = require('./config/config.json');
const input = require('./input/input.json');
var floorInstance;

function motionDetected() {
    floorInstance.movementDetection(pfloor = 1, subCorridor = 1);
    floorInstance.movementDetection(pfloor = 1, subCorridor = 2);
    floorInstance.movementNotDetection(pfloor = 1, subCorridor = 1);
    floorInstance.movementNotDetection(pfloor = 1, subCorridor = 2);
}

function init() {
    floorInstance = new floor(input);
}

app.get('/', (req, res) => {
    init();
    motionDetected();
    res.status(200).json(floorInstance.getState());
})

app.listen(3001);
