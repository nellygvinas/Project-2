const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: {type: String, required: true},
  children: {type: Schema.Types.ObjectId, ref: 'Child'},
})

const User = mongoose.model('User', userSchema)


module.exports = User;