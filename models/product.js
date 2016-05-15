var mongoose = require("mongoose"), Schema = mongoose.Schema;

var ProductSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true}
});

var Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
