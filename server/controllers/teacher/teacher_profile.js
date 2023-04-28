const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Quiz=require('../../models/Quiz');
const json = require('body-parser/lib/types/json');


module.exports.dashboard = (req, res) => {
    res.send("list of quizzes");
};

//PROFILE DISPLAY

module.exports.displayprofile = async(req,res) => {
    try{    
    const token = req.header('authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'MY_SECRET')
    const user=await User.findById(decoded._id)

    var response = {
        "success": true, 
        "data": {
            user: {
                "email": user.email,
                "username": user.username  
            },
        }
    }
    res.json(response);
} catch(e){
    var response = {
        "success": false,
        "error": {
            "message" : e.message
        }
    }
    res.status(400).json(response)
}
};

//DISPLAY ALL MY QUIZZES
module.exports.myQuizzes = async(req,res) => {
    try{    
    const token = req.header('authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'MY_SECRET')
    const user=await User.findById(decoded._id)
        const quiz = await Quiz.find({ userId: decoded._id })
        console.log("QUIZZEESSS")

    var response = {
        "success": true, 
        "data": {
            "quiz":quiz
        }
    }
    res.json(response);
} catch(e){
    var response = {
        "success": false,
        "error": {
            "message" : e.message
        }
    }
    res.status(400).json(response)
}
};

//DISPLAY QUIZ BY ID

module.exports.myQuizzById = async(req,res) => {
    try {    
        const quiz_id = req.params.id;
        var formatted_quiz_id = quiz_id.replace(":", "")
    const token = req.header('authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'MY_SECRET')
    const quiz = await Quiz.find({ userId: decoded._id, _id: formatted_quiz_id})     
    var response = {
        "success": true, 
        "data": {
            "quiz":quiz
        }
    }
    
    res.json(response);
} catch(e){
    var response = {
        "success": false,
        "error": {
            "message" : e.message
        }
    }
    res.status(400).json(response)
}
};


//UPDATE PROFILE
module.exports.updateprofile = async(req,res) => {
    try{  
        const token = req.header('authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'MY_SECRET')
        req.body.password = await bcrypt.hash(req.body.password, 8)
    
    User.findByIdAndUpdate(decoded._id,
        {
            $set: {email: req.body.email, username: req.body.username, 
                password: req.body.password}
        },
        {
            new: true
        },
        function (err,updatedProfile) {
            if(err)
            {
                res.send("Error in Updating");
            }
            else{
                res.json(updatedProfile);
            }
            
        }
    )
} catch(e){
    var response = {
        "success": false,
        "error": {
            "message" : e.message
        }
    }
    res.status(400).json(response)
}
};