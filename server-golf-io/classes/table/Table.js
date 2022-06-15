const { v4 } = require('uuid');

class Table {

    constructor (name) {
        this.id = v4();
        this.name = name;
        this.isFull = false;
        this.messages = new Set();

        this.seats = {
            A: 'empty',
            B: 'empty',
            C: 'empty',
            D: 'empty',
        }

    }

    static join (table, seating) {
        table.seats[seating.seat] = seating.user;
        return table;
    }


};

module.exports = Table;