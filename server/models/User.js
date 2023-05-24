var mongoose = require( 'mongoose' );
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Challenge = require('./Challenge');

var userSchema = new mongoose.Schema({
  schema_version: {
    type: Number,
    default: 1.0
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  walletAddress: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value !== 'student' && value !== 'teacher') {
        throw new Error('Role must be either "student" or "teacher"');
      }
    }
  },
  challenges: [],
  played_challenges: []
});

userSchema.statics.findByCredentials = async function (walletAddress) {
  const user = await User.findOne({ walletAddress });
  if (!user) {
    throw new Error('User does not exist, please Sign up first');
  }
  return user;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET" ); 
};


const User = mongoose.model('User', userSchema);
User.createIndexes();
module.exports = User;