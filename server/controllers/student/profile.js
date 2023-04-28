const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const User = require('../../models/User')


module.exports.dashboard =  (req, res) => {
    res.send("list of quizzes");
};