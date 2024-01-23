const Game = require('../models/game')

exports.gameOver = async (gameId, userId, newScore) => {
    try {
        const game = await Game.findOneAndUpdate(
            { _id: gameId, 'leaderboard.user': userId },
            {
              $max: {
                'leaderboard.$.highestScore': newScore,
              },
            },
            { upsert: true, new: true }
          );
    
        return game;
      } catch (error) {
        console.error('Error updating highest score:', error);
        throw error;
      }
}