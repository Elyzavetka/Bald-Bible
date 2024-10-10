const mongoose = require("mongoose");

const photoSchema = mongoose.Schema({
  imageUrl: { type: String },
  userId: { type: String },
  username: { type: String },
  dateAdded: { type: String },
  likedByUser: { type: [String], default: [] },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Images", photoSchema);
