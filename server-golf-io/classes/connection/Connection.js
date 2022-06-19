const MessageHandler = require('../handlers/message-handler/MessageHandler');
const Store = require('../stores/store/Store');
const TableHandler = require('../table-handler/TableHandler');
const UserHandler = require('../user-handler/UserHandler');

class Connection {
    constructor (io, socket, rooms) {
        this.io = io;
        this.socket = socket;
        this.rooms = rooms;

        this.socket.join('lobby');
        this.location = 'lobby';
        this.room = rooms.get('lobby');

        // handlers ****************

        const messageHandler = new MessageHandler(this.io, this.socket, this.location, this.room, this.rooms);
        const userHandler = new UserHandler(this.io, this.socket, this.location, this.room);
        const tableHandle = new TableHandler(this.io, this.socket, this.rooms, this.room);

        // *************************

        socket.on('disconnect', () => this.disconnect());
        socket.on('connect_error', (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
    }

    disconnect () {
        this.room.users.getAll().delete(this.socket);
        if (this.location !== 'lobby') {
            this.rooms.get('lobby').users.getAll().delete(this.socket);
        }
    }
}

function join(io, rooms) {
    io.on('connection', (socket) => {
        new Connection(io, socket, rooms);
    });
};

module.exports = join;