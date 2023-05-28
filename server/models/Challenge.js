var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { boolean, required } = require('joi');

var challengeSchema = new mongoose.Schema({
    schemaVersion: {
        type: Number,
        default: 1.0
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    startDatetime: {
        type: Date,
        required: true
    },
    endDatetime: {
        type: Date,
        required: true
    },
    isExpired: {
        type: Boolean,
        default: false
    },
    settings: {
        isTimeOn: { type: Boolean },
        isRandomQuestionsOn: { type: Boolean },
        isRandomOptionsOn: { type: Boolean },
    },
    gamePIN: {
        type: Number,
        required: true,
        maxlength: 6,
        unique: true,
    },
    feedbacks: [
        {
            userId: {
                type: String,
            },
            parameters: {
                questionQuality: {
                    type: Number,
                    required: true
                },
                overallExperience: {
                    type: Number,
                    required: true
                },
                difficultyLevel: {
                    type: Number,
                    required: true
                }
            }
        }
    ],
    totalFeedbacks: {
        type: Number,
        default: 0
    },
    totalRatings: {
        questionQuality: {
            type: Number,
            default: 0
        },
        overallExperience: {
            type: Number,
            default: 0
        },
        difficultyLevel: {
            type: Number,
            default: 0
        }
    },
    host: {
        name: {
            type: String,
            required: true
        }
    },
    players: [
        {
            userId: {
                type: String,
            },
            noOfCorrectAns: {
                type: Number,
            },
            noOfWrongAns: {
                type: Number,
            },
            score: {
                type: Number,
            },
        }
    ],
    quiz_id: {
        type: String
    },
    image: {
        type: String
    },
    participationRange: {
        type: Number
    },
    rowsData: {
        type: [Number]
    },
    sum: {
        type: Number
    }
});



challengeSchema.methods.generatePin = function () {
    const challenge = this
    var game_pin = Math.floor(100000 + Math.random() * 900000)
    var present = CheckDuplicate(game_pin);
    if (present === false) {
        generatePin();
    }
    else challenge.gamePIN = game_pin;
    return game_pin;

}

function CheckDuplicate(game_pin) {
    Challenge.findOne({ 'gamePin': game_pin, 'isExpired': false }, function (err, result) {
        if (err) return false;
        else if (result) return false;
        else return true;
    });
}

//check if challenge is expired
challengeSchema.methods.checkIsExpired = function () {
    const challenge = this
    const date = new Date()
    console.log(challenge.startDatetime.getTime());
    console.log(date.getTime())
    console.log(challenge.endDatetime.getTime())
    if (challenge.isExpired === false) {
        if (challenge.startDatetime.getTime() <= date.getTime()) {
            return false;
        }
        if (challenge.endDatetime.getTime() >= date.getTime()) {
            console.log("not expired")
            return false;
        }
        else {
            //console.log("expired")
            //update in db
            challenge.isExpired = true;
            challenge.save();
            return true;
        }
    }
    else {
        return true;
    }


}

challengeSchema.statics.checkIfSubmitted = async function (user_id, game_id) {
    // const challenge = this;
    console.log(user_id);
    const result = await Challenge.findOne({ _id: game_id, "players.userId": user_id });
    console.log(result)
    if (result) {
        console.log(result);
        throw new Error('Already Submitted!');
    }
    else {
        return true;
    }
}

challengeSchema.statics.upateEndTime = async function (quiz_challenge_id) {
    const newExpiredDate = new Date()
    const challenge = await Challenge.findByIdAndUpdate({ "_id": quiz_challenge_id }, { "endDatetime": newExpiredDate, "isExpired": true });
    console.log("UPDATED:"+challenge)
}

// inserting users feedback with total feedback as backend feature
challengeSchema.statics.insertFeedbackInChallengeById = async function (userId, _id, feedback) {

    // fetching data from feedback
    var question_quality = feedback[0].rating;
    var overall_Experience = feedback[1].rating;
    var difficulty_Level = feedback[2].rating;

    // adding feedback to challenge using push
    const quiz_update_player = await Challenge.findOneAndUpdate(
        { _id: quiz_challenge_id }, // Use quiz_challenge_id instead of quiz_challenge_id
        {
            $push: {
                feedbacks: {
                    "userId": userId._id,
                    "parameters": {
                        "questionQuality": question_quality,
                        "overallExperience": overall_Experience,
                        "difficultyLevel": difficulty_Level
                    }
                }
            }
        },
        { new: true }
    );

    // for total ratings 
    // fetching challenge by id
    const challengeData = await Challenge.findOne({ _id });
    const totalNumberOfFeedbacks = challengeData.feedbacks.length
    totalNubmerOfQuestionQuality = 0
    totalNubmerOfOverallExperience = 0
    totalNubmerOfDifficultyLevel = 0

    // adding users data with fetched data
    totalNubmerOfQuestionQuality = challengeData.totalRatings.questionQuality + question_quality
    totalNubmerOfDifficultyLevel = challengeData.totalRatings.difficultyLevel + difficulty_Level
    totalNubmerOfOverallExperience = challengeData.totalRatings.overallExperience + overall_Experience

    // updating total feedbacks
    const updatetotalfeedbacks = await Challenge.findByIdAndUpdate(
        { "_id": _id },
        { "totalFeedbacks": totalNumberOfFeedbacks }
    );

    // updating total rating
    const updatetotalRatings = await Challenge.findByIdAndUpdate(
        { "_id": _id },
        {
            "totalRatings": {
                "questionQuality": totalNubmerOfQuestionQuality,
                "overallExperience": totalNubmerOfOverallExperience,
                "difficultyLevel": totalNubmerOfDifficultyLevel

            }
        }
    );

    return quiz_update_player
}

// function for fetching feedback with two values
challengeSchema.statics.fetchFeedbackById = async function (_id) {
    const challengeData = await Challenge.findOne(
        { _id },
        {
            "totalFeedbacks": 1,
            "totalRatings": 1
        }
    );
    return challengeData
}

const Challenge = mongoose.model('Challenge', challengeSchema);
Challenge.createIndexes();
module.exports = Challenge;