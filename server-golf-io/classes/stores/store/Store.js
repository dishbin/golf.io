const uuidv4 = require('uuid').v4;

const { uuid } = require('uuidv4');
const UserStore = require('../user-store/UserStore');
const MessageStore = require('../message-store/MessageStore');

class Store {
    constructor(name) {
        this.name = name;
        this.messages = new MessageStore();
        this.users = new UserStore();
    }

    userDisconnected (data) {
        this.users.userDisconnected(data.scoketId);
    }
}

module.exports = Store;