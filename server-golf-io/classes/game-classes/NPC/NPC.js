const uuidv4 = require('uuid').v4;

class NPC {
    constructor() {
        this.id = uuidv4();
        this.name = 'NPC-' + this.id;
        this.playerType = 'NPC';
    }
}

module.exports = NPC;