const uuidv4 = require('uuid').v4;

class NPC {
    constructor() {
        this.id = uuidv4();
        this.name = 'NPC-' + this.id;
        this.playerType = 'NPC';
    }

    assignBoard (data) {
        this.board = data;
    }

    assignScorecard (data) {
        this.scorecard = data;
    }

    handleTurnStart (data) {
        console.log('NPC TURN STARTING');
        console.log(data);
        console.log(this);
    }
}

module.exports = NPC;