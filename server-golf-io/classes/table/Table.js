const { v4 } = require('uuid');

class Table {

    constructor (name) {
        this.id = v4();
        this.name = name;
        this.isFull = false;

        this.seats = {
            A: 'empty',
            B: 'empty',
            C: 'empty',
            D: 'empty',
        }

    }

    joinTable (user) {
        let emptySeat = this.seats.values().find(seat => seat === 'empty');
        console.log(emptySeat);
    }
};

module.exports = Table;