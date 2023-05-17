const User = require("../models/model_user")


exports.userData = async (walletAddr) =>{
    const user = await User.findOne({walletAddress:walletAddr});  
    
    return user;
}

exports.userCreate = async (userAddr,name,email,isteacher) => {
    const new_user = await User.create({
        walletAddress: userAddr,
        name,
        email,
        isteacher
    })

    return new_user
}