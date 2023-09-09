const Schema = require ("mongoose").Schema;
const bcrypt = require("bcrypt");

const UserSchema =  new Schema({
    firstName : {
        type : String,
    },
    lastName : {
        type : String,
    },
    // age : {
    //     type : Number
    // },
    isVerfied : {
        type : Boolean , default : false
    },
    email : {
        type : String ,
    },
    password : {
        type : String , 
    },
    role : {
        type : String ,
    }
    // image : {
    //     type : String ,
    // }
})

UserSchema.pre("save" , async function (next){
    this.password = await bcrypt.hash(this.password , 8) ;
    next();
})

module.exports = UserSchema ;