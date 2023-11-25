const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')


const authRouter = require('./routes/auth')
const gamesRouter = require('./routes/games')
const {checkForAuthentication} = require('./middleware/authentication')


const app = express()
const port = process.env.port || 8000

mongoose.connect('mongodb://127.0.0.1:27017/JoJo-games').then(
    (e) => {
        console.log('mongodb connected')
    }
)

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkForAuthentication('token'))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.use('/auth', authRouter)
app.use('/games', gamesRouter)
app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`)
})