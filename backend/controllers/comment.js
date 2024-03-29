const User = require('../models/user');
const Comment = require('../models/comment');
const Image = require('../models/image');

exports.getAllComments = async (req, res, next) => {
  try {
    const imageId = req.params.id;

    // check if the image exists
    const image = await Image.findById(imageId).populate("comments");

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // retrieve all comments for the image
    const comments = image.comments;

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.addComment = async (req, res, next) => {
  try {
    
    const { content } = req.body;
    const imageId = req.params.id; 
    console.log( req.body)
    // Check if the image exists
    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    const comment = new Comment({
      // create a new User object, using the User model
      content: req.body.content,
      
      userId: req.body.userId,

      imageId: req.params.id

    });
    
    const saveComment = await comment.save();
    console.log(saveComment)
    image.comments.push(saveComment._id);
    await image.save();
    
    res.status(201).json({ message: "Comment added successfully!" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const imageId = req.params.id;
    const commentId = req.params.commentId;

    // Check if the image exists
    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Find the comment by its ID
    const commentIndex = image.comments.findIndex(comment => comment._id.toString() === commentId);
    if (commentIndex === -1) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Remove the comment from the array
    image.comments.splice(commentIndex, 1);

    // Save the updated image
    await image.save();

    res.status(200).json({ message: "Comment deleted successfully!" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

