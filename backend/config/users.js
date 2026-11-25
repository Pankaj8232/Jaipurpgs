
const mongoose = require("mongoose")

const Userschema = new mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    pincode:Number,
    city:String,
    State:String,
    img:String
})

const Data = mongoose.model("users", Userschema)

module.exports = Data
