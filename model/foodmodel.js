const mongoose = require("mongoose");
const foodSchema = new mongoose.Schema(
  {
    name: {required:true,type:String},
    image: {type:String},
    mainIngredient: {type:String,required:true},
    price: {type:Number,required:true},
    calories:{type:Number},
    description:{required:true,type:String},
    reviews: [],
  },
  { timestamps: true }
);

const FoodModel = mongoose.model("Food", foodSchema);
module.exports = FoodModel;