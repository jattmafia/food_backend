const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    name: String,
    imageUrl: String,
    rating: Number,
    mainIngredient: String,
    price: Number,
    calories: Number,
    description: String,
    reviews: [String],
  },
  { timestamps: true }
);

const RecipeModel = mongoose.model("Recipe", Schema);
module.exports = RecipeModel;