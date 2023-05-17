const express = require('express')
const router_quiz = express.Router();
const service_quiz = require('../service/services/service_quiz');
const service_user = require('../service/services/service_user');
const service_participation = require('../service/services/service_participation')

router_quiz.get('/quizdata/address/:address',async (req,res)=>{
    const quiz = await service_quiz.getQuizDataAddress(req.params.address)
    res.status(200).json({
        message: "",
        data: quiz,
        error: false
    })
})
router_quiz.get('/quizdata/id/:id',async (req,res)=>{
    const quiz = await service_quiz.getQuizDataId(req.params.id);
    res.status(200).json({
        message: "",
        data: quiz,
        error: false
    })
})

router_quiz.get('/teacher/address/:address',async (req,res)=>{
    const quiz = await service_quiz.getTeacherHostedQuizAddress(req.params.address)
    res.status(200).json({
        message: "",
        data: quiz,
        error: false
    })
})
router_quiz.get('/teacher/name/:name',async (req,res)=>{
    const quiz = await service_quiz.getTeacherHostedQuizName(req.params.name);
    res.status(200).json({
        message: "",
        data: quiz,
        error: false
    })
})

router_quiz.post('/createQuiz', async (req, res) => {
    const { teacher, title, description, category } = req.body;
    //check teacher profile exists and is teacher
    const teacherprofile = await service_user.userData(teacher);
    if (!teacherprofile || teacherprofile.isteacher === false) {
        res.status(200).json({
            message: "user not authorized to create quiz",
            data: null,
            error: true
        })
    }
    //create quiz 
    const created_quiz = await service_quiz.createQuiz(teacher, title, description, category)

    res.status(200).json({
        message: "created_quiz",
        data: created_quiz,
        error: false
    })
})

router_quiz.post('/hostQuiz', async (req, res) => {
    const { quizId,
        quizContractAdress,
        quizTime,
        entrancePriceTfuel,
        startDate,
        endDate,
        questionTimer,
        randomQuestionOrder,
        randomOptionOrder,
        name,
        description,
        prizes
    } = req.body;

    //check quiz not hosted already
    const quiz_data = await service_quiz.getQuizDataId(quizId);
    if (quiz_data.hosted === true) {
        return res.status(200).json({
            message: "quiz already hosted",
            data: null,
            error: true
        })
    } else {
        if(prizes.length<3){
            res.status(200).json({
                message: "not enough prizes, minium 3",
                data: null,
                error: true
            })
        }
        //host quiz
        const newquiz = await service_quiz.hostQuiz(quizId,
            quizContractAdress,
            quizTime,
            entrancePriceTfuel,
            startDate,
            endDate,
            questionTimer,
            randomQuestionOrder,
            randomOptionOrder,
            name,
            description,
            prizes
        )
        res.status(200).json({
            message: "quiz hosted",
            data: null,
            error: false
        })
    }

})
router_quiz.post('/setwinners',async (req,res)=>{
    const {quizAddress,quizTeacherAddr} = req.body;
    const winners = await service_quiz.quizChooseWinners(quizAddress,quizTeacherAddr);
    res.status(200).json({
        message: "winners have been selected",
        data: winners,
        error: false
    })
})



module.exports = router_quiz;
