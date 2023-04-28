const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const Challenge = require('../../models/Challenge')
const Quiz = require('../../models/Quiz');
const User = require('../../models/User');

//Functionality for accepting answers from the user, calculating score and storing it into the database.
module.exports.submitChallenge = async (req, res) => {
    try {
        quiz_challenge_id = req.params.id;          //Get hosted challenge ID from params
        const token = req.header('authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'MY_SECRET');
        var isSubmitted = await Challenge.checkIfSubmitted(decoded._id, quiz_challenge_id); //Checks if quiz issubmitted or not
        var result = await Challenge.find({ _id: quiz_challenge_id });
        var answers = req.body;         //Acceptig answers from the player
        console.log("Answers from user", answers);
        var quiz_id = result[0].quiz_id         //find associated quiz id
        var quiz = await Quiz.findOne({ _id: quiz_id });
        var player_Score = 0;
        var correctAnswer = 0;
        var wrongAnswer = 0;
        for (var i = 0; i < answers.length; i++) {//looping over each object in the request body
            for (var j = 0; j < quiz.questions.length; j++) {
                if (answers[i].question_id == quiz.questions[j]._id) {
                    if (answers[i].answer.length == quiz.questions[j].answers.length && answers[i].answer.every((v) => quiz.questions[j].answers.indexOf(v) >= 0)) {
                        player_Score += quiz.questions[j].maxCreditPoint;
                        correctAnswer += 1;
                    }
                }
            }
        }
        console.log("CORRECT ANSWERS FROM USER", correctAnswer);
        console.log("PLayer Score:", player_Score);
        wrongAnswer = answers.length - correctAnswer;
        const quiz_update_player = await Challenge.findOneAndUpdate(
            { _id: quiz_challenge_id },
            { $push: { players: { userId: decoded._id, score: player_Score, noOfCorrectAns: correctAnswer, noOfWrongAns: wrongAnswer } } },             //Store playerID and score
            { new: true }
            )               //Add score, player_id, correct answers,wrong answers to databse
        var response = {
            "success": true,
            "data": {
                    "message": "Succesfully Submitted"
                }
            }
        res.status(201).json(response)
        
    } catch(e) {
        var response = {
            "success": false,
            "error": {
                "message": e.message
            }
        }
        res.status(400).json(response)
    }


    
};