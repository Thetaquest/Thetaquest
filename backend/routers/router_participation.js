const express = require('express')
const router_participations = express.Router();
const service_participations = require('../service/services/service_participation')

router_participations.get('/userParticipations/:useraddress', async (req,res)=>{
    const participations = await service_participations.userParticipations(req.params.useraddress)
    return res.status(200).json({
        message: "",
        data: participations,
        error: false
    })
})

router_participations.get('/userQuizParticipation/:useraddress', async (req,res)=>{
    const participation = await service_participations.userQuizParticipation(req.params.useraddress)
    return res.status(200).json({
        message: "",
        data: participation,
        error: false
    })
})


router_participations.post('/addParticipation',async (req,res)=>{
    const {participantAddress,quizSmartContractAddress,quizId} = req.body;
    //check user dont be participating already
    const already_participating = await service_participations.userQuizParticipation(quizId,participantAddress)
    if(already_participating){
        return res.status(200).json({
            message: "user already participating",
            data: null,
            error: false
        })
    }
    //participate
    const participation = await service_participations.participate(participantAddress,quizSmartContractAddress,quizId);
    return res.status(200).json({
        message: "participation created",
        data: participation,
        error: false
    })
})

module.exports = router_participations;
