const uuidv4 = require('uuid').v4;

class TableHandler {

    constructor (io, socket, rooms, room) {
        this.io = io;
        this.socket = socket;
        this.rooms = rooms;
        this.room = room;

        socket.on('get all tables', data => this.sendAllTables(data));

        socket.on('user is ready', data => this.handleUserReady(data));
        socket.on('get ready users', data => this.handleAllReadyUsers(data));

        socket.on('play anyway', data => this.handlePlayAnyway(data));

        socket.on('get players', data => this.handleGetPlayers(data));

    }

    sendTable (location, table) {
        this.io.to(location).emit('new table', {
            table: table
        });
    }

    sendAllTables (data) {
        this.rooms.forEach(table => {
            if (table.name !== 'lobby') {
                this.sendTable(data.user.socketId, table);  
            }
            
        });
    }

    handleUserReady (data) {
        this.rooms.get(data.location.name).userIsReady(data);
        if (this.rooms.get(data.location.name).isAllReady === true) {
            this.rooms.get(data.location.name).startGame();
            this.io.to(data.location.name).emit('game start', {
                table: this.rooms.get(data.location.name),
                game: this.rooms.get(data.location.name).game
            });
        } else {
            this.io.to(data.location.name).emit('user is ready', {
                table: this.rooms.get(data.location.name),
                user: data.user
            }); 
        }
        
    }

    handleAllReadyUsers (data) {
        this.io.to(this.socket.id).emit('all ready users', {
            seats: this.rooms.get(data.location.name).seats,
            location: this.rooms.get(data.location.name)
        });
    }

    handlePlayAnyway (data) {
        let playAnyway = this.rooms.get(data.location.name).userPlayAnyway(data);
        if (playAnyway === true) {
            this.rooms.get(data.location.name).startGame();
            this.io.to(data.location.name).emit('game start', {
                table: this.rooms.get(data.location.name),
                game: this.rooms.get(data.location.name).game
            });
        }
    }

    sendPlayer (data) {
        this.io.to(data.location).emit('user seating', {
            seat: data.seat,
            user: data.user,
            location: data.table.name,
            table: data.table
        });
    }

    handleGetPlayers (data) {
        let table = this.rooms.get(data.location.name);
        let seats = Object.entries(table.seats);
        this.io.to(this.socket.id).emit('all players', {
            location: this.socket.id,
            table: this.rooms.get(data.location.name),
            players: seats
        });
    }

}

module.exports = TableHandler;