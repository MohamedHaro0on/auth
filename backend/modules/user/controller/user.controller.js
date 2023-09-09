const { StatusCodes } = require("http-status-codes");
const User = require("../model/user.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAllUsers = async (req , res) =>{
    try {
        let {size , page} = req.params ;
        if (!size) size = 10 ;
        if (!page) page = 1  ;
        const limit = parseInt(size);
        const skip = (page - 1 ) * size ; 
        const all = await User.count() ;
        const totalPages = Math.ceil(all / limit) ;
        const users = await User.find({}).limit(limit).skip(skip).select ("-password");
        res.status(StatusCodes.OK).json({
            message : "successfull" ,
            all , 
            size , 
            totalPages,
            users , 
        })
    }
    catch (e){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message : `failed ${e}`,
        })
    }
}

const getUser = async(req , res) =>{
    try {
        let  {id} = req.params ; 
        const user = await User.findOne({_id:id}); 
        res.json({
            message : "successfull" ,
            user ,
        })
    }
    catch(e){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message : `failed ${e}`,
        })
    }
}


const updateUser = async(req , res) =>{
    
}


const addUser = async (req , res) =>{
    try {
        const {firstName , lastName  , email , password , role} = req.body ;
        const emailExists = await User.find({email}); 
        console.log(email , emailExists);

        if (emailExists.length){
            console.log("inside");
            res.status(StatusCodes.BAD_REQUEST).json({
                message : "email already exists" ,
            })
        }
        else {
            const newUser =  new User({
                firstName , 
                lastName , 
                // age , 
                email ,
                password , 
                role,
            })
            await newUser.save() ;
            res.status(StatusCodes.CREATED).json({
                message : "user created successfully" , 
                newUser ,
            })
        }

    }catch(e){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message : `error ${e}`
        })
    }
}

const signIn = async(req , res ) =>{
    try {
        const {email , password} = req.body ;
        const user = await User.findOne({email});

        if (user){
            const match = await bcrypt.compare(password , user.password) ;
            console.log(match , user.password , password) ;
            if (match){
                const token = await jwt.sign({role : user.role , id : user._id} , process.env.TOKEN_KEY , {
                    expiresIn : "2h"
                })
                res.status(StatusCodes.ACCEPTED).json({
                    message : "logged in successfully",
                    token,
                    data : {
                        firstName : user.firstName , 
                        lastName : user.lastName , 
                        age : user.age , 
                        isVerfied : user.isVerfied , 
                    }
                })
            }
            else {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message : "wrong password",
                })
            }
        }
        else {
            res.status(StatusCodes.BAD_REQUEST).json ({
                message : "email not found" ,
            })
        }
    } 
    catch(e){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message : `error : ${e}`,
        })
    }   
}

const deleteUser = async (req , res) =>{
    
}

module.exports = {
    getAllUsers , 
    getUser ,
    updateUser ,
    addUser ,
    deleteUser,
    signIn
}