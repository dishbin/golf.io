const NPC = require('../../game-classes/NPC/NPC');

const uuidv4 = require('uuid').v4;

class PlayerTurnHandler {

    constructor (io, socket, rooms) {
        this.io = io;
        this.socket = socket;
        this.rooms = rooms;

        socket.on('player choice', data => this.handleUserChoice(data));
    }

    handleUserChoice (data) {
        switch (data.choiceType) {
            case 'initial board flip':
                this.handleInitialBoardFlip(data);
                break;
        }
    }

    handleInitialBoardFlip (data) {
        this.rooms.get(data.location.name).game.players[data.seat].board.flipSlotUp({
            slotName: data.slot.name
        });
        this.io.to(data.player.socketId).emit('player board', {
            location: data.player.socketId,
            table: this.rooms.get(data.location.name),
            board: this.rooms.get(data.location.name).game.players[data.seat].board
        });
        this.io.to(data.location.name).emit('update boards', {
            players: this.rooms.get(data.location.name).game.players,
            table: this.rooms.get(data.location.name)
        })
        let nextPlayer = this.rooms.get(data.location.name).game.startNextPlayerTurn();
        if (nextPlayer.playerType === 'NPC') {
            let npcTurnResult = NPC.executeTurn({
                player: nextPlayer,
                table: this.rooms.get(data.location.name),
                game: this.rooms.get(data.location.name).game
            });
            console.log(npcTurnResult);
            // this.io.to(data.location.name).emit('new message', {
            //     location: data.location.name,
            //     message: {
            //         id: uuidv4(),
            //         value: 'it\'s ' + nextPlayer.name + '\'s turn',
            //         user: 'server',
            //         player: nextPlayer,
            //         type: 'turn notifier'
            //     }
            // });
            // let npcTurn = nextPlayer.startTurn({
            //     game: this.rooms.get(data.location.name).game
            // });
            // let nextTurn;
            // setTimeout(() => {
            //     nextTurn = this.rooms.get(data.location.name).game.playerTurn();
            //     if (this.rooms.get(data.location.name).game.players[nextTurn].playerType === 'NPC') {
            //         console.log('another NPC');
            //     } else {
            //         nextPlayer = this.rooms.get(data.location.name).game.players[nextTurn];
            //         setTimeout(() => {
            //             this.io.to(nextPlayer.socketId).emit('your turn', {
            //                 location: this.rooms.get(data.location.name),
            //                 table: this.rooms.get(data.location.name),
            //                 game: this.rooms.get(data.location.name).game,
            //                 player: nextPlayer
            //             });
            //         }, 2000);
            //     }
            //     this.io.to(data.location.name).emit('player flipped card', {
            //         player: nextPlayer,
            //         location: data.location,
            //         playerSeat: npcTurn.seat,
            //         slotFlipped: npcTurn.slot,
            //         playerBoard: npcTurn.board
            //     });
            //     this.io.to(data.location.name).emit('new message', {
            //         location: data.location.name,
            //         message: {
            //             value: npcTurn.player.name + ' flipped over a card on their board',
            //             user: 'server',
            //             id: uuidv4()
            //         }
            //     });
            // }, 1000);
        } 
        else 
        {
            // setTimeout(() => {
            //     let nextPlayer = this.rooms.get(data.location.name).game.players[nextTurn];
            //     this.io.to(nextPlayer.socketId).emit('your turn', {
            //         location: this.rooms.get(data.location.name),
            //         table: this.rooms.get(data.location.name),
            //         game: this.rooms.get(data.location.name).game,
            //         player: nextPlayer
            //     });
            // }, 2000);
        }
        // this.io.to(nextPlayer.socketId).emit('your turn')
    }
}

module.exports = PlayerTurnHandler;