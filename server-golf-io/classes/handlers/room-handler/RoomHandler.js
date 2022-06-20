class RoomHandler {
    constructor (io, socket, rooms) {
        this.io = io;
        this.socket = socket;
        this.rooms = rooms;
    }
}

module.exports = RoomHandler;