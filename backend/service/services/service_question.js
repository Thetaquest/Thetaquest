const Questions = require('../models/model_questions');
const service_participation = require('./service_participation');

exports.addQuestion = async (quizId,title,time,points,correctAnswerIndex,answers) => {
    const question = await Questions.create({
        quizId,title,time,points,correctAnswerIndex,answers
    });

    return question;
};

exports.editQuestion = async (questionid,quizId,title,time,points,correctAnswerIndex,answers) => {
    const editedquestion = await Questions.updateOne({
        _id:questionid,
        quizId,
        title,
        time,
        points,
        correctAnswerIndex,
        answers
    })

    return editedquestion
};

exports.removeQuestion = async (questionId) => {
    await Questions.deleteOne({
        _id:questionId
    });
}

exports.getQuestion = async (questionid) => {
    const question = await Questions.findOne({_id:questionid});
    return question
}

exports.getQuestionsId = async (quizId) => {
    const questions = await Questions.find({
        quizId
    })
    return questions
};

exports.answerQuestion = async(questionid,answerIndex,studentAddress) => {
    const question = await Questions.findOne({
        _id:questionid
    })
    
    if(question.correctAnswerIndex==answerIndex){
        //CORRECT QUESTION
        await service_participation.addScore(question.quizId,studentAddress,question.points)
        return true
    }else{
        await service_participation.addIncorrect(question.quizId,studentAddress)
        return false
    }
};