class GameHandler {
    constructor (io, socket, rooms) {
        this.io = io;
        this.socket = socket;
        this.rooms = rooms;

        socket.on('get player board', data => this.getPlayerBoard(data));
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
        // let slots = Object.entries(this.rooms.get(data.table.name).game.players[data.seat].board.slots);
        // for (let i = 0; i < slots.length; i++) {
        //     this.sendSlot({
        //         slotName: slots[i][0],
        //         slot: slots[i][1],
        //         user: data.user,
        //         table: this.rooms.get(data.table.name),
        //         game: this.rooms.get(data.table.name).game,
        //         location: data.user.socketId
        //     })
        // }
    }
}

module.exports = GameHandler;