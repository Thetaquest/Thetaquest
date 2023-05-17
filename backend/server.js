const express = require('express');
const mongoose = require('mongoose');
const routerquiz = require('./routers/router_quiz');
const routeruser = require('./routers/router_user');
const routerquestions = require('./routers/router_questions');
const routerparticipations = require('./routers/router_participation');
const dotenv = require('dotenv').config()
const http = require("http");

mongoose.connect(process.env.MONGODB_URI2).then(res=>{
    console.log('database connected')
});


const app = express();

const PORT = 3000;
//create the req.body 
app.use(express.json());

app.use('/api/quiz',routerquiz);
app.use('/api/user',routeruser);
app.use('/api/questions',routerquestions);
app.use('/api/participations',routerparticipations)

app.all("*",(req,res,next)=>{
    return res.status(200).json({
        message: 'this route dont exists , please try again'
    });
})

app.listen(PORT, (error) =>{
    if(!error){
        console.log("server is successfully running, and App is listening on port "+ PORT)
    }else{
        console.log("Error occurred, server can't start", error);
    }
    }
);