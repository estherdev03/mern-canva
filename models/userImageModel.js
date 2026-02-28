const { model, Schema } = require("mongoose");

const userImageSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    image_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = model("user_images", userImageSchema);
