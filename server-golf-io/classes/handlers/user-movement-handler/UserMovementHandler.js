const uuidv4 = require('uuid').v4;

class UserMovementHandler {
    constructor (io, socket, rooms) {
        this.io = io;
        this.socket = socket;
        this.rooms = rooms;

        socket.on('join table', data => this.handleSeating(data));
        socket.on('player left', data => this.handleLeaving(data));
    }

    handleSeating (data) {
        this.rooms.get('lobby').users.remove(data.user);
        this.rooms.get(data.table).join(data);
        this.socket.join(data.table);
        this.io.to('lobby').to(data.table).emit('user seating', {
            ...data,
            table: this.rooms.get(data.table)
        });
        this.io.to('lobby').emit('new message', {
            location: 'lobby',
            message: {
                id: uuidv4(),
                user: 'server',
                value: data.user.name + ' sat at table ' + data.table,
                time: Date.now()
            }
        });
        this.io.to(data.table).emit('new message', {
            location: data.table,
            message: {
                id: uuidv4(),
                user: 'server',
                value: data.user.name + ' sat down',
                time: Date.now()
            }
        })
        this.io.to(data.socketId).emit('joined', {
            ...data,
            table: this.rooms.get(data.table)
        });
    }

    handleLeaving(data) {
        console.log('leavnig');
        console.log(data);
        this.rooms.get(data.table.name).leave(data);
        this.rooms.get('lobby').users.set(data.user);
        if (Object.keys(this.rooms.get('lobby').users).includes(this.socket.id)) {
            this.socket.join('lobby');
        }
        this.rooms.get('lobby').users.set(data.user);
        this.io.to('lobby').to(data.table).emit('user got up', {
            ...data, 
            table: this.rooms.get(data.table.name)
        });
        this.io.to('lobby').emit('new message', {
            location: 'lobby',
            message: {
                id: uuidv4(),
                user: 'server',
                value: data.user.name + ' got up from table ' + data.table.name,
                time: Date.now()
            }
        });
        console.log('leaving table');
        console.log(data.table);
        this.io.to(data.table.name).emit('new message', {
            location: data.table.name,
            message: {
                id: uuidv4(),
                user: 'server',
                value: data.user.name + ' got up',
                time: Date.now()
            }
        })
        this.io.to(data.user.socketId).emit('rejoined lobby', data);
    }
}

module.exports = UserMovementHandler;