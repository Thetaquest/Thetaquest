const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Quiz=require('../../models/Quiz');
const json = require('body-parser/lib/types/json');
const Challenge = require('../../models/Challenge')

//VIEW ALL REPORTS
module.exports.viewAllReport = async(req,res) => {
    try{    
    const token = req.header('authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'MY_SECRET')
        const user = await User.findById(decoded._id)
        console.log(decoded._id);
        console.log(user)
        const noOfChallenges = user.challenges.length;
        console.log(noOfChallenges);
    var response=[]
    for (var i=0 ; i<noOfChallenges; i++)
    {
        const challenge=await Challenge.findOne({ _id:user.challenges[i] })
        console.log("Challenge ::::", challenge)
        
        var obj = {
            "success": true, 
            "data": {
                "challenge_name":challenge.title,
                "start_date":challenge.startDatetime,
                "end_date":challenge.endDatetime,

                "sum":challenge.sum,
                "description":challenge.description,
                "image":challenge.image,
                "participationRange":challenge.participationRange,
                "challenge_id":challenge._id
    
            }
        }

        response.push(obj)
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

//VIEW ALL REPORTS - STUDENT
module.exports.viewAllReportStudent = async(req,res) => {
    try{    
    const token = req.header('authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'MY_SECRET')
        const user = await User.findById(decoded._id)
        console.log(decoded._id);
        console.log(user)
        const noOfChallenges = user.played_challenges.length;
        console.log(noOfChallenges);
    var response=[]
    for (var i=0 ; i<noOfChallenges; i++)
    {
        const challenge=await Challenge.findOne({ _id:user.played_challenges[i] })
        console.log("Challenge ::::", challenge)
        
        var obj = {
            "success": true, 
            "data": {
                "challenge_name":challenge.title,
                "start_date":challenge.startDatetime,
                "end_date":challenge.endDatetime,
                "numberOfPlayers":challenge.players.length,

                "sum":challenge.sum,
                "description":challenge.description,
                "image":challenge.image,
                "participationRange":challenge.participationRange,
                "challenge_id":challenge._id
    
            }
        }

        response.push(obj)
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

//VIEW REPORTS BY ID - Summary

module.exports.viewReportByIdSummary = async(req,res) => {
    try{    
        const challenge=await Challenge.findOne({ _id:req.params.id })
        const quiz_id=challenge.quiz_id;
            //fetch associated quiz
        const quiz=await Quiz.findOne({_id:quiz_id})
        var response = {
            "success": true, 
            "data": {
                "challenge_name":challenge.title,
                "start_date":challenge.startDatetime,
                "end_date":challenge.endDatetime,
                "hosted_by":challenge.host["name"],
                "numberOfPlayers":challenge.players.length,
                "game_pin":challenge.gamePIN,
                

                "sum":challenge.sum,
                "description":challenge.description,
                "image":challenge.image,
                "participationRange":challenge.participationRange,
                "numberOfQuestions":quiz.questions.length
    
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

//VIEW REPORTS BY ID - player

module.exports.viewReportById = async(req,res) => {
    try{    
    const challenge=await Challenge.findOne({ _id:req.params.id })
    const token = req.header('authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'MY_SECRET')
    const user = await User.findById(decoded._id)
            const noOfPlayers=challenge.players.length;
            for (var i=0 ; i<noOfPlayers; i++)
            {
                if(decoded._id==challenge.players[i].userId){
                const user=await User.findOne({ _id:challenge.players[i].userId })
                var response = {
                    "success": true, 
                    "data": {
                        "player_name":user.username,
                        "correct_answers":challenge.players[i].noOfCorrectAns,
                        "wrong_answers":challenge.players[i].noOfWrongAns,
                        "score":challenge.players[i].score,
                        "end_date":challenge.endDatetime
            
                    }
                }
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

////
module.exports.viewReportByIdPlayers = async(req,res) => {
    try{    
    const challenge=await Challenge.findOne({ _id:req.params.id })
            const noOfPlayers=challenge.players.length;
            var response=[]
            for (var i=0 ; i<noOfPlayers; i++)
            {
                const user=await User.findOne({ _id:challenge.players[i].userId })
                var obj = {
                    "success": true, 
                    "data": {
                        "player_name":user.username,
                        "correct_answers":challenge.players[i].noOfCorrectAns,
                        "wrong_answers":challenge.players[i].noOfWrongAns,
                        "score":challenge.players[i].score,
                        "end_date":challenge.endDatetime
            
                    }
                }
                response.push(obj)
                
            }

            //Sorting by scores
            response.sort(function(a, b) {
                var keyA = a.data.score,
                  keyB = b.data.score;
                  //console.log(keyA+" "+keyB)
                // Compare the 2 scores
                if (keyA > keyB) return -1;
                if (keyA < keyB) return 1;
                return 0;
              });
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