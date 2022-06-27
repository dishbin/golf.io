const uuidv4 = require('uuid').v4;

class NPC {
    constructor() {
        this.id = uuidv4();
        this.name = 'NPC-' + this.id;
        this.playerType = 'NPC';
    }

    assignSeat (data) {
        this.seat = data;
    }

    assignBoard (data) {
        this.board = data;
    }

    assignScorecard (data) {
        this.scorecard = data;
    }

    startTurn (data) {
        let slot;
        for (let slot in this.board.slots) {
            if (this.board.slots[slot].isFaceUp === false) {
                slot = this.board.slots[slot];
                slot.flipUp();
                break;
            }
        }
        return {
            slot: slot,
            board: this.board,
            player: this,
            seat: this.seat
        }
    }
}

module.exports = NPC;