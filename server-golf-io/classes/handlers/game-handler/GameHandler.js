class GameHandler {
    constructor (io, socket, rooms) {
        this.io = io;
        this.socket = socket;
        this.rooms = rooms;

        socket.on('get player board', data => this.getPlayerBoard(data));
        socket.on('start player turn', data => this.handleStartPlayerTurn(data));
    }

    sendSlot (data) {
        this.io.to(data.location).emit('player slot', {
            ...data
        });
    }

    getPlayerBoard (data) {
        this.io.to(data.user.socketId).emit('player board', {
            board: this.rooms.get(data.table.name).game.players[data.seat].board,
            user: data.user,
            location: data.user.socketId,
            table: this.rooms.get(data.table.name),
            game: this.rooms.get(data.table.name).game.players,
            player: this.rooms.get(data.table.name).game.players[data.seat]
        });
    }

    handleStartPlayerTurn (data) {
        let currentPlayer = this.rooms.get(data.location.name).game.players[this.rooms.get(data.location.name).game.currentTurn];
        console.log(currentPlayer);
    }
}

module.exports = GameHandler;