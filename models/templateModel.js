const { model, Schema } = require("mongoose");

const templateSchema = new Schema(
  {
    components: {
      type: Array,
      default: [],
    },
    image_url: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = model("templates", templateSchema);
