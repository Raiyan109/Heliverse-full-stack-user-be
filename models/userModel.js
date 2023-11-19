const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    gender: String,
    avatar: String,
    domain: String,
    available: Boolean,
})

module.exports = mongoose.model('User', userSchema)