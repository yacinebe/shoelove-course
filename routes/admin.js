const express = require("express");
const router = new express.Router();
const handler=require("../bin/CRUDHandler.js")
const productModel=require("../models/Product.js")
const productHandler=new handler(productModel)
const ensureAuthenticated=require("../bin/ensureAuth.js")

router.get("/prod-add", ensureAuthenticated, (req, res) => {
  res.render("products_add");

});

router.post("/prod-add", ensureAuthenticated,(req, res, next) =>{
  productAdded=req.body;
  productHandler.createOne(productAdded)
  const cat=req.body.category
  cat!="" ?  res.redirect(`/${cat}`) : res.redirect(`/collection`)
})

router.get("/prod-manage", ensureAuthenticated, (req, res) => {
  let logInStatus = (req.session.currentUser ? true : false);
  productHandler.getAll(products=> res.render("products_manage", {products, logInStatus}))
});

router.get("/product-edit", ensureAuthenticated, (req, res, next) => { 
  productHandler.getOne( req.body.ref, prod =>  res.render("product_edit", {prod}) )
  ;
});

router.post("/product-edit", (req, res, next )=>{
  let logInStatus = (req.session.currentUser ? true : false); 
  console.log("req.body --", req.body)
  filterObject={ref : req.body.ref}
  productHandler.updateOne(filterObject, req.body, productEdited=> res.render("products_manage", {productEdited, logInStatus}))
})


router.get("/product-delete", ensureAuthenticated, (req, res, next) => {
  res.render("products_manage");
});


router.post("/product-delete", ensureAuthenticated, (req, res, next) => {
  let logInStatus = (req.session.currentUser ? true : false);
  productHandler.deleteOne(req.body, products=> res.render("products_manage", {products, logInStatus}))
});

//router.get("/tag-add", ensureAuthenticated, (req, res)=>{})

module.exports = router;