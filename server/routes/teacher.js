var express = require('express');
var router = express.Router();
var Auth = require('../controllers/authentication');
var TeacherProfile = require('../controllers/teacher/teacher_profile');

router.get('/teacher/dashboard',Auth.verifyToken, TeacherProfile.dashboard);
//route to display teacher profile
router.get('/profile', TeacherProfile.displayprofile);

//route to update teacher profile
router.put('/profile/update', TeacherProfile.updateprofile);

//route to display quizzes
router.get('/profile/myQuizzes',TeacherProfile.myQuizzes);

//route to display quiz by id
router.get('/profile/myQuizzById/:id',TeacherProfile.myQuizzById);

module.exports = router