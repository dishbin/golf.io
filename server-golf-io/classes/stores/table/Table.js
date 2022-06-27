const uuidv4 = require('uuid').v4;

const Game = require('../../game-classes/game/Game');
const NPC = require('../../game-classes/NPC/NPC');
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

    userPlayAnyway (data) {
        console.log(data);
        this.seats[data.seat] = {
            ...this.seats[data.seat],
            readyToPlayAnyway: true
        }
        return this.checkForPlayAnyway();
    }

    checkForPlayAnyway () {
        if (Object.values(this.seats).every(seat => seat === 'empty' || seat.readyToPlayAnyway !== undefined || seat.readyToPlayAnyway === true)) {
            this.populateNPCs();
            return true;
        }
        return false;
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

    populateNPCs () {
        let seats = {...this.seats};
        for (let seat in seats) {
            if (seats[seat] === 'empty') {
                seats[seat] = new NPC();
            }
        }
        this.seats = seats;
    }

    startGame () {
        this.game = new Game(this);
    }

    userDisconnected (data) {
        this.users.userDisconnected(data.socketId);
        if (this.name !== 'lobby') {
            Object.entries(this.seats).forEach(seat => {
                if (seat[1].socketId === data.socketId) {
                    this.seats[seat[0]] = 'empty'
                }
            });
        }
        if (this.game !== undefined) {
            let replacementPlayer = this.game.removePlayer(data.socketId);
            this.seats[replacementPlayer.seat] = replacementPlayer.player;
        }
    }

}

module.exports = Table;