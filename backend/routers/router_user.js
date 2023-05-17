const express = require('express')
const router_user = express.Router();
const user_service = require('../service/services/service_user');

router_user.get('/userdata/:walletAddr',async(req,res)=>{
    const {walletAddr} = req.params;

    const user = await user_service.userData(walletAddr);
    res.status(200).json({
        message:"",
        data: user,
        error: false
    })   
})

router_user.post('/adduser',async(req,res)=>{
    
    const {walletAddr,name,email,isteacher} = req.body;

    //check user exists
    const user = await user_service.userData(walletAddr);

    if(user){
        res.status(200).json({
            message:"user already exists",
            newuser: false,
            data: user,
            error: true
        })
    }else{
        //create user if dont exists
        const user = await user_service.userCreate(walletAddr,name,email,isteacher)
        res.status(200).json({
            message:"user created",
            newuser: true,
            data: user,
            error: false
        })    
    }
    
})




module.exports = router_user;
