const mongoose = require("mongoose")

const subjectSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true , "Название обязательно"],
        trim: true
    },
    teacher:{
        type: String,
        required: [true , "Учитель обязателен"],
        trim: true
    },
    hours:{
        type: Number,
        required: [true , "Количество часов обязательно"],
        min: 0
    },
    grade:{
        type: Number,
        required: false,
        min: 0,
    }
    
})

module.exports = mongoose.model("Subject", subjectSchema)