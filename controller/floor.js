class Floor {
    constructor(mainCorridor, subCorridor) {
        this.initData(mainCorridor, subCorridor);
        this.setDefaultState();
    }

    initData(mainCorridor, subCorridor) {
        this.mainCorridor = mainCorridor;
        this.subCorridor = subCorridor;
        this.state = [{
            name: 'Floor 1',
        }];
    }

    setDefaultState() {
        this.state[0]['mainCorridor'] = [];
        for (let i = 0; i < this.mainCorridor; i++) {
            this.state[0]['mainCorridor'][i] = [{
                light: 'ON',
                AC: 'ON'
            }]
        }
        this.state[0]['subCorridor'] = [];
        for (let i = 0; i < this.subCorridor; i++) {
            this.state[0]['subCorridor'][i] = [{
                light: 'ON',
                AC: 'ON'
            }]
        }
    }

    getState(){
        return this.state;
    }

    printState(){
            this.state.forEach(state => {
                console.log(state.name);
                console.log('Main Corridor');
                console.log(state.mainCorridor);
                console.log('Sub Corridor');
                console.log(state.mainCorridor);
            });
    }
}

module.exports = Floor;