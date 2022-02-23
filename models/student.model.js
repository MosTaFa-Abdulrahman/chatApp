const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    phone: Number,
})
const User = mongoose.model('user', userSchema)
const url = "mongodb://localhost:27017/colleage";

module.exports.postStudent = (firstName, lastName, age, phone) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            let user = new User({
                firstName: firstName,
                lastName: lastName,
                age: age,
                phone: phone,
            })
            return user.save()
        }).then((user) => {
            mongoose.disconnect()
            resolve(user)
        }).catch(err => reject(err))

    })
}

module.exports.getStudents = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return User.findOne({})
        }).then((users) => {
            mongoose.disconnect()
            resolve(users)
        }).catch(err => reject(err))

    })
}

module.exports.deleteStudent = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return User.deleteOne({ _id: id })
        }).then((user) => {
            mongoose.disconnect()
            resolve(user)
        }).catch(err => reject(err))

    })
}

module.exports.updateStudent = (id, firstName, lastName, age, phone) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return User.updateMany({ _id: id }, { firstName: firstName, lastName: lastName, age: age, phone: phone })
        }).then((user) => {
            mongoose.disconnect()
            resolve(user)
        }).catch(err => reject(err))

    })
}