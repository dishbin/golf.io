const { v4 } = require('uuid');
const Table = require('./classes/table/Table');

const messages = new Set();
const users = new Map();
const tables = new Map();
for (let i = 0; i < 4; i++) {
    let tbl = new Table('table' + (i + 1));
    tbl.name = 'table' + (i + 1);
    tables.set(tbl.id, tbl);
}

const defaultUser = {
    id: 'anon',
    name: 'Anonymous'
};

const messageExpirationTimeMS = 15 * 60 * 1000;

class Connection {
    constructor(io, socket) {
        this.socket = socket;
        this.io = io;

        socket.on('new user login', user => this.handleUser(user));

        socket.on('getMessages', () => this.getMessages());
        socket.on('message', (message) => this.handleMessage(message));

        socket.on('getUsers', () => this.getUsers());

        socket.on('getTables', () => this.getTables());

        socket.on('disconnect', () => this.disconnect());
        socket.on('connect_error', (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
    }
    
    handleUser (user) {
        if (users.get(user.username) === undefined) {
            const newUser = {
                username: user.username,
                socketId: this.socket.id,
                id: v4()
            }
            users.set(newUser.username, newUser);
            this.sendUser(newUser);
        }
    }

    sendUser (user) {
        this.io.sockets.emit('lobby user', user);
    }

    getUsers () {
        users.forEach((user) => this.sendUser(user));
    }

    // ***************

    sendMessage (message) {
        this.io.sockets.emit('message', message);
    }

    getMessages () {
        messages.forEach((message) => this.sendMessage(message));
    }

    handleMessage (value) {
        const message = {
            id: v4(),
            user: users.get(this.socket) || defaultUser,
            value,
            time: Date.now()
        }

        messages.add(message);
        this.sendMessage(message);

        setTimeout(
            () => {
                messages.delete(message);
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