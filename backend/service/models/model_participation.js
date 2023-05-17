const mongoose = require('mongoose');

const quizParticipationSchema = new mongoose.Schema({
    participant:{
        type: String,//adress of wallet owner
        required: true
    },
    score:{
        type:Number,
        default:0
    },
    quizSmartContractAddress:{
        type: String,
        required: true
    },
    quizId:{
        type: mongoose.ObjectId,
        required: true,
        ref:'quiz'
    },
    correctanswers:{
        type:Number,
        default:0
    },
    incorrectAnswers:{
        type:Number,
        default:0
    }
})

const QuizParticipation = mongoose.model('quizParticipation',quizParticipationSchema);
module.exports =  QuizParticipation;
