const uuidv4 = require('uuid').v4;

const messageExpirationTimeMS = 15 * 60 * 1000;

class MessageHandler {
    constructor(io, socket, location, store) {
        this.io = io;
        this.socket = socket;
        this.location = location;
        this.store = store;

        socket.on('get all messages', data => {if(data.location === this.location) this.getAllMessages(data)});
        socket.on('new message', data => {if(data.location === this.location) this.handleNewMessage(data)});
    }

    getAllMessages (data) {

        this.store.messages.get().forEach(message => {

            this.io.to(data.user.socketId).emit('new message', {
                location: data.location,
                message: message
            });
            
        });
        
    }

    handleNewMessage(data) {

        let newMessage = {
            id: uuidv4(),
            user: this.store.users.get(this.socket.id),
            value: data.value,
            time: Date.now()
        }

        this.store.messages.set(newMessage);

        this.io.to(this.location).emit('new message', {
            location: this.location,
            message: newMessage
        });

        setTimeout(
            () => {
                this.store.messages.delete(message);
                this.io.sockets.emit('deleteMessage', message.id)
            },
            messageExpirationTimeMS
        );
    }
}

module.exports = MessageHandler;