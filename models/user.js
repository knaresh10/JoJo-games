const {Schema, model} = require('mongoose')
const {createHmac, randomBytes} = require('crypto')
const {createTokenForUser} = require('../services/authentication')

const userSchema = new Schema({
    fullName: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        require: true
    }
}, {timestamps: true})

userSchema.pre('save', function(next) {
    const user = this
    if(!user.isModified('password')) return 

    const salt = randomBytes(16).toString()
    const hashPassword = createHmac('sha256', salt)
    .update(user.password)
    .digest('hex')

    this.salt = salt
    this.password = hashPassword

    next()
})


userSchema.static('matchPasswordAndGenerateToken', async function(userName, password) {
    const user = await this.findOne({userName})
    if(!user) throw new Error('User not found!')

    const salt = user.salt
    const hashPassword = user.password

    const userProvidedPasswordHash = createHmac('sha256', salt)
    .update(password)
    .digest('hex')

    if(hashPassword != userProvidedPasswordHash) throw new Error('Incorrect Password')
    const token = createTokenForUser(user)
    return token
})

const User = model('user', userSchema)

module.exports = User