let express=require("express");
let bodyParser=require("body-parser");

let cookieParser=require("cookie-parser");
let app=express();
let db=require("./config/db");

app.set("view egine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(bodyParser.json());


module.exports=app;