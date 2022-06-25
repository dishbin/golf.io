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
        console.log(Object.keys(this.users));
        // if (Object.keys(this.users).includes(socketId)) {
        //     this.users.delete(socketId);
        // }
    }

}

module.exports = UserStore;