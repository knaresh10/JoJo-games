const {Router} = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.render('games')
})

router.get('/sudoku', (req, res) => {
    res.render('games/sudoku')
})

router.get('/tic-tac-toe', (req, res) => {
    res.render('games/tic_tac_toe')
})

router.get('/snake', (req, res) => {
    res.render('games/snake')
})

router.get('/chess', (req, res) => {
    res.render('games/chess')
})

router.get('/block', (req, res) => {
    res.render('games/block')
})


module.exports = router