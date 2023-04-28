const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

// accessing schema of quiz
const Challenge = require('../../models/Challenge');
const { response } = require('express');

// adding feedback
module.exports.insertFeedback = async (req, res) => {
    try {
        // getting challenge id and user id by parameters and token
        quiz_challenge_id = req.params.id;
        console.log("challange response: ", req.body);
        var feedback = req.body
        console.log("challange response: ", quiz_challenge_id);
        const token = req.header('authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'MY_SECRET');
        userId= decoded._id
        
        // calling function
        const update = await Challenge.insertFeedbackInChallengeById(userId,quiz_challenge_id,feedback)
        
        var response = {
            "success": true,
            "data": {
                "report":"modified"
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
