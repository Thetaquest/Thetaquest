var express = require('express');
var router = express.Router();
var Auth = require('../controllers/authentication');
var CreateChallengeCtrl = require('../controllers/challenge/createChallenge');
var SubmitChallengeCtrl = require('../controllers/challenge/submitChallenge');
var joinChallengeCtrl = require('../controllers/challenge/joinChallenge');
var EndChallengeCtrl = require('../controllers/challenge/endChallenge');

var InsertFeedback = require('../controllers/feedback/insertFeedback');
var FetchFeedback = require('../controllers/feedback/fetchingFeedback');


router.post('/createChallenge/:id', CreateChallengeCtrl.createChallenge);
router.post('/joinChallenge', joinChallengeCtrl.joinChallenge);
router.post('/playChallenge', joinChallengeCtrl.playChallenge);
router.post('/submitChallenge/:id', SubmitChallengeCtrl.submitChallenge);
router.post('/endChallenge/:id',EndChallengeCtrl.endChallenge);

router.post('/insertFeedback/:id', InsertFeedback.insertFeedback);
router.post('/fetchFeedback/:id', FetchFeedback.fetchingfeedback);

module.exports = router