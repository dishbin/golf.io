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
        console.log(this.users);
        console.log('setting');
        console.log(user);
        console.log(this.users);
        this.users.set(user.socketId, user);
    }

    remove (user) {
        this.users.delete(user.socketId);
    }

    userDisconnected (socketId) {
        console.log('DELETING USER');
        console.log(socketId);
        this.users.delete(socketId);
    }

}

module.exports = UserStore;