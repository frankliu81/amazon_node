var express = require("express");
var router = express.Router();
var Product = require("../models/product");

// New Product
router.get("/new", function(req, res, next){
  console.log("rendered new");
  res.render("products/new", {errors: []})
});

// Create Product
router.post("/", function(req,res){
  console.log("rendered post method");
  var product = new Product({title: req.body.title,
      description: req.body.description,
      price: req.body.price});
  product.save(function(err,product){
    if(err){
      console.log(err);
      res.render("products/new", {errors: err.erros});
    } else {
      console.log(product);
      res.redirect("/products/" + product._id);
    }
  });
});

// Show Product
router.get("/:id", function(req, res) {
  Product.findOne({_id: req.params.id}, function(err, product) {
    if (err) {
      res.render("error", {message: "Product not found", error: {status: 404}});
    } else {
      res.render("products/show", {product: product});
    }
  });
});

// Delete Product
router.delete("/:id", function(req, res) {
  // var product = Product.findOne({_id: req.params.id});
  console.log(req);
  Product.remove({_id: req.params.id}, function(err, product) {
    if (err) {
      console.log(err);
      res.render("error", {message: "Product not found", error: {status: 404}});
    } else {
      console.log(product);
      res.redirect("/");
    }
  });
});

// All Products/index
router.get('/', function(req, res, next) {
  Product.find({}, function(err, products) {
    if (err) {
      next(err);
    } else if (products) {
      res.render('products/index', {products: products});
    } else {
      next(new Error('failed to load products'));
    }
  })
});

// Edit page
router.get("/:id/edit", function(req, res) {
  console.log("In edit page");
  Product.findOne({_id: req.params.id}, function(err, product) {
    if(err) {
      res.render("error", {message: "Product not found", error: {status: 404}});
    } else {
      res.render("products/edit", {product: product, errors: []});
    }
  });
});

// Update product
router.patch(':/id', function(req, res) {
  console.log("Patch request");
  Product.findOneAndUpdate({_id: req.params.id}, {
    title: req.body.title,
    description: req.body.description,
    // http://stackoverflow.com/questions/30445849/how-do-you-get-the-created-object-of-a-findoneandupdate-with-upsert-true-in-m
    // new: true return the modified document rather than the original
    price: req.body.price}, {new: true}, function(err, product) {
      if(err) {
        res.render("error", {message: "Product not found!", error: {status: 404}});
      } else {
        res.redirect("/products/" + product._id);
      }
  });
});

module.exports = router;
