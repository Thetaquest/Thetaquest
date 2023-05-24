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
  
  userSchema.statics.findByCredentials = async function (email) {
    const user = await User.findOne({ email });
    // ...
  
    return user;
  };
  
  const User = mongoose.model('User', userSchema);
  // ...
  
  module.exports = User;