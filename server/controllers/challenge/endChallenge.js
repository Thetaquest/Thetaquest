const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const Challenge = require('../../models/Challenge')

module.exports.endChallenge = async (req, res) => { 
    try {
        console.log("REcieved id"+req.params.id)
        quiz_challenge_id = req.params.id;   
        console.log("REcieved id"+quiz_challenge_id)
        var updated = await Challenge.upateEndTime(quiz_challenge_id);
        var response = {
            "success": true,
            "data": {
                    "message": "Succesfully Ended Challenge"
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

}