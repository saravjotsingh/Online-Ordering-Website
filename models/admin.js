var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

  name:{
    type:String,
    //required:true
  },
  Id:{
    type:String,
    //required:true,
    //unique:true
  },
  contact:{
    type:String
  },
  email:{
    type:String,
  },
  password:{
    type:String,
    //required:true,
    //minlength:6
  }
});


var Admin = mongoose.model('Admin',userSchema);

module.exports  = {Admin};
