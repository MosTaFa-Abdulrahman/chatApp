const route = require('express').Router()
const userModel = require('../models/user.model')

route.post('/register', (req, res, next) => {
    userModel.register(req.body.name, req.body.email, req.body.password)
        .then(user => res.status(200).json({ user: user, msg: 'Registered Good ☻' }))
        .catch(err => res.status(400).json({ err: err }))
})

route.post('/login', (req, res, next) => {
    userModel.login(req.body.email, req.body.password)
        .then(token => res.status(200).json({ token: token, msg: 'Login Good ☻' }))
        .catch(err => res.status(400).json({ err: err }))
})

module.exports = route