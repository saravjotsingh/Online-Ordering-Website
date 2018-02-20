var mongoose = require("mongoose");

var dishSchema = mongoose.Schema({
  dishName:{
    type:String,
  },
  price:{
    type:Number
  },
  course:{
    type:String
  }
});

var Dish = mongoose.model("Dish",dishSchema);

module.exports = {Dish};
