var mongoose = require("mongoose");

var orderSchema = mongoose.Schema({
  items:[String],
  quantity:[Number],
  identity:{
    type:String
  }
});

var Order = mongoose.model("Order",orderSchema);

module.exports = {Order};
