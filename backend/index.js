const express = require ("express");
const connection = require("./configuration/config");
const userRoutes = require("./modules/user/routes/user.routes");
require("dotenv").config();
const cors=require("cors");


const app = express ( ) ;
connection();

app.use(express.json());
app.use(userRoutes);

app.listen(process.env.PORT , ()=>{
    console.log("the application is running on port , " , process.env.PORT) ; 
})


const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    port : 3000 ,
 }
 
 app.use(cors(corsOptions))
