const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

// accessing schema of quiz
const Challenge = require('../../models/Challenge');
const { response } = require('express');

// fetching feedback
module.exports.fetchingfeedback = async (req, res) => {
    try {
        // getting challenge id by parameters 
        quiz_challenge_id = req.params.id;
        console.log("challange response: ", quiz_challenge_id);
        
        // calling function
        const fetchedData = await Challenge.fetchFeedbackById(quiz_challenge_id)
        
        var response = {
            "success": true,
            "data": {
                fetchedData
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
