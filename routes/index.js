const express = require("express");
const router = new express.Router();
const userModel = require ('../models/User.js');
const bcrypt  = require ("bcrypt");
const bcryptSalt  = 10;
const salt =bcrypt.genSaltSync (bcryptSalt);
const handler=require("../bin/CRUDHandler.js");
const productModel=require("../models/Product.js")
const productHandler=new handler(productModel);
require("../config/db_session.js")


router.get(["/", "/home"], (req, res) => {
  res.render("index");
});

router.get("/collection", (req, res) => {
  let logInStatus = (req.session.currentUser ? true : false);
  allProducts=productHandler.getAll(product=> res.render("products", {product, logInStatus }))
});

cat=["kids", "women", "men"]
cat.forEach(c =>{
  router.get(`/${c}`, (req, res)=>{
    let logInStatus = (req.session.currentUser ? true : false);
    productsFiltered=productHandler.filter("category", c,  product =>
    res.render("products", {product, logInStatus})
    )
  })
})

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res) => {
  const { firstname, lastname, email, password} = req.body;
  userModel.findOne ({"firstname": firstname, "lastname": lastname})
  .then (queryResult => {    
     if (queryResult !== null)  {       
      console.log ("user found"); 
      res.render ("signup", { errorMessage: "This user already exist - Please use a different one"})  
     }       
     else 
     {
      console.log ("I am dealing with a new user");
      const hashpwd=bcrypt.hashSync (password, salt);
      userObject = {firstname, lastname, email, password:hashpwd};
      userModel.create (userObject)
        .then ( () => {res.redirect ('/'); console.log ("Account created")})
        .catch (err=> console.log ("sign up did not work"))
     }   
})  .catch (err => "username query does not work");
});


router.get("/login", (req, res) => {
  res.render("login");
});


router.post("/login", (req, res, next) =>{
  const { firstname, lastname, email, password} = req.body;
  userModel.findOne({email})
    .then( user =>{
      if (!user){
        console.log("no user ")
        let logInStatus = (req)=>req.session.currentUser ? true : false; 
        res.render('login', {errorMessage: "User doesn't exist. Please, try again or create an account.", logInStatus})}
        else {
            if(bcrypt.compareSync(password, user.password)){
              let logInStatus = (req.session.currentUser ? true : false); 
              req.session.currentUser=user; 
              res.render("index", {logInStatus})
            }
            else{
              console.log("error pwd")
              res.render('login', {errorMessage: "Incorrect password !"})
              }
      }     
  })
})

router.get("/logout", (req, res, next) =>{
  req.session.destroy((err) => {
    console.log("logout")
    let logInStatus = (req.session.currentUser ? true : false);
    res.render("login", {logInStatus} );
})
})


router.get("/one-product", (req, res) => {
  res.render("one_product");
});

module.exports = router;
