const { v4 } = require('uuid');
const Table = require('./classes/table/Table');
const getTextColor = require('./classes/utils/getTextColor');

const lobbyMessages = new Set();
const users = new Map();
const tables = new Map();
for (let i = 0; i < 4; i++) {
    let tbl = new Table('table' + (i + 1));
    tbl.name = 'table' + (i + 1);
    tables.set(tbl.id, tbl);
}

const messageExpirationTimeMS = 15 * 60 * 1000;

class Connection {
    constructor(io, socket) {
        this.socket = socket;
        this.io = io;

        socket.on('new user login', user => this.handleUser(user));

        socket.on('get lobby messages', () => this.getLobbyMessages());
        socket.on('lobby message', (message) => this.handleMessage('lobby', message));

        socket.on('get table messages', (table) => this.getTableMessages(table));
        socket.on('table message', (message) => this.handleMessage(message.location, message.value));

        socket.on('getUsers', () => this.getUsers());
        socket.on('get table users', table => this.getTableUsers(table));

        socket.on('getTables', () => this.getTables());

        socket.on('join table', seating => this.joinTable(seating));
        socket.on('player left', data => this.handlePlayerLeaving(data.table, data.seat, data.user));

        socket.on('disconnect', () => this.disconnect());
        socket.on('connect_error', (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
    }
    
    handleUser (user) {
        if (users.get(this.socket.id) === undefined) {
            const newUser = {
                name: user.username,
                socketId: this.socket.id,
                id: v4(),
                textColor: getTextColor()
            }
            users.set(newUser.socketId, newUser);
            this.socket.join('lobby');
            this.sendUser(newUser);
        }
    }

    sendUser (user) {
        this.io.to('lobby').emit('lobby user', user);
    }

    sendTableUser (location, seat, user) {
        let data = {
            seat: seat,
            user: user
        }
        this.io.to(location).emit('table user', data);
    }

    getUsers () {
        users.forEach((user) => this.sendUser(user));
    }

    getTableUsers (table) {
        let tblName = table.name;
        Object.entries(table.seats).forEach(seat => this.sendTableUser(tblName, seat[0],seat[1]));
    }

    // ***************

    sendMessage (message) {
        this.io.sockets.emit('message', message);
    }

    sendLobbyMessage (message) {
        this.io.to('lobby').emit('lobby message', message);
    }

    sendTableMessage (location, message) {
        console.log(location);
        console.log(message);
        let table = tables.get(location);
        console.log(table);
        this.io.to(table.name).emit('table message', message);
    }

    getLobbyMessages () {
        lobbyMessages.forEach((message) => this.sendLobbyMessage(message));
    }

    getTableMessages (table) {
        let tbl = tables.get(table.id);
        tbl.messages.forEach(message => this.sendTableMessage(table.id, message));
        // tables[id].messages.forEach(message => this.sendTableMessage(message));
    }

    handleMessage (location, value) {
        const message = {
            id: v4(),
            user: users.get(this.socket.id),
            value,
            time: Date.now()
        }
        if (location === 'lobby') {
            lobbyMessages.add(message);
            this.sendLobbyMessage(message);
        } 
        else if (location.split('TYPE:ID')[0] === 'table') 
        {
            let tableId = location.split('TYPE:ID')[1];
            console.log(tableId);
            let tbl = tables.get(tableId)
            tbl.messages.add(message); 
            this.sendTableMessage(tableId, message);
        }

        setTimeout(
            () => {
                lobbyMessages.delete(message);
                this.io.sockets.emit('deleteMessage', message.id)
            },
            messageExpirationTimeMS
        );
    }

    // **************

    sendTable (table) {
        this.io.sockets.emit('table', table);
    }

    getTables () {
        tables.forEach((table) => {
            this.sendTable(table);
        });
    }

    joinTable (seating) {
        let theTable = tables.get(seating.table);
        if (theTable.isFull !== true) {
            let newSeats = {...theTable.seats};
            newSeats[seating.seat] = seating.user;
            theTable.seats = newSeats;
            if (Object.values(newSeats).every(val => val !== 'empty')) {
                console.log('table is now full');
                theTable.isFull = true;
            }
            this.socket.join(theTable.name);
            this.io.to(theTable.name).emit('in room', { seating: seating, table: theTable});
            this.io.to(this.socket).emit('taking a seat in room', theTable);

            this.io.to('lobby').emit('user seating', tables);
        }
        
        // tables[seating.table] = Table.join(tables.get(seating.table), seating);
        // this.io.sockets.in(tables.get(seating.table).name).emit('new seating', seating);
    }

    handlePlayerLeaving (table, seat, user) {
        let tblId = table.id;
        let tbl = {...table};
        tbl.seats[seat] = 'empty';
        this.socket.join('lobby');
        this.sendUser(user);
        tables[tblId] = tbl;
        this.io.to(tbl.name).emit('player left', { table: tbl, seat, user });
    }

    // ****************

    disconnect () {
        users.delete(this.socket);
    }
}

function openLobby(io) {
    io.on('connection', (socket) => {
        new Connection(io, socket);
    });
};

module.exports = openLobby;