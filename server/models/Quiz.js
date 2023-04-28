const { number, required, date } = require('joi');
var mongoose = require('mongoose');

// to generate the database schema
// keys: userID,quizName,description,created_at,updated_at,questions
// questions: questionName,questionType,timeLimit,maxCreditPoint,options,answers
var quizSchema = new mongoose.Schema({
    schema_version: {
        type: Number,
        default: 1.0
    },
    userId: {
        type: String,           //from users collection 
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false
    },
    created_at: {
        type: String,
        required: true,             //Standard IST 
    },
    updated_at: {
        type: String,             //Standard IST
        required: false
    },
    questions: [
        {
            title: {
                type: String,
                // unique:true,
                required: true,
                maxlength: 120
            },
            questionType: {
                type: String,            //input: "MCQ" or "True or False"
                required: true
            },
            timeLimit: {
                type: Number,
                default: 30   //in seconds
            },
            maxCreditPoint: {
                type: Number,
                default: 100,     //in points for frontend
                required: true
            },
            // first two options are mandatory 
            options: {
                option1: {
                    type: String,
                    required: true,
                    // unique: true,
                    maxlength: 75
                },
                option2: {
                    type: String,
                    required: true,
                    // unique: true,
                    maxlength: 75
                },
                option3: {
                    type: String,
                    required: false,
                    // unique: true,
                    maxlength: 75
                },
                option4: {
                    type: String,
                    required: false,
                    // unique: true,
                    maxlength: 75
                },

            },
            answers: []         //has data as correct key of option object like ["option1","option3"]
        }
    ],
    challengeID: []

});

// callling from deleteQuiz.js
quizSchema.statics.searchAndRemoveQuizById = async function (quizId) {

    // console.log("quiz id from serach: " + quizId)
    const quiz = await Quiz.remove({ "_id": quizId });

    return quiz
}

// calling from modifyQuiz.js
quizSchema.statics.searchAndModifyQuizById = async function (_id, questions, updated_date) {
    // appending full date with time in quiz json body
    const quiz = await Quiz.findByIdAndUpdate({ "_id": _id }, { "questions": questions, "updated_at": updated_date });

    return quiz
}

quizSchema.statics.storeChallengeId = async function (quizId, challengeId) {

    const quiz = await Quiz.findOneAndUpdate(
        { _id: quizId },
        { $push: { challengeID: challengeId } },
        { new: true }
    )
}



// Exporting schema to controllers/quiz
const Quiz = mongoose.model('Quiz', quizSchema)
Quiz.createIndexes()
module.exports = Quiz
