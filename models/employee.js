var mongoose = require("mongoose");


var employeeSchema = mongoose.Schema({
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
  },
  type:{
    type:String
  }
});


var Employee = mongoose.model('Employee',employeeSchema);

module.exports = {Employee};
