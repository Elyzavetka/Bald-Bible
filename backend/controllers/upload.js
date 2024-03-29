const Image = require("../models/image");
const cloudinary = require("../cloudinary/cloudinary");

const ImageController = {
  Upload: async (req, res) => {
    const { image, username, userId } = req.body;
    try {
      const uploadedImage = await cloudinary.uploader.upload(image, {
        upload_preset: "unsigned_upload",
        allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfig", "webp"],
      });
      console.log(uploadedImage);
      const imageUrl = uploadedImage.secure_url;
      const dateAdded = uploadedImage.created_at;

      // Create a new instance of the Image model
      const newImage = new Image({
        userId: userId,
        username: username,
        imageUrl: imageUrl,
        dateAdded: dateAdded 
      });

      // Save the newImage to the database
      await newImage.save();

      res.status(201).json({ message: "Image saved successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = ImageController;

