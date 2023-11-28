const {Schema, model} = require('mongoose')

const gameSchema= new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    leaderBoard: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }, 
            highestScore: {
                type: Number,
                default: 0,
            }
        }
    ]
})

module.exports = model('game', gameSchema)