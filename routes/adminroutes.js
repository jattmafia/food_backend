const AdminRoutes = require('express').Router();
const AdminController = require('./../controller/admincontroller');
const requirelogin = require('../middleware/requireadminlogin');
const imageupload = require('../middleware/foodimage_upload');


 AdminRoutes.post("/signUp",AdminController.signUp);
 AdminRoutes.post("/logIn",AdminController.logIn);
 AdminRoutes.get("/profile",requirelogin,AdminController.profile);
 AdminRoutes.post("/postfood",requirelogin,imageupload.single('image'),AdminController.food);
 AdminRoutes.get("/getallfood",requirelogin,AdminController.getallfood);

module.exports = AdminRoutes;