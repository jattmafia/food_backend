const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const RecipeModel = require("./recipeModel");
const UserModel = require("./userModel");


app.use(express.static('foodimages'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", function(req,res){
  res.send(`Node setup  ${PORT}`);
  });

  mongoose.set('strictQuery',false);
  mongoose.connect("mongodb+srv://food_app:foodapp@cluster0.otpxp0r.mongodb.net/?retryWrites=true&w=majority",
  ).then(function(){
       app.listen(PORT, function() {
      {}
      console.log(`App started at : ${PORT}`);
   });
      
      
      app.get("/", function(req,res){
     res.send(`Node setup  ${PORT}`);
     });

     const UserRoutes = require('./routes/user_routes');
app.use("/api/user",UserRoutes);

const AdminRoutes = require('./routes/adminroutes');
app.use("/api/admin",AdminRoutes);
   
    });



// app.post("/api/uploadRecipe", async (req, res) => {
//   try {
//     // for (let i = 0; i < arr.length; i++) {
//     //     console.log(arr[i].imageUrl);
//     // const Recipe = await RecipeModel.create(arr[i]);
//     // }
//     const img = {
//       //   "Chicken Curry":
//       //     "https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEOStyo_7nu2gReuqPfmd3ybKAvOw32IqRCrg_wpZYbUl8j2Q7LWxNDzaAy95sefaV0bU9wF_7e86Pso0APaQxPOWPuYHiw=w1920-h892",
//       //   "Fish Curry":
//       //     "https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEOSbw4hL_gnxJMZSV3-0DlRlhMOfPUWb0z1knQ9sbIaAz76GJHnBVcy_BtDeJjFhG-w0vVps5FnHhYicTrSbNj2qRuJ4=w958-h880",
//       //   "Butter Chicken":
//       //     "https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEOStAhsnYTFPsDf-oQ81SvgP5HBtStIxtUBSXTnTrXTYpJEq76Q39U7t5jbmpnnqpVedZ202Y5rB_n5ApH_SViV7jNH-nA=w958-h880",
//       "Mutton Curry":
//         "https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEOTYyoqXk_IHjB-KqTm6Dgp68TA__l_V4xz_9dCLnp706G7o2a-blGfS9dNmq2cOjCBlfjlwCpjW2uSdyEbzLanak7n5hQ=w958-h880",
//       //   "Gongura Chicken":
//       //     "https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEOQEVRCvmMfehO932xkxZCgA_r0c2Rjc9-LOV23aQhed58zRDZ2fJHBnil8VrNi2TxxHvcP-eaQyNJl4RDzO6EezIDxJlw=w958-h880",
//       //   "Special Dry Chicken":
//       //     "https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEOR7B5uzmNe8TL66neULupE3Wn-K1uqwZfVv2AI1u3iws7Eu5udoVrPQyOqbSCEpFLfCPXKU7SQveY5RQc-zlh72u1pD=w958-h880",
//       //   "Pepper Chicken":
//       //     "https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEOTJbXc9olXV-9TXxuE3oT10MQbaak0xzelAZdqYFm_WeM7rAfTWW9zyXi2XSP6RVWHZ3j0JjZHj2bE4VpaP0ItGSFxCLA=w958-h880",
//       //   "Mughalai Mutton Gravy":
//       //     "https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEOTcT_qgW1MWyMH2ljz_K91GL7IngXCXclHM7iOn5P62XDs1rB7KIm-MuPl_u_PdmVSGcY2yeklKmvnhpdEc5cjHI2c4HQ=w958-h880",
//       //   "Hyderabadi Chicken Gravy":
//       //     "https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEORcXfFFYMjq2WGNk5ZJotrjAoo24BSF_Qw8bowgbWnisln22_hV17xsHYfi7v-ajF4SWkqYP0Kc0EC-1LRDQdMPo_LOLg=w958-h880",
//       //   "Malabar Chicken Curry":
//       //     "https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEOQ0Zdp1CkbANn2yzdDjxMxlvuIbz32xHS3fZaQp8PodvdAVtNx7l6GzWK1s0Zv1U8ZlYMZ22lJjaH-dfQr_IfUrZB_pMw=w958-h880",
//       //   "Chilli Chicken":
//       //     "https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEOSCjxwhaEbZekqkh5KQPteGkJkSjNf4HeHiEVUsv8MIJp0O4t7Ik_NHSfsERfpkpaVK_PiJ2yV6ZzHbkU7HLfxMMjtf5A=w958-h880",
//       //   "Kashmir Chicken Gravy":
//       // "https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEOSNJHuVufNXpqPisToQ4486TmVXMClS1jA3pJbc9wxdU787IFuou1jdAq0sT0LRGDBzwTDYBJjom4FBsUk98tUjN0Vjuw=w958-h880",
//     };
//     const Recipe = await RecipeModel.create(req.body);
//     console.log(Recipe);
//     // var c=0;
//     // for(let key of Object.keys(img)){
//     //     const result = await RecipeModel.findOneAndUpdate(
//     //       { name: key },
//     //       { imageUrl: img[key] },
//     //       { new: true, upsert: true,runValidators: true ,findAndModify: false }
//     //     );
//     //     console.log(key,c++);
//     // }
//     return res.status(200).json({ message: "Recipe uploaded successfully" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Error uploading recipe" });
//   }
// });

// app.put("/api/addReview", async (req, res) => {
//   try {
//     const { recipe, review } = req.body;
//     const post = await RecipeMzsodel.findOneAndUpdate(
//       { name: recipe },
//       { $push: { reviews: review } }
//     );
//     console.log(post);
//     return res.status(200).json({ message: "Review added successfully" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Error adding review" });
//   }
// });

// app.post("/api/addUser", async (req, res) => {
//   try {
//     const { name, email } = req.body;
//     const user = await UserModel.create({ name, email });
//     console.log(user);
//     return res.status(200).json({ message: "User added successfully" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Error adding user" });
//   }
// });

// app.get("/api/allRecipes", async (req, res) => {
//   try {
//     const recipes = await RecipeModel.find();
//     console.log(recipes);
//     return res.status(200).json(recipes);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Error adding user" });
//   }
// });

// app.post("/api/addToCart", async (req, res) => {
//   try {
//     const { recipe, email, quantity } = req.body;
//     const post = await UserModel.findOne(
//       { email: email },
//     );
//     console.log(recipe,quantity);
//     var cartitems = post.cartItems;
//     for(let cart of cartitems){
//         if(cart[0]===recipe){
//             cart[1]=quantity;
//             await UserModel.findOneAndUpdate(
//               { email: email },
//               { $set: { cartItems: cartitems } },
//               { new: true, upsert: true, runValidators: true, findAndModify: false }
//             )
//             return res.status(200).json({ message: "Updated to cart successfully" });
//         }
//     }
//     const user = await UserModel.findOneAndUpdate(
//       { email: email },
//       { $push: { cartItems: [recipe, quantity] } },
//       { new: true, upsert: true, runValidators: true, findAndModify: false }
//     );
//     return res.status(200).json({ message: "Added to cart successfully" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: err.message });
//   }
// });

// app.post("/api/addToFavorite", async (req, res) => {
//   try {
//     const { recipe, email } = req.body;
//     const post = await UserModel.findOneAndUpdate(
//       { email: email },
//       { $push: { favoriteItems: recipe } },
//       { new: true, upsert: true, runValidators: true, findAndModify: false }
//     );
//     console.log(post);
//     return res.status(200).json({ message: "Added to favorites successfully" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Error adding to favorites" });
//   }
// });

// app.get("/api/getCartItems/:email", async (req, res) => {
//   try {
//     const email = req.params.email;
//     const user = await UserModel.findOne({ email: email });
//     const cartItems = user.cartItems;
//     const arr = [];
//     for (let i = 0; i < cartItems.length; i++) {
//       var recipe = await RecipeModel.findOne({ name: cartItems[i][0] });
//       var x = {};
//       x["name"]=recipe.name;
//       x["imageUrl"]=recipe.imageUrl;
//       x["price"]=recipe.price;
//       x["description"]=recipe.description;
//       x["rating"] = recipe.rating;
//       x["mainIngredient"] = recipe.mainIngredient;
//       x["calories"] = recipe.calories;
//       x["quantity"]=cartItems[i][1];
//       arr.push(x);
//     }
//     return res.status(200).json(arr);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: err.message });
//   }
// });

// app.get("/api/getFavoriteItems/:email", async (req, res) => {
//   try {
//     const email = req.params.email;
//     const user = await UserModel.findOne({ email: email });
//     const favoriteItems = user.favoriteItems;
//     const arr = [];
//     for (let i = 0; i < favoriteItems.length; i++) {
//       var recipe = await RecipeModel.findOne({ name: favoriteItems[i] });
//       var x = {};
//       x["name"]=recipe.name;
//       x["imageUrl"]=recipe.imageUrl;
//       x["price"]=recipe.price;
//       x["description"]=recipe.description;
//       x["rating"] = recipe.rating;
//       x["mainIngredient"] = recipe.mainIngredient;
//       x["calories"] = recipe.calories;
//       arr.push(x);
//     }
//     return res.status(200).json(arr);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: err.message });
//   }
// })


 