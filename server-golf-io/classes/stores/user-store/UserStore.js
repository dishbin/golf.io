class UserStore {
    
    constructor () {
        this.users = new Map();
    }

    getAll () {
        return this.users;
    }

    getSockets () {
        return this.users.keys();
    }

    get (user) {
        return this.users.get(user);
    }

    set (user) {
        this.users.set(user.socketId, user);
    }

    remove (user) {
        this.users.delete(user.socketId);
    }

    userDisconnected (socketId) {
        this.users.delete(socketId);
    }

}

module.exports = UserStore;