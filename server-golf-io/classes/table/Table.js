const { v4 } = require('uuid');

class Table {

    constructor (name) {
        this.id = v4();
        this.name = name;
        this.isFull = false;

        this.seats = new Map();
        this.seats.set('A', 'empty');
        this.seats.set('B', 'empty');
        this.seats.set('C', 'empty');
        this.seats.set('D', 'empty');

    }

    joinTable (user) {
        let emptySeat = this.seats.values().find(seat => seat === 'empty');
        console.log(emptySeat);
    }
};

module.exports = Table;