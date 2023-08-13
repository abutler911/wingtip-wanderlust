const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  country: { type: String, required: true },
  travelDate: { type: Date },
  highlights: [String],
  rating: { type: Number, min: 1, max: 5 },
  budget: { type: String },
  activities: [String],
  accommodations: { type: String },
  images: {
    type: [String],
    validate: [arrayLimit, "Exceeds the limit of 10 images"],
  },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

function arrayLimit(val) {
  return val.length <= 10;
}

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;
