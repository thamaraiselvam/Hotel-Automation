const floor = require('./controller/floor.controller');
const input = require('./input/input.json');

class BaseControlller {
    constructor() {
        this.init();
        this.feedInputs();
    }

    init() {
        this.floorInstance = new floor(input);
    }

    feedInputs() {
        input.sensorInput.forEach((input) => {
            this.floorInstance.movementDetection(input.movement, input.floor, input.subCorridor);
        })
    }

}

new BaseControlller();