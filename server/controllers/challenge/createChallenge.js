const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const Challenge = require('../../models/Challenge')
const Quiz = require('../../models/Quiz');
const User = require('../../models/User');

//Module to create a challenge, accept incoming data from client and store it in the databse.
module.exports.createChallenge =  async(req, res) => {
    try {
        quiz_id = req.params.id;    //get the quiz ID from the params
        const challenge = new Challenge(req.body);
        console.log("In create challenge",req.body);
        var result = await Quiz.find({ _id: quiz_id });             //Search for if it exists in the Quiz schema
        
        const token = req.header('authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'MY_SECRET'); 
        var user = await User.findOne({ _id: decoded._id });    //Get the user ID from the JWT
        const game_pin = challenge.generatePin();                   //Generate a game pin
        challenge.host.name = user.username;                           //Store the asscociated host of challenge name in the challenge schema
        // challenge.title = result[0].title;
        // challenge.quizID = quiz_id;
        // challenge.save()
        Quiz.storeChallengeId(quiz_id, challenge._id);                  //Store the associated challenge ID in the quiz schema
        challenge.quiz_id = quiz_id;
        challenge.save()
        console.log("CHALLENGe:"+challenge)
        //add challenge id to user schema
        user.challenges.push(challenge._id)                             //Store the challenge ID in the User schema
        user.save();
        
        // result[0].challenges.push(challenge._id);
        // result[0].save();
        var response = {                                                //Send response
            "success": true,
            "data": {
                "challenge_id": challenge._id,
                "game_pin": game_pin,
                "message":"created"
            }
        }
        res.status(201).json(response)
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