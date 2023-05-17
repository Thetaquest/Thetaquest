const express = require('express')
const router_questions = express.Router();
const service_questions = require('../service/services/service_question');
const QuizAnswers = require('../service/models/models_answers');

router_questions.get('/question/:questionid',async (req,res)=>{
    const question = await service_questions.getQuestion(req.params.questionid);
    return res.status(200).json({
        message: "",
        data: question,
        error: false
    })
});

router_questions.get('/quizquestions/:quizid',async (req,res)=>{
    const questions = await service_questions.getQuestionsId(req.params.quizid);
    return res.status(200).json({
        message: "",
        data: questions,
        error: false
    })
});

router_questions.post('/new',async (req,res)=>{
    const {quizId,title,time,points,correctAnswerIndex,answers} =  req.body;
    const newquestion = await service_questions.addQuestion(quizId,title,time,points,correctAnswerIndex,answers);
    return res.status(200).json({
        message: "new question created",
        data: newquestion,
        error: false
    })
})

router_questions.post('/update',async (req,res)=>{
    const {questionid,quizId,title,time,points,correctAnswerIndex,answers} = req.body;
    await service_questions.editQuestion(questionid,quizId,title,time,points,correctAnswerIndex,answers);
    res.status(200).json({
        message: "updated",
        data: null,
        error: false
    })
})

router_questions.post('/answer',async (req,res)=>{
    const {questionid,answerIndex,studentAddress} = req.body;
    const answer = await QuizAnswers.find({
        student:studentAddress,
        questionId:questionid
    })
    if(answer.length>0){
        return res.status(200).json({
            message: "question already answered",
            data: null,
            error: true
        })  
    }
    const data = await service_questions.answerQuestion(questionid,answerIndex,studentAddress);
    await QuizAnswers.create({
        student:studentAddress,
        questionId:questionid
    })
    if(data===true){
        res.status(200).json({
            message: "answer correct!",
            data: data,
            error: false
        })    
    }else{
        res.status(200).json({
            message: "answer incorrect",
            data: data,
            error: false
        })    
    }
    
})

router_questions.post('/remove',async (req,res)=>{
    const {questionId} = req.body;
    await service_questions.removeQuestion(questionId);
    res.status(200).json({
        message: "deleted succefully",
        data: null,
        error: false
    })
})




module.exports = router_questions;
