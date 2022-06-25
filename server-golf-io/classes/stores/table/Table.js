const uuidv4 = require('uuid').v4;

const Game = require('../../game-classes/game/Game');
const Store = require("../store/Store");

class Table extends Store {
    
    constructor (name) {
        super(name);
        this.id = uuidv4();
        this.isFull = false;
        this.isAllReady = false;
        this.seats = {
            A: 'empty',
            B: 'empty',
            C: 'empty',
            D: 'empty',
        }
    }

    join (data) {
        this.users.set(data.user);
        this.seats[data.seat] = data.user;
        this.checkForFull();
    }

    leave(data) {
        this.users.remove(data.user);
        this.seats[data.seat] = 'empty';
        this.checkForFull();
    }

    userIsReady (data) {
        this.seats[data.seat] = {
            ...data.user,
            isReady: true
        }
        this.checkForAllReady();
    }

    checkForFull () {
        if (Object.values(this.seats).every(val => val !== 'empty')) {
            this.isFull = true;
        } else {
            this.isFull = false;
        }
    }

    checkForAllReady () {
        if (Object.values(this.seats).every(val => (val.isReady !== undefined && val.isReady !== false))) {
            this.isAllReady = true;
        } else {
            this.isAllReady = false;
        }
    }

    startGame () {
        this.game = new Game(this);
    }

}

module.exports = Table;