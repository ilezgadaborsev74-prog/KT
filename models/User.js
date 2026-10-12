const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastname:{
        type: String,
        required:true,
        trim:true
    },
    age: {
        type: Number,
        required: false
    }
})

module.exports = mongoose.model("User", UserSchema)