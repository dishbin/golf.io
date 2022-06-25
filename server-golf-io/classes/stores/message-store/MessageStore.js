class MessageStore {
    constructor() {
        this.messages = new Set();
    }

    get () {
        return this.messages;
    }

    set (message) {
        this.messages.add(message);
    }

    delete (message) {
        this.messages.delete(message);
    }
}

module.exports = MessageStore;