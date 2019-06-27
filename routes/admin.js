const express = require("express");
const router = new express.Router();
const handler=require("../bin/CRUDHandler.js")
const productModel=require("../models/Product.js")
const productHandler=new handler(productModel)

router.get("/prod-add", (req, res) => {
  res.render("products_add");

});

router.post("/prod-add", (req, res, next) =>{
  productAdded=req.body;
  console.log(productAdded)
  productHandler.createOne(productAdded)

})

router.get("/prod-manage", (req, res) => {
  res.render("products_manage");
});

router.get("/product-edit", (req, res) => {
  res.render("product_edit");
});


router.get("/tag-add", (req, res)=>{})

module.exports = router;
