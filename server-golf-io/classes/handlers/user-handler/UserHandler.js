const uuidv4 = require('uuid').v4;
const getTextColor = require('../../utils/getTextColor');

class UserHandler {

    constructor (io, socket, location, store) {
        this.io = io;
        this. socket = socket;
        this.location = location;
        this.store = store;

        socket.on('new user login', data => this.handleNewUser(data));
    }

    handleNewUser (data) {
        if (this.store.users.get(this.socket.id) === undefined) {
            let newUser = {
                id: uuidv4(),
                name: data.username,
                socketId: this.socket.id,
                textColor: getTextColor()
            }

            this.socket.to('lobby');

            this.store.users.set(newUser);
            this.io.to('lobby').emit('new user connected', {
                location: 'lobby', 
                user: newUser
            });
            this.io.to('lobby').emit('new message', {
                location: 'lobby',
                message: {
                    id: uuidv4(),
                    user: 'server',
                    value: data.username + ' joined the lobby',
                    location: 'lobby',
                    time: Date.now()
                }
            })
        }
    }
}

module.exports = UserHandler;