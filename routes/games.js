const {Router} = require('express')
const Game = require('../models/game')
const {gameOver} = require('../controllers/snake')
const {createOrReadGameData} = require('../services/gameService')

const router = Router()

router.get('/', (req, res) => {
    res.render('games', {
        user: req.user
    })
})

router.get('/sudoku', (req, res) => {
    res.render('games/sudoku')
})

router.get('/tic-tac-toe', (req, res) => {
    res.render('games/tic_tac_toe')
})

router.get('/snake', async (req, res) => {
    const game = createOrReadGameData()
    res.render('games/snake', {
        user: req.user,
        game: game
    })
})

router.post('/gameover', async (req, res) => {
    const {gameId, userId, score} = req.body
    console.log(gameId, userId, score)
    try {
        const updatedGame = await gameOver(gameId, userId, score);
        console.log(updatedGame)
        // res.json({ success: true, game: updatedGame });
      } catch (error) {
        // res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    res.redirect('/games/snake')
})

router.get('/chess', (req, res) => {
    res.render('games/chess')
})

router.get('/block', (req, res) => {
    res.render('games/block')
})


module.exports = router