let express=require("express");

exports.homepage=(req,res)=>
    {
        res.render("index.ejs");
    }

    exports.loginPage=(req,res)=>
        {
            res.render("login.ejs");
        }