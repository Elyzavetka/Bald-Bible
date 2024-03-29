const mongoose = require("mongoose"); 
const uniqueValidator = require("mongoose-unique-validator"); 

const userSchema = mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: false, unique: true },
});

userSchema.plugin(uniqueValidator); 

module.exports = mongoose.model("User", userSchema); 
