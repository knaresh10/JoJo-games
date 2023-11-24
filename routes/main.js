const {Router} = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.render('main')
})

router.get('/sudoku', (req, res) => {
    res.render('sudoku')
})

router.get('/tic-tac-toe', (req, res) => {
    res.render('tic-tac-toe')
})

router.get('/snake', (req, res) => {
    res.render('games/snake')
})

router.get('/chess', (req, res) => {
    res.render('chess')
})

router.get('/block', (req, res) => {
    res.render('block')
})


module.exports = router