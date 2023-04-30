const UserModel = require('.././model/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const{JWT_TOKEN} = require('../keys');
const requirelogin = require('../middleware/requirelogin');
const FoodModel = require('../model/foodmodel');
const CartModel = require('../model/cartmodel');
const OrderModel = require('../model/ordermodel');

const UserController = {
signUp: async function(req,res){
    try{
        const userData = req.body;
      const foundUser = await UserModel.findOne({email:userData.email});
        if(foundUser){
            return res.json({success:false, message: "email already registered"});
        }
        const newUser = new UserModel(userData);
        await newUser.save();
        return res.json({success:true,data:newUser});
    }catch(e){
        console.log(e);
    return res.json({success:false,message:e});
}
},

logIn:async function(req,res){
const userData = req.body;
const foundUser = await UserModel.findOne({email:userData.email});
if(!foundUser){
    return res.json({success:false, error:"No User Found"})
}
const correctPassword = await bcrypt.compare(userData.password,foundUser.password);
if(!correctPassword){
 return   res.json({success:false, error: "Incorrect password"});
   
}

const token = jwt.sign({_id:foundUser._id},JWT_TOKEN);

return res.json({success : true, token: token,data: foundUser});



},


profile: async function(req,res){
    console.log(req.user._id);
    const foundUser = await UserModel.findOne({_id:req.user._id});
    if(!foundUser){
        return res.json({success:false,message:"no user found"});
    }

    return res.json({success:true,data:foundUser});
},


allfood:async function(req,res){
  FoodModel.find().then(
    allfood=>{
        return res.json({success:true,data:allfood});
    }
  ).catch(err=>{
    return res.json({success:false,message:err});
  })
},


addtocart:async function(req,res){
  const userData = req.body;
  try {
    const cart = await CartModel.findOne({ user: req.user._id });
    if(!cart){
      foundCart = new CartModel({user:req.user._id,items:[]});
  
      await foundCart.save();
    }
    const itemIndex = cart.items.findIndex(item => item.product == userData.productid);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += userData.quantity;
    } else {
      cart.items.push({ product: userData.productid, quantity:userData.quantity });
    }
    await cart.save();
    res.json({success:true, message:"Item added successfully",data:cart});
  } catch (error) {
    console.log(error);
   return res.json({success:false,message:err});
  }
 
},

getcart:async function(req,res){
  const foundCart = await CartModel.findOne({user:req.user._id}).populate('items.product');
  try{
  if(!foundCart){
    foundcart = new CartModel({user:req.user._id,items:[]});
  
      await foundcart.save();
      return res.json({success:true,data:foundcart});
  }
   
  return res.json({success:true,data:foundCart});
}catch(e){
  console.log(e);
  return res.json({success:false,message:e});
}
},

removecart:async function(req,res){
  userData = req.body;
  try{

    const foundCart = await CartModel.findOneAndUpdate(
      {user:req.user._id},
      {$pull:{items:{product:userData.productid}}},
      {new:true}
      
      ).populate('items.product');

      return res.json({success:true,message:"product removed successfully",data:foundCart},);

  }catch(e){
    return res.json({success:false,message:e})
  }
},

updatecart: async function (req,res){
  const userData = req.body;

  const cart = await CartModel.findOneAndUpdate(
    { user: req.user._id, 'items.product': userData.productid },
    { $set: { 'items.$.quantity': userData.quantity } },
    { new: true }
  ).populate("items.product");

   return res.json({success:true,message:"item updated successfully",data:cart});
},



placeorder: async function(req,res){
  const userData = req.body;
   const userid = req.user._id
   try{
  const ordermodel = new OrderModel({
    user : req.user._id,
    orders: userData.item,
    cookingInstruction:UserData.cookingInstruction,
    pickupTime:userData.pickupTime,
    totalPrice: userData.totalprice
  }
  );
  await ordermodel.save();
  // try{
  //   const cart = await CartModel.findOneAndUpdate({user:req.user._id},
  //     {$set:{items:[]}},
  //     {new:true}
  //     );
  // } catch(e){
  //   return res.json({success:false,msg:"something went wrong"});
  // }
  return res.json({success:true,message:"Order Placed Successfully",data:ordermodel});
   } catch(e){
   return res.json({success: false , message: e});
   }

},

order: async function(req,res){
    
  
   try{
    const foundorder =await OrderModel.find({user:req.user._id}).populate('orders');
   if(!foundorder){
    return res.json({success:false,msg:"No order found"});
   } else{
   
    return res.json({success:true,data:foundorder});
   }
  }catch(e){
    return res.json({success:false,msg:e});
  }
}


}





module.exports = UserController;