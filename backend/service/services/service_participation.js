const QuizParticipation = require('../models/model_participation');

exports.participate = async (participantAddress,quizSmartContractAddress,quizId) => {
    const participation = await QuizParticipation.create({
        participant:participantAddress,
        quizSmartContractAddress,
        quizId
    })
    return participation
}

exports.userParticipations = async (participantAddress) => {
    const participations = await QuizParticipation.find({
        participantAddress
    })


    return participations
}

exports.userQuizParticipation = async (quizId,participantAddress) => {
    const participation = await QuizParticipation.findOne({
        quizId,
        participant:participantAddress
    })


    return participation
}

exports.addScore = async (quizId,participantAddress,amount)=>{
    const participation = await QuizParticipation.findOne({
        quizId,
        participant:participantAddress
    })
    
    await QuizParticipation.updateOne({
        participant:participantAddress,
        quizId
    },{
        correctanswers:participation.correctanswers+1,
        score: participation.score + amount
    });
}

exports.addIncorrect = async (quizId,participantAddress)=>{
    const participation = await QuizParticipation.findOne({
        quizId,
        participant:participantAddress
    })
    console.log(participation)
    await QuizParticipation.updateOne({
        participant:participantAddress,
        quizId
    },{
        incorrectAnswers:participation.incorrectAnswers+1
    });
}

exports.getBestParticipations = async (quizId,limitnumber) => {
    const participations = await QuizParticipation.find({
        quizId
    }).limit(limitnumber).sort([['score','desc']]);
    return participations
}