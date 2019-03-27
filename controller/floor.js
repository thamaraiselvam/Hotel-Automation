const config = require('./../config/config.json');
const _ = require('lodash');
class Floor {
    constructor(input) {
        this.initData(input);
        this.setDefaultState();
    }

    initData(input) {
        this.input = input;
        this.state = this.currentFloor = this.currentSubCorridor = [];
        this.currentFloorNumber = this.currentSubCorridorNumber = 0;
    }

    setDefaultState() {
        for (let index = 0; index < this.input.floor; index++) {
            this.state[index] = {};
            this.state[index]['mainCorridor'] = [];
            for (let innerIndex = 0; innerIndex < this.input.mainCorridor; innerIndex++) {
                this.state[index]['mainCorridor'][innerIndex] = {
                    light: 'OFF',
                    AC: 'ON'
                }
            }
            this.state[index]['subCorridor'] = [];
            for (let innerIndex = 0; innerIndex < this.input.subCorridor; innerIndex++) {
                this.state[index]['subCorridor'][innerIndex] = {
                    light: 'OFF',
                    AC: 'ON'
                }
            }
        }
        this.printState('Default State');
    }


    getState() {
        return this.state;
    }

    movementDetection(floor, subCorridor) {
        if (!floor || !subCorridor) {
            return; //floor or Sub Corridor cannot be empty
        }

        this.currentFloorNumber = subCorridor - 1;
        this.currentSubCorridorNumber = floor - 1;
        this.currentFloor = this.state[floor - 1];
        this.currentSubCorridor = this.state[floor - 1].subCorridor[subCorridor - 1];

        this.state[floor - 1].subCorridor.forEach((value, index) => {
            if (index === subCorridor - 1) {
                this.state[floor - 1].subCorridor[index].light = 'ON';
                this.state[floor - 1].subCorridor[index].AC = 'ON';
                this.checkAndReducePowerUsage(this.state[floor - 1].subCorridor);
                return;
            }
        });

        this.printState(`Movement in Floor ${floor}, Sub Corridor ${subCorridor} `);
        this.getCurrentUsage(this.state[floor - 1].subCorridor);
    }

    movementNotDetection(floor, subCorridor) {
        if (!floor || !subCorridor) {
            return; //floor or Sub Corridor cannot be empty
        }

        this.state[floor - 1].subCorridor.forEach((value, index) => {
            if (index === subCorridor - 1) {
                this.state[floor - 1].subCorridor[index].light = 'OFF';
                this.state[floor - 1].subCorridor[index].AC = 'ON';
                this.checkandRevertPowerUsage(this.state[floor - 1].subCorridor);
                return;
            }

        });

        this.printState(`No Movement in Floor ${floor}, Sub Corridor ${subCorridor} for a minute`);
        this.getCurrentUsage(this.state[floor - 1].subCorridor);
    }

    getMaxAllowedUnit() {
        return config.floor.subCorridor.maxAllowedPowerConsumption * this.input.subCorridor;
    }

    checkAndReducePowerUsage(currentState) {
        let maxPowerUsage = this.getMaxAllowedUnit();
        this.reducePowerUsage(currentState, maxPowerUsage);

    }

    checkandRevertPowerUsage(currentState) {
        let maxPowerUsage = this.getMaxAllowedUnit();
        this.revertPowerUsage(currentState, maxPowerUsage);

    }

    revertPowerUsage(currentState, maxPowerUsage) {
        this.currentFloor.subCorridor.forEach((value, index) => {
            let currentUsage = this.getCurrentUsage(currentState);
            if (currentUsage + config.unit.AC <= maxPowerUsage) {
                if (this.currentFloor.subCorridor[this.currentFloorNumber].AC === 'OFF') {
                    this.currentFloor.subCorridor[this.currentFloorNumber].AC = 'ON';
                } else if (value.AC === 'OFF') {
                    value.AC = 'ON';
                }
            }
        })
    }


    reducePowerUsage(currentState, maxPowerUsage) {
        this.currentFloor.subCorridor.forEach((value, index) => {
            let currentUsage = this.getCurrentUsage(currentState);
            if (currentUsage > maxPowerUsage) {
                if (index === this.currentFloorNumber) {
                    return;
                }
                if (value.AC === 'ON') {
                    value.AC = 'OFF';
                }
            }
        })

        let currentUsage = this.getCurrentUsage(currentState);
        if (currentUsage > maxPowerUsage) {
            if (this.currentFloor.subCorridor[this.currentFloorNumber].AC === 'ON') {
                this.currentFloor.subCorridor[this.currentFloorNumber].AC = 'OFF';
            }
        }
    }

    getCurrentUsage(currentState) {
        let currentUsage = 0;
        currentState.forEach((value, index) => {
            if (value.AC === 'ON') {
                currentUsage += config.unit.AC;
            }
            if (value.light === 'ON') {
                currentUsage += config.unit.light;
            }
        })

        return currentUsage;

    }

    turnOffRandomAc() {

    }

    printState(statusMessage) {
        // this.checkMaxAllowedUnit();
        console.log(statusMessage);
        this.state.forEach((floor, index) => {
            console.log(`Floor ${index + 1}`);
            floor.mainCorridor.forEach((value, index) => {
                console.log(`Main Corridor ${index + 1} Light ${index + 1} : ${value.light} AC : ${value.AC}`);
            })
            floor.subCorridor.forEach((value, index) => {
                console.log(`Sub Corridor ${index + 1} Light ${index + 1} : ${value.light} AC : ${value.AC}`);
            })
        })
        console.log("_________________________________");
    }
}

module.exports = Floor;