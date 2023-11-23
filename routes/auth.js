const {Router} = require('express')
const router = Router()
const User = require('../models/user')

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async (req, res) => {
    const {fullName, userName, password} = req.body
    await User.create({
        fullName,
        userName,
        password
    })
    res.redirect('signIn')
})

router.get('/signIn', (req, res) => {
    res.render('signIn')
})

router.post('/signIn', async (req, res) => {
    const {userName, password} = req.body
    try {
        const token = await User.matchPasswordAndGenerateToken(userName, password)
        // console.log(user)
        // console.log(req.user)
        res.cookie('token', token).render('main', {
            user : req.user
        })
    } catch(e) {
        console.log('error has happen')
    }

    // res.redirect('/main')
})

module.exports = router