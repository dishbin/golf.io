const Slot = require("../slot/Slot");

class Board {

    #rows = [
        '1',
        '2',
        '3'
    ];

    #columns = [
        'A',
        'B',
        'C'
    ];

    constructor (cards) {
        this.slots = {};
        let count = 0;
        for (let i = 0; i < this.#rows.length; i++) {
            for (let j = 0; j < this.#columns.length; j++) {
                let slotName = this.#rows[i] + this.#columns[j];
                this.slots[slotName] = new Slot(cards[count], this.#rows[i], this.#columns[j]);
                count++;
            }
        }
    }
}

module.exports = Board;