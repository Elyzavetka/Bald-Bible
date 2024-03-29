const mongoose = require("mongoose"); 

const photoSchema = mongoose.Schema({
  // description: { type: String, required: true }, // define a description property, which is a required string
  imageUrl: { type: String }, 
  userId: { type: String }, 
  username: { type: String },
  dateAdded: { type: String },
  likedByUser: { type: [String], default: [] },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = mongoose.model("Images", photoSchema); 
