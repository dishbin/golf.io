const Card = require('../card/Card');

class Slot {

    constructor(card, row, col) {
        this.card = card;
        this.name = row + col;
        this.column = col;
        this.row = row;
        this.isFaceUp = false;
        this.isZeroed = false;
        this.zeroedDirection = 'none';
    }

    flipUp() {
        this.isFaceUp = true;
    }

    flipDown () {
        this.isFaceUp = false;
    }

    zeroOut() {
        this.isZeroed = true;
    }

    unZero() {
        this.isZeroed = false;
    }

    score() {
        if (this.isZeroed)
            return 0;
        return this.card.score;
    }

    replaceWith(card) {
        this.card = card;
    }
    
};

module.exports = Slot;