const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
    quizId:{
        type: mongoose.ObjectId,
        required: true,
        ref:'quiz'
    },
    title:{
        type: String,
        required: true
    },
    time:{ //seconds
        type:Number
    },
    points:{
        type:Number,
        required: true
    },
    correctAnswerIndex:{
        type:Number,
        required: true
    },
    answers:{
        type:[String],
        required: true
    }
})

const Questions = mongoose.model('questions',questionsSchema);
module.exports =  Questions;
