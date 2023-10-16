const mongoose = require("mongoose");

mongoose.connect( process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>{
    console.log("Successfully login........ ")
}).catch((error)=>{
    console.log(error);
})

const portfolioschema = mongoose.Schema({
    Name    : String,
    Email   : String,
    Number  : Number,
    Text    : String,
    Message : String
}); 

const Portfoliomodel = mongoose.model("PortFolio-foam",portfolioschema) ;
module.exports = Portfoliomodel;

//process.env.MONGODB_URI