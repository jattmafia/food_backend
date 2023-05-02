const AdminModel = require('.././model/adminModel');
const FoodModel = require('./../model/foodmodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const{JWT_TOKEN} = require('../keys');
const OrderModel = require('../model/ordermodel');


const AdminController = {
    signUp: async function(req,res){
        try{
            const userData = req.body;
          const foundUser = await AdminModel.findOne({email:userData.email});
            if(foundUser){
                return res.json({success:false, message: "email already registered"});
            }
            const newUser = new AdminModel(userData);
            await newUser.save();
            return res.json({success:true,data:newUser});
        }catch(e){
            console.log(e);
        return res.json({success:false,message:e});
    }
    },


    logIn:async function(req,res){
        const userData = req.body;
        const foundUser = await AdminModel.findOne({email:userData.email});
        if(!foundUser){
            return res.json({success:false, message:"No User Found"})
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
            const foundUser = await AdminModel.findOne({_id:req.user._id});
            if(!foundUser){
                return res.json({success:false,message:"no user found"});
            }
        
            return res.json({success:true,data:foundUser});
        },


        food: async function(req,res){
            const userData = req.body;
            const uploadedFile = req.file;
            let imgurl = null;
            try{
            const food = new FoodModel({
                name:userData.name,
                image:uploadedFile.filename,
                mainIngredient:userData.mainIngredient,
                price: userData.price,
                calories:userData.calories,
                description:userData.description,

            });

            await food.save();
            res.json({success:true,data:food});
        }catch(e){
                console.log(e);
            return res.json({success:false,message:e});
        }
        },

        getallfood:async function(req,res){
            FoodModel.find().then(
              allfood=>{
                  return res.json({success:true,data:allfood});
              }
            ).catch(err=>{
              return res.json({success:false,message:err});
            })
          },


          getneworder: async function(req,res){

            try{
          const foundorder= await OrderModel.find({orderStatus: "Order Placed"}).populate('user');
            
          if(!foundorder){v
            return res.json({success:false,error:"no data found"});
          }

          return res.json({success:true,data:foundorder});
        } catch(e){
            return res.json({success:false,error:e});
        }

          },

          getconfirmorder: async function(req,res){

            try{
          const foundorder= await OrderModel.find({orderStatus: "Order Confirmed"}).populate('user');
            
          if(!foundorder){v
            return res.json({success:false,error:"no data found"});
          }

          return res.json({success:true,data:foundorder});
        } catch(e){
            return res.json({success:false,error:e});
        }

          },

          getpickedorder: async function(req,res){

            try{
          const foundorder= await OrderModel.find({orderStatus: "Order Picked"}).populate('user');
            
          if(!foundorder){v
            return res.json({success:false,error:"no data found"});
          }

          return res.json({success:true,data:foundorder});
        } catch(e){
            return res.json({success:false,error:e});
        }

          },

          confirmorder: async function(req,res){
            userData = req.body;
            try{
                const foundorder = await OrderModel.findOneAndUpdate({_id: userData.id},
                    {$set:{orderStatus:"Order Confirmed"}},
                    {new:true}
                    );
               return res.json({success:true,message:"Order Confirmed Successfully"});

            }catch(e){
                return res.json({success:false,error:e});
            }
          },

          pickorder: async function(req,res){
            userData = req.body;
            try{
                const foundorder = await OrderModel.findOneAndUpdate({_id: userData.id},
                    {$set:{orderStatus:"Order Picked"}},
                    {new:true}
                    );
               return res.json({success:true,message:"Order Picked Successfully"});

            }catch(e){
                return res.json({success:false,error:e});
            }
          },



          deletefood: async function(req,res){
            userData = req.body.id;
            try{
                const foundfood =await  FoodModel.findByIdAndDelete(userData);
                if(!foundfood){
                    return res.json({success:false,error:"Something went wrong"});
                }
                return res.json({success: true,message:"Meal delete successfully"});
            }catch(e){
                console.log(e);
                return res.json({success:false,error:e});
            }
          },


          updateprice: async function(req,res){
            userData = req.body;
            try{
                const foundfood = await FoodModel.findOneAndUpdate({_id: userData.id},
                    {$set:{price : userData.price}},
                    {new:true}
                    );
               return res.json({success:true,message:"Price Updated Successfully"});

            }catch(e){
                console.log(e);
                return res.json({success:false,error:e});
            }
          }

}





module.exports = AdminController;