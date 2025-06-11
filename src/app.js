let express=require("express");
let bodyParser=require("body-parser");

let cookieParser=require("cookie-parser");
let app=express();
let router=require("./routes/routes.js");
let db=require("./config/db");

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(bodyParser.json());
// let path=require('path');
// app.use(,express.static(path.join(_dirname,'image')));
// app.use(express.static("public"));
app.use("/",router);


module.exports=app;