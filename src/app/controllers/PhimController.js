const Phim = require("../models/Phim"),
  ObjectId = require("mongoose").Types.ObjectId;

class PhimControllers {
  // GET: /phim/:slug|id
  async showPhim(req, res) {
    let arg = ObjectId.isValid(req.params.slug) ? "_id" : "slug";
    try {
      const data = await Phim.findOne({
        [arg]: req.params.slug,
      }).populate({
        path: "createdBy",
        select: "-password",
      });
      if (data)
        res.status(200).json({
          success: true,
          message: `Đã tìm thấy phim`,
          data,
        });
      else
        res.status(404).json({
          success: false,
          message: "Phim không tồn tại!",
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error!",
      });
    }
  }

  // GET: /phim
  async listPhim(req, res) {
    try {
      let data = await Phim.find().populate({
        path: "createdBy",
        select: "fullname",
      });
      res.status(200).json({
        success: true,
        message: `Tìm thấy ${data.length} phim`,
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error!",
      });
    }
  }
}

module.exports = new PhimControllers();
