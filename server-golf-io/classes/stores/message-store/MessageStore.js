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
}

module.exports = MessageStore;