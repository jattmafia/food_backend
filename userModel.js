const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
    {
        name: String,
        email: String,
        cartItems:["Mixed"],
        favoriteItems:["Mixed"],
    },
    { timestamps: true }
);
const UserModel = mongoose.model("UserData", Schema);
module.exports = UserModel;