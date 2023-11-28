const Game = require('../models/game')

const gameOver = async (gameId, userId, newScore) => {
    try {
        const game = await Game.findOne({name: gameId, 'leaderBoard.user': userId})

        if(game) {
            const updateGame = 0
        }
    } catch (e) {

    }
}