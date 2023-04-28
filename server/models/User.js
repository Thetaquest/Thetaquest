var mongoose = require( 'mongoose' );
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Challenge = require('./Challenge');

var userSchema = new mongoose.Schema({
  schema_version : {
    type: Number,
    default : 1.0
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  username : {
    type: String,
    required: true
  },
  password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('asdh')) {
                throw new Error('Password cannot contain "asdh"')
            }
        }
    },
    role: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
          if (value != "student" && value != "teacher") {
              throw new Error('Role must be either "student" or "teacher"');
          }
       }
    },
    challenges: [],
    played_challenges: []
});

userSchema.pre('save',async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})



userSchema.statics.findByCredentials =async function(email, password) {
  const user = await User.findOne({ email });
  // console.log(user.schema);
  if (!user) {
    throw new Error('User does not exist, please Sign up first');
  }
  //console.log(user.password);
   const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Email or Password incorrect!')
    }

  return user
}

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