const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  mongooseDelete = require("mongoose-delete"),
  slug = require("mongoose-slug-updater"),
  PhimSchema = new Schema(
    {
      name: String,
      slug: {
        type: String,
        slug: "name",
        unique: true,
        sparse: true,
      },
      thumb_url: String,
      poster_url: String,
      category: String,
      discription: String,
      year: Number,
      time: Number,
      like: Number,
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );

mongoose.plugin(slug);
PhimSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Phim", PhimSchema);
