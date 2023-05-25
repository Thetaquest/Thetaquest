var quizFactory = artifacts.require("quizFactory");

module.exports = function(deployer) {
  deployer.deploy(quizFactory);
};
