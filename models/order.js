var mongoose = require("mongoose");

var orderSchema = mongoose.Schema({
  items:[String],
  price:[Number],
  quantity:[Number]
});

var Order = mongoose.model("Order",orderSchema);

module.exports = {Order};
