const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Challenge = require('../../models/Challenge')
const Quiz = require('../../models/Quiz');
const User = require('../../models/User');

module.exports.joinChallenge =  async(req, res) => {
    try {
        //pin verification
        const gamePIN = req.body.gamePin;
        // console.log("Game Pin", gamePIN);
        const challenge=await Challenge.findOne({gamePIN})

        const token = req.header('authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'MY_SECRET'); 
        var user = await User.findOne({ _id: decoded._id });

        var isSubmitted = await Challenge.checkIfSubmitted(decoded._id, challenge._id);

        //if pin exists
        if(challenge){
        const isEnded=challenge.checkIsExpired();
        
        if(!isEnded){
            //add challenge id to user schema
            user.played_challenges.push(challenge._id)
            user.save();

            const quiz_id=challenge.quiz_id;
            //fetch associated quiz
            const quiz=await Quiz.findOne({_id:quiz_id})
            var response = {
                "success": true,
                "data": {
                    "quiz":"Successfully verified game pin"
                }
            }
        }
        //if challenge is started before start date or after end date
        else{
            var response = {
                "success": false,
                "data": {
                    "message":"Unable to access the challenge"
                }
            }
        }
        }
        //if game pin is incorrect
        else{
            var response = {
                "success": false,
                "data": {
                    "message":"Incorrect game pin"
                }
            }
        }
        
        res.json(response)
    } catch (e) {
        var response = {
            "success": false,
            "error": {
                "message": e.message
            }
        }
        res.status(400).json(response)
    }
};


module.exports.playChallenge =  async(req, res) => {
    try {
        //pin verification
        const gamePIN = req.body.gamePin;
        console.log("Game Pin", req.body);
        const challenge=await Challenge.findOne({gamePIN})

        const token = req.header('authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'MY_SECRET'); 
        var user = await User.findOne({ _id: decoded._id });

        

        //if pin exists
        if(challenge){
        const isEnded=challenge.checkIsExpired();
        
        if(!isEnded){
            //add challenge id to user schema
            // user.challenges.push(challenge._id)
            // user.save();

            const quiz_id=challenge.quiz_id;
            //fetch associated quiz
            const quiz=await Quiz.findOne({_id:quiz_id})
            var response = {
                "success": true,
                "data": {
                    "question_length":quiz.questions.length,
                    "quiz": quiz,
                    "Challenge_ID":challenge._id
                }
            }
        }
        //if challenge is started before start date or after end date
        else{
            var response = {
                "success": false,
                "data": {
                    "message":"Unable to access the challenge"
                }
            }
        }
        }
        //if game pin is incorrect
        else{
            var response = {
                "success": false,
                "data": {
                    "message":"Incorrect game pin"
                }
            }
        }
        
        res.json(response)
    } catch (e) {
        var response = {
            "success": false,
            "error": {
                "message": e.message
            }
        }
        res.status(400).json(response)
    }
};

