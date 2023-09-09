const { getAllUsers, getUser, updateUser, addUser, deleteUser , signIn} = require("../controller/user.controller");
const vlidateRequest = require("../../../shared/validateRequest");
const { addUserSchema , signInSchema } = require("../joi/user.validation");
const validateRequest = require("../../../shared/validateRequest");
const route = require("express").Router();



route.get("/users" , getAllUsers);
route.get("/user/:id" , getUser) ;
route.put("/update-user" , updateUser);
route.post("/add-user" , vlidateRequest (addUserSchema) , addUser);
route.delete("/delete-user" , deleteUser);
route.post("/sign-in" , validateRequest(signInSchema)  ,signIn);

module.exports = route ; 