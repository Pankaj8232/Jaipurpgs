
const mongoose = require("mongoose")

const Userschema = new mongoose.Schema({
    username: String,
    email: String,
    age: Number
})

const Data = mongoose.model("users", Userschema)

module.exports = Data
