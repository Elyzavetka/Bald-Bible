const Image = require("../models/image"); 
const fs = require("fs"); 

exports.createImage = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host"); 
  req.body.image = JSON.parse(req.body.image); 
  const image = new Image({
    ImageUrl: url + "/Images/" + req.file.filename, 
    userId: req.body.image.userId, 
  }); 
  image
    .save() 
    .then(() => res.status(201).json({ message: "Image saved successfully!" })) 
    .catch((error) => res.status(400).json({ error: error })); 
};

exports.getOneImage = (req, res, next) => {
  Image.findOne({ _id: req.params.id })
    .then((image) => res.status(200).json(image)) 
    .catch((error) => res.status(404).json({ error: error })); 
};

exports.getAllImage = (req, res) => {
  Image.find({})
    .then((image) => res.status(200).json(image))
    .catch((error) => res.status(404).json({ error: error }));
};

exports.modifyImage = (req, res, next) => {
  let image = new Image({ _id: req.params._id }); 
  if (req.file) {
    const url = req.protocol + "://" + req.get("host"); 
    req.body.image = JSON.parse(req.body.image); 
    image = {
      _id: req.params.id, 
      ImageUrl: url + "/Images/" + req.file.filename, 
      userId: req.body.image.userId, 
    }; 
  } else {
    image = {
      _id: req.params.id, 
      ImageUrl: req.body.ImageUrl, 
      userId: req.body.userId, 
    }; 
  } 
  Image.updateOne({ _id: req.params.id }, image) 
    .then(() =>
      res.status(201).json({ message: "Image updated successfully!" }),
    ) 
    .catch((error) => res.status(400).json({ error: error })); 
};

exports.deleteImage = (req, res, next) => {
  Image.findOne({ _id: req.params.id }) 
    .then((image) => {
      if (!image) {
        return res.status(404).json({ error: "Image not found!" }); 
      } 
      if (image.userId !== req.auth.userId) {
        return res.status(401).json({ error: "Unauthorized request!" }); 
      } 
      const filename = image.ImageUrl.split("/Images/")[1]; 
      fs.unlink("Images/" + filename, () => {
        Image.deleteOne({ _id: req.params.id }) 
          .then(() => res.status(200).json({ message: "Deleted!" })) 
          .catch((error) =>
            res.status(400).json({
              error: error,
            }),
          ); 
      }); 
    });
};

exports.getAllStuff = (req, res) => {
  Image.find() 
    .then((images) => res.status(200).json(images)) 
    .catch((error) => res.status(400).json({ error: error })); 
};

exports.AddOrRemoveUserIDFromImageLikesArray = async (req, res) => {
  const imageId = req.params.id;
  const userId = req.body.userId;

  try {
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    const likedByUserIndex = image.likedByUser.indexOf(userId);
    console.log(imageId, userId);
    if (likedByUserIndex === -1) {
      image.likedByUser.push(userId);
    } else {
      image.likedByUser.splice(likedByUserIndex, 1);
    }
    const updatedImage = await image.save();
    const message =
      likedByUserIndex === -1
        ? "Like added successfully"
        : "Like removed successfully";

    res.status(201).json({ message, updatedImage });
  } catch (err) {
    console.error("Error updating likedByUser:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.GetLikes = async (req, res) => {
  try {
    const imageId = req.params.id;
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    const likes = image.likedByUser.length;

    res.status(200).json({ likes });
  } catch (err) {
    console.error("Error retrieving image likes:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
