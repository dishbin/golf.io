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
        const userMovementHandler = new UserMovementHandler(this.io, this.socket, this.room, this.rooms);
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
        let updatedRoom;
        let userWhoLeft;
        this.rooms.forEach(room => {
            [...room.users.getSockets()].forEach(socket => {
                if (socket === this.socket.id) {
                    userWhoLeft = room.users.get(socket).name;
                    room.userDisconnected({
                        socketId: socket,
                        table: room
                    });
                    updatedRoom = room;
                }
            })
        });

        
        this.io.emit('user disconnected', {
            socketId: this.socket.id,
            table: updatedRoom,
            location: updatedRoom
        });
        this.io.to('lobby').emit('new message', {
            location: 'lobby',
            message: {
                id: uuidv4(),
                user: 'server',
                value: userWhoLeft + ' disconnected'
            }
        });
        if (updatedRoom !== undefined && updatedRoom.name !== 'lobby') {
            this.io.to('lobby').emit('new message', {
                location: updatedRoom.name,
                message: {
                    id: uuidv4(),
                    user: 'server',
                    value: userWhoLeft + ' disconnected'
                }
            });
        }
    }
}

function join(io, rooms) {
    io.on('connection', (socket) => {
        new Connection(io, socket, rooms);
    });
};

module.exports = join;