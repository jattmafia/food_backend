const jwt = require('jsonwebtoken');
const{JWT_TOKEN} = require('../keys');
const mongoose = require('mongoose');
const adminmodel = require('../model/adminModel');


module.exports = (req,res,next)=>{
    console.log("start");
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({error: "you are not logged in"});
    }

    const token = authorization.replace("Bearer ","");

    jwt.verify(token,JWT_TOKEN,(err,payload)=>{
        if(err){
            return res.status(401).json({error: "you are not logged in"});
        }
        const{_id} = payload;
        adminmodel.findById(_id).then(userdata=>{
            req.user = userdata;
            next();
        });
       
    })

}