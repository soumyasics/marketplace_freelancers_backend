const mongoose= require("mongoose");

const schema=mongoose.Schema({

   
    firstName:{
    type:String,
    required:true
},

lastName:{
    type:Number,
    required:true
},

email:{
    type:String,
    unique:true,
    required:true,
   
    dropDups: true
},
password:{
    type:String,
    required:true
}


});
module.exports=mongoose.model('users',schema)
