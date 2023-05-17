const mongoose = require('mongoose');

const quizSectionsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    videoURL: {
        type: String,
        required: true
    },
    quizId:{
        type: mongoose.ObjectId,
        required: true,
        ref:'quiz'
    }
})

const QuizSections = mongoose.model('quizSections',quizSectionsSchema);
module.exports =  QuizSections;
