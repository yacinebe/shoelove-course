const express = require("express");
const router = new express.Router();
const handler=require("../bin/CRUDHandler.js")
const productModel=require("../models/Product.js")
const productHandler=new handler(productModel)
const ensureAuthenticated=require("../bin/ensureAuth.js")
const tagModel=require("../models/Tag.js")
const tagHandler=new handler(tagModel)

router.get("/prod-add", ensureAuthenticated, (req, res) => {
  res.render("products_add");

});

router.post("/prod-add", ensureAuthenticated, (req, res, next) =>{
  let tagId;
  tagHandler.filter ("label", req.body.tag, tag => {
  productAdded=req.body;
  console.log (tag);
  productAdded.id_tags = tag[0] ['_id'];
  console.log(productAdded);
  productHandler.createOne(productAdded)
  const cat=req.body.category
  cat!="" ?  res.redirect(`/${cat}`) : res.redirect(`/collection`)
})
});


router.get("/prod-manage", ensureAuthenticated, (req, res) => {
  let logInStatus = (req.session.currentUser ? true : false);
  productHandler.getAll(products=> res.render("products_manage", {products, logInStatus}))
});

router.get("/product-edit/:id_passed", ensureAuthenticated, (req, res, next) => { 
  const id=req.params.id_passed
  console.log(id)
  productHandler.getOneById(id, prod =>  {res.render("product_edit", {prod}); console.log("prod -----" ,prod)} )
  ;
});

router.post("/product-edit/:id_passed", (req, res )=>{
  filterObject={_id : req.params.id_passed}
  data=req.body
  data._id=req.params.id_passed
  productHandler.updateOne(filterObject, data, () => res.redirect("/prod-manage"))
})


router.get("/product-delete/:id_passed", ensureAuthenticated, (req, res, next) => {
  filterObject={_id : req.params.id_passed}
  productHandler.deleteOne(filterObject, ()=> res.redirect("/prod-manage"))
});



//router.get("/tag-add", ensureAuthenticated, (req, res)=>{})

module.exports = router;