const mongoose = require("mongoose");

const connection = ()=>mongoose.connect(process.env.connectionString , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(result =>{
    console.log("the db is connected") ;
}).catch(error => {
    console.log("the db is not connected") ;
})
module.exports = connection