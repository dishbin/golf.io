const uuidv4 = require('uuid').v4;

class GameHandler {
    constructor (io, socket, rooms) {
        this.io = io;
        this.socket = socket;
        this.rooms = rooms;

        socket.on('get player board', data => this.getPlayerBoard(data));
        socket.on('start player turn', data => this.handleStartPlayerTurn(data));

        socket.on('slot choice', data => this.handleSlotChoice(data));
    }

    sendSlot (data) {
        this.io.to(data.location).emit('player slot', {
            ...data
        });
    }

    getPlayerBoard (data) {
        this.io.to(data.user.socketId).emit('player board', {
            board: this.rooms.get(data.table.name).game.players[data.seat].board,
            user: data.user,
            location: data.user.socketId,
            table: this.rooms.get(data.table.name),
            game: this.rooms.get(data.table.name).game.players,
            player: this.rooms.get(data.table.name).game.players[data.seat]
        });
    }

    handleStartPlayerTurn (data) {
        let currentPlayer = this.rooms.get(data.location.name).game.players[this.rooms.get(data.location.name).game.currentTurn];
    }

    handleSlotChoice (data) {
        
        this.rooms.get(data.location.name).game.players[data.seat].board.flipSlotUp({
            slotName: data.slot.name
        });
        this.io.to(data.player.socketId).emit('player board', {
            location: data.player.socketId,
            table: this.rooms.get(data.location.name),
            board: this.rooms.get(data.location.name).game.players[data.seat].board
        });
        if (data.choiceType === 'board flip') {
            let nextPlayer = this.rooms.get(data.location.name).game.players[this.rooms.get(data.location.name).game.playerTurn()];
            if (nextPlayer.playerType === 'NPC') {
                let npcTurn = nextPlayer.startTurn({
                    game: this.rooms.get(data.location.name).game
                });
                let nextTurn;
                setTimeout(() => {
                    nextTurn = this.rooms.get(data.location.name).game.playerTurn();
                    if (this.rooms.get(data.location.name).game.players[nextTurn].playerType === 'NPC') {
                        console.log('another NPC');
                    } else {
                        currentPlayer = this.rooms.get(data.location.name).game.players[nextTurn];
                        setTimeout(() => {
                            this.io.to(currentPlayer.socketId).emit('your turn', {
                                location: this.rooms.get(data.location.name),
                                table: this.rooms.get(data.location.name),
                                game: this.rooms.get(data.location.name).game,
                                player: currentPlayer
                            });
                        }, 2000);
                    }
                    this.io.to(data.location.name).emit('player flipped card', {
                        player: currentPlayer,
                        location: data.location,
                        playerSeat: npcTurn.seat,
                        slotFlipped: npcTurn.slot,
                        playerBoard: npcTurn.board
                    });
                    this.io.to(data.location.name).emit('new message', {
                        location: data.location.name,
                        message: {
                            value: npcTurn.player.name + ' flipped over a card on their board',
                            user: 'server',
                            id: uuidv4()
                        }
                    });
                }, 1000);
            } 
            else 
            {

            }
            this.io.to(nextPlayer.socketId).emit('your turn')
        }
    }
}

module.exports = GameHandler;