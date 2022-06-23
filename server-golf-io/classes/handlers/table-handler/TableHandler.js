const uuidv4 = require('uuid').v4;

class TableHandler {

    constructor (io, socket, rooms, room) {
        this.io = io;
        this.socket = socket;
        this.rooms = rooms;
        this.room = room;

        socket.on('get all tables', data => this.sendAllTables(data));

        socket.on('user is ready', data => this.handleUserReady(data));

        socket.on('get players', data => this.handleGetPlayers(data));

        // socket.on('join table', data => this.handleSeating(data));

        // socket.on('player left', data => this.handleLeaving(data));

    }

    handleNewTable () {

    }

    deleteTable () {

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
        let user = Object.entries(data.location.seats).find(seat => seat[1].id === data.user.id );
        let table = data.location;
        table.seats[user[0]] = {
            ...user[1],
            isReady: true
        };
        this.io.to(table.name).emit('user is ready', {
            table: table,
            user: data.user
        });
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

    // handleSeating (data) {
    //     this.rooms.get('lobby').users.remove(data.user);
    //     this.rooms.get(data.table).join(data);
    //     this.socket.join(data.table);
    //     this.room = this.rooms.get(data.table);
    //     this.io.to('lobby').to(data.table).emit('user seating', {
    //         ...data,
    //         table: this.rooms.get(data.table)
    //     });
    //     this.io.to('lobby').to(data.table).emit('new message', {
    //         message: {
    //             id: uuidv4(),
    //             user: 'server',
    //             value: data.user.name + ' sat at table ' + data.table,
    //             time: Date.now()
    //         }
    //     });
    //     this.io.to(data.socketId).emit('joined', {
    //         ...data,
    //         table: this.rooms.get(data.table)
    //     });
    // }

    // handleLeaving(data) {
    //     this.room.leave(data);
    //     this.rooms.get('lobby').users.set(data.user);
    //     if (Object.keys(this.rooms.get('lobby').users).includes(this.socket.id)) {
    //         this.socket.join('lobby');
    //     }
    //     this.room = this.rooms.get('lobby');
    //     this.room.users.set(data.user);
    //     this.io.to('lobby').to(data.table).emit('user got up', {
    //         ...data, 
    //         table: this.rooms.get(data.table.name)
    //     });
    //     this.io.to('lobby').to(data.table).emit('new message', {
    //         id: uuidv4(),
    //         user: 'server',
    //         value: data.user.name + ' got up from table ' + data.table.name,
    //         time: Date.now()
    //     })
    //     this.io.to(data.user.socketId).emit('rejoined lobby', data);
    // }

}

module.exports = TableHandler;