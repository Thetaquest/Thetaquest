const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    quizContractAdress: {
        type: String,//adress contract
        default:"0x0000000000000000000000000000000000000000"
    },
    owner:{
        type: String,//adress of wallet owner
        required: true
    },
    quizTime:{
        type:Number
    },
    entrancePriceTfuel:{
        type: Number
    },
    participantsAmount: {
        type: Number,
        default:0
    },
    hosted: {
        type: Boolean,
        default: false
    },
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        default:""
    },
    startDate:{
        type:Date,
        default: undefined

    },
    endDate:{
        type:Date,
        default: undefined
    },
    questionTimer:{
        type: Boolean,
        default: false
    },
    randomQuestionOrder:{
        type: Boolean,
        default: false
    },
    randomOptionOrder:{
        type: Boolean,
        default: false
    },
    category:{
        type:String,
        default:""
    },
    winners:[{
        winner:{
            type:String,//wallet address
            default:undefined
        },
        prizeTfuel:{
            type: Number,
            required: true
        }
    }]
    
})

// quizSchema.virtual('eventDataTrait',{
//     ref:'event',
//     localField: 'eventContractAdress', 
//     foreignField: 'contractAddress',
//     justOne: true
// })

const Quiz = mongoose.model('quiz',quizSchema);
module.exports =  Quiz;
