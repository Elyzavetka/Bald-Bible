const cloudinary = require("cloudinary").v2;
const config = require("../config");

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_KEY,
  api_secret: config.CLOUD_SECRET,
  secure: true,
});

module.exports = cloudinary;
