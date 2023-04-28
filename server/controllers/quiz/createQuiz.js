const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

// accessing schema of quiz
const Quiz = require('../../models/Quiz');
const { response } = require('express');


// function for creating quiz where user request fetched by using post method 
// also appending the created date in the requested json and stored in the mongodb datebase
module.exports.createquiz = async (req, res) => {

    

    try {
        const quiz = new Quiz(req.body);

        // console.log(quiz)
        // console.log("req.body.token: "+req.body.token)
    
        // token came from header file and fetched by header function and decoded in verify()
        const token = req.header('authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'MY_SECRET')
        // console.log("decoded: "+decoded._id)

        quiz.userId = decoded._id
        // console.log(quiz)
        var date = new Date()

        // appending full date with time in quiz json body
        quiz.updated_at = date

        quiz.created_at = date
        // console.log(quiz)

        // Storing data to database
        await quiz.save()
        var response = {
            "success": true,
            "data": {
                "quiz_id": quiz._id
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
