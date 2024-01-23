const Game = require('../models/game')
const createOrReadGameData = async (gameName, userId) => {
    try {
        let gameData = await Game.findOne({name : gameName, 'leaderboard.user' : userId})
        if(!gameData) {
            gameData = new Game.create({
                name : gameName,
                leaderboard : [{user : userId}]
            })
            await gameData.save()
        }
        return gameData
    } catch (e) {

    }
}

module.exports = {
    createOrReadGameData
}