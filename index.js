const app = require('express')();
const floor = require('./controller/floor');
const input = require('./input/input.json');
var floorInstance;

function motionDetected() {
    input.sensorInput.forEach((input) => {
        if(input.movement){
            floorInstance.movementDetection(input.floor, input.subCorridor);
        } else {
            floorInstance.movementNotDetection(input.floor, input.subCorridor);
        }
    })
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
