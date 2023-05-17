const mongoose = require('mongoose');

const quizAnswersSchema = new mongoose.Schema({
    student:{
        type:String,
        required: true
    },
    questionId:{
        type: mongoose.ObjectId,
        required: true,
        ref:'quiz'
    }
})

const QuizAnswers = mongoose.model('quizAnswers',quizAnswersSchema);
module.exports =  QuizAnswers;
