const uuidv4 = require('uuid').v4;

const messageExpirationTimeMS = 15 * 60 * 1000;

class MessageHandler {
    constructor(io, socket, location, store, rooms) {
        this.io = io;
        this.socket = socket;
        this.location = location;
        this.store = store;
        this.rooms = rooms;

        socket.on('get all messages', data => {this.getAllMessages(data)});
        socket.on('new message', data => this.handleNewMessage(data));
    }

    getAllMessages (data) {

        this.rooms.get(data.location).messages.get().forEach(message => {

            this.io.to(data.user.socketId).emit('new message', {
                location: data.location,
                message: message
            });
            
        });
        
    }

    handleNewMessage(data) {

        console.log('new message at ' + data.location);
        console.log(data);

        let newMessage = {
            id: uuidv4(),
            user: this.store.users.get(this.socket.id),
            value: data.value,
            location: data.location,
            time: Date.now()
        }

        this.rooms.get(data.location).messages.set(newMessage);

        this.io.to(data.location).emit('new message', {
            location: data.location,
            message: newMessage
        });

        setTimeout(
            () => {
                this.rooms.get(data.location).messages.delete(message);
                this.io.sockets.emit('deleteMessage', message.id)
            },
            messageExpirationTimeMS
        );
    }
}

module.exports = MessageHandler;