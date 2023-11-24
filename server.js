const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')


const authRouter = require('./routes/auth')
const mainRouter = require('./routes/main')
const {checkForAuthentication} = require('./middleware/authentication')


const app = express()
const port = process.env.port || 8000

mongoose.connect('mongodb://127.0.0.1:27017/JoJo-games').then(
    (e) => {
        console.log('mongodb connected')
    }
)

app.set('view engine', 'ejs')
app.set('games', path.resolve('./views/games'))
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkForAuthentication('token'))
app.use(express.static(path.resolve('public')))

app.get('/', (req, res) => {
    res.render('home')
})


app.use('/auth', authRouter)
app.use('/main', mainRouter)
app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`)
})