require("dotenv").config();
require("./config/db_connection"); // database initial setup
require("./config/db_session.js")


const productModel=require("./models/Product.js")
const userModel=require("./models/User.js")
const tagModel= require("./models/Tag.js")
const handler=require("./bin/CRUDHandler.js")

const express = require("express");
const bodyParser = require ("body-parser")
const hbs = require("hbs");
const app = express();
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose=require("mongoose")



app.locals.site_url = process.env.SITE_URL;
// used in front end to perform ajax request on a url var instead of hardcoding it

app.set("view engine", "hbs"); //
app.set("views", __dirname + "/views"); //
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: "basic-auth-secret",
  cookie: { maxAge: 60000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));


hbs.registerPartials(__dirname + "/views/partials");

const basePageRouter = require("./routes/index");
const adminRouter = require("./routes/admin");

app.use(basePageRouter);
app.use(adminRouter);

const listener = app.listen(process.env.PORT || 8000, () => {
  console.log(
    `app started at ${process.env.SITE_URL}`
  );
});

//PRIDUCT
CRUDHandlerProduct= new handler(productModel)
const testProduct={
  name: "Adidas baby",
  ref : "test reference 2",
  sizes : "32",
  description : "new description",
  price : 100,
  category : "kids",
  id_tags: "5d148b66540e3c1ef816f168"
}
//CRUDHandlerProduct.createOne(testProduct)

//USER
CRUDHandlerUser= new handler(userModel)
const testUser={
  firstname: "firstname",
  lastname : "lastname",
  email: "email@email.com",
  password: "tot" //bcrypt.hashSync ("supersecretpassword", salt)
}
//CRUDHandlerUser.createOne(testUser)

//TAG
const tag1={
  label:"converse",
}
const tag2={
  label: "athletic",
}
const tag3={
  label: "vintage"
}

const tagHandler= new handler(tagModel)
//tagHandler.createOne(tag1)
//tagHandler.createOne(tag2)
//tagHandler.createOne(tag3)




/*const userModel = require ("./models/User.js");

const bcrypt  = require ("bcrypt");
const bcryptSalt  = 10;
const salt =bcrypt.genSaltSync (bcryptSalt);

userModel.create ({
    firstname: "firstname",
    lastname : "lastname",
    email: "email@email.com",
    password: bcrypt.hashSync ("supersecretpassword", salt)}
)
.then (dbres => console.log ("this seems to be working and the result is " + dbres))
.catch (err => "this is not working") 

const tagModel = require ("./models/Tag.js");


tagModel.create(tag2)
.then (dbres => console.log ("this seems to be working and the result is " + dbres))
.catch (err => "this is not working") 

productModel.find ({}).populate ("id_tags")
.then ( dbRes => console.log("I am returning a product which is " + (dbRes)))
.catch ( err => "does not work") 

*/