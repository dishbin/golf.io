const uuidv4 = require('uuid').v4;

const MessageHandler = require('../handlers/message-handler/MessageHandler');
const Store = require('../stores/store/Store');
const TableHandler = require('../handlers/table-handler/TableHandler');
const UserHandler = require('../handlers/user-handler/UserHandler');
const RoomHandler = require('../handlers/room-handler/RoomHandler');
const UserMovementHandler = require('../handlers/user-movement-handler/UserMovementHandler');
const GameHandler = require('../handlers/game-handler/GameHandler');
const PlayerTurnHandler = require('../handlers/player-turn-handler/PlayerTurnHandler');
const ScoringHandler = require('../handlers/scoring-handler/ScoringHandler');

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
        const tableHandler = new TableHandler(this.io, this.socket, this.rooms, this.room);
        const roomHandler = new RoomHandler(this.io, this.socket, this.rooms);
        const userMovementHandler = new UserMovementHandler(this.io, this.socket, this.rooms);
        const gameHandler = new GameHandler(this.io, this.socket, this.rooms);
        const playerTurnHandler = new PlayerTurnHandler(this.io, this.socket, this.rooms);
        const scoringHandler = new ScoringHandler(this.io, this.socket, this.rooms);


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