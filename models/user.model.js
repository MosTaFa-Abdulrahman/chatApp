const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
})
const User = mongoose.model('userweb', userSchema)
const url = "mongodb://localhost:27017/colleage";

module.exports.register = ((userName, email, password) => {
    console.log(userName + ' ' + email + '  ' + password);
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return User.findOne({ email: email })
        }).then((user) => {
            if (user) {
                mongoose.disconnect()
                reject('Email IS Found ♠')
            } else {
                return bcrypt.hash(password, 10)
            }
        }).then((hashPassword) => {
            let user = new User({
                userName: userName,
                email: email,
                password: hashPassword
            })
            return user.save()
        }).then((user) => {
            mongoose.disconnect()
            resolve(user)
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })


    })

})

let secretKey = 'This Is Secret Key 46844515241245545412178923yu23yue2tgy2geghjs2yiu'
module.exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return User.findOne({ email: email })
        }).then((user) => {
            if (!user) {
                mongoose.disconnect()
                reject('Email NoT Found')
            } else {
                return bcrypt.compare(password, user.password).then((verif) => {
                    if (verif) {
                        let token = jwt.sign({ id: user._id, name: user.name }, secretKey, {
                            expiresIn: '1h'
                        })
                        mongoose.disconnect()
                        resolve(token)
                    } else {
                        mongoose.disconnect()
                        reject('Invalid Password')
                    }
                }).catch(err => reject(err))
            }
        })


    })

}