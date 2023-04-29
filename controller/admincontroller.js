const AdminModel = require('.././model/adminModel');
const FoodModel = require('./../model/foodmodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const{JWT_TOKEN} = require('../keys');


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
          }

}





module.exports = AdminController;