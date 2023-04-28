const mongoose = require('mongoose');

// accessing schema of quiz
const Quiz = require('../../models/Quiz');
const { response } = require('express');


// function for creating quiz where user request fetched by using post method 
// also appending the created date in the requested json and stored in the mongodb datebase
module.exports.deletequiz = async (req, res) => {


    try {
        // console.log("id "+req.body.quiz_id)
        const quiz = await Quiz.searchAndRemoveQuizById(req.body.quiz_id)

        // console.log("quiz response :"+quiz)
        var response = {
            "success": true,
            "data": {
                report:"deleted"
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
