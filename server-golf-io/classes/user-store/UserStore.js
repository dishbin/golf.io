class UserStore {
    
    constructor () {
        this.users = new Map();
    }

    getAll () {
        return this.users;
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

}

module.exports = UserStore;