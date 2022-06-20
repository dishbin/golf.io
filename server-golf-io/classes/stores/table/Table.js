const uuidv4 = require('uuid').v4;

const Store = require("../store/Store");

class Table extends Store {
    
    constructor (name) {
        super(name);
        this.id = uuidv4();
        this.isFull = false;
        this.seats = {
            A: 'empty',
            B: 'empty',
            C: 'empty',
            D: 'empty',
        }
    }

    join (data) {
        console.log('joining ' + this.name);
        this.users.set(data.user);
        this.seats[data.seat] = data.user;
    }

    leave(data) {
        this.users.remove(data.user);
        this.seats[data.seat] = 'empty';
    }

}

module.exports = Table;