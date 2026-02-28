const { formidable } = require("formidable");
const cloudinary = require("cloudinary").v2;
const Design = require("../models/designModel");

class DesignController {
  createDesign = async (req, res) => {
    const form = formidable({});
    const { _id } = req.userInfo;
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
      });
      const [fields, files] = await form.parse(req);
      const { image } = files;
      const { url } = await cloudinary.uploader.upload(image[0].filepath);
      const design = await Design.create({
        user_id: _id,
        components: [JSON.parse(fields.design[0])],
        image_url: url,
      });
      return res.status(200).json({ design });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new DesignController();
