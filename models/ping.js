var mongoose=require("mongoose");


var pingSchema=new mongoose.Schema({
   ping:String
  
    
 });

 module.exports=mongoose.model("ping",pingSchema);