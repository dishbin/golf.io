class AIHandler {

    constructor(io, socket, rooms) {
        this.io = io;
        this.socket = socket;
        this.rooms = rooms;

        socket.on('NPC turn', data => this.handleNPCTurn(data));
    }

}

module.exports = AIHandler;