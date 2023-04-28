var express = require('express');
var router = express.Router();
var Auth = require('../controllers/authentication');
// linking createquiz file
var createQuiz = require('../controllers/quiz/createQuiz');
var deleteQuiz = require('../controllers/quiz/deleteQuiz');
var modifyQuiz = require('../controllers/quiz/modifyQuiz');

// calling "createquiz" function of createQuiz.js file
router.post('/createquiz', createQuiz.createquiz);
router.post('/deletequiz', deleteQuiz.deletequiz);
router.post('/modifyquiz', modifyQuiz.modifyquiz);

module.exports = router
