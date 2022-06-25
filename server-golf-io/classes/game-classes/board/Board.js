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
        let flipCount = 0;
        while (flipCount < 2) {
            let slot = this.slots[this.#rows[Math.floor(Math.random() * 3)] + this.#columns[Math.floor(Math.random() * 3)]];
            if (slot.isFaceUp === false) {
                this.slots[slot.name].flipUp();
                flipCount++;
            }
        }
    }
}

module.exports = Board;