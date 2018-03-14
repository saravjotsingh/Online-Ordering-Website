var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

  name:{
    type:String,
    //required:true
  },
  rollNo:{
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


var User = mongoose.model('User',userSchema);

module.exports  = {User};
