const mongoose = require('mongoose');

// accessing schema of quiz
const Quiz = require('../../models/Quiz');
const { response } = require('express');

// updating quiz
module.exports.modifyquiz = async (req, res) => {
    try {
        // console.log("id "+req.body.quiz_id)
        date=new Date()
        // console.log("date: "+date)
        const quiz = await Quiz.searchAndModifyQuizById(req.body.quiz_id,req.body.questions,date)

        // console.log("quiz response :"+quiz)
        var response = {
            "success": true,
            "data": {
                report:"modified"
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
