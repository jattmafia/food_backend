const UserRoutes = require('express').Router();
const UserController = require('./../controller/user_controller');
const requirelogin = require('../middleware/requirelogin');

UserRoutes.post("/signUp",UserController.signUp);
UserRoutes.post("/login",UserController.logIn);
UserRoutes.get("/profile",requirelogin,UserController.profile);
UserRoutes.get("/getallfood",requirelogin,UserController.allfood);
UserRoutes.post("/addtocart",requirelogin,UserController.addtocart);
UserRoutes.get("/getcart",requirelogin,UserController.getcart);
UserRoutes.post("/removecart",requirelogin,UserController.removecart);
UserRoutes.post("/updatecart",requirelogin,UserController.updatecart);
UserRoutes.post("/orderplace",requirelogin,UserController.placeorder);
UserRoutes.get("/orders",requirelogin,UserController.order);

module.exports = UserRoutes;