const express = require("express");
const router = express.Router();
const cloudinary = require("../cloudinary/cloudinary");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const ImageController = require("../controllers/image");
const UploadController = require("../controllers/upload");

const CommentController = require("../controllers/comment");

router.post("/upload", UploadController.Upload);

router.get("/", ImageController.getAllImage);

router.post("/", auth, multer, ImageController.createImage);

router.get("/:id", auth, ImageController.getOneImage);

router.put("/:id", auth, multer, ImageController.modifyImage);

router.delete("/:id", auth, ImageController.deleteImage);

router.put("/:id/likes", ImageController.AddOrRemoveUserIDFromImageLikesArray);

router.get("/:id/likes", ImageController.GetLikes);

router.post("/:id/comments", auth, CommentController.addComment);

router.get("/:id/comments", auth, CommentController.getAllComments);

router.delete(
  "/:id/comments/:commentId",
  auth,
  CommentController.deleteComment
);

module.exports = router;
