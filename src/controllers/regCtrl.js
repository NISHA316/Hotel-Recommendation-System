let express = require("express");
let regmodel = require("../models/regModel.js");
const regService = require("../services/regService.js");

// Homepage
exports.homepage = (req, res) => {
    res.render("index.ejs");
};

// Login Page
exports.loginPage = (req, res) => {
    res.render("login.ejs", { msg: "" });
};

// Signup Page (optional route)
exports.signUpPage = (req, res) => {
    res.render("register.ejs", { msg: "" });
};

// Registration Controller
exports.regCtrl = (req, res) => {
    let { name, email, address, contact, type, created_at, username, password } = req.body;
    let result = regService.acceptData(username, useremail, password,contact, type);
    res.render("register.ejs", { msg: result });
};

// Validate User Login
exports.validateUser = (req, res) => {
    let username=req.body.username;
    let password=req.body.password;
    console.log(username);
    async function getvalidate()
        {
            let r = await regmodel.validateUserFromDB(username, password);
            console.log(r);
           
                if (r.length === 0) {
                    console.log("invalid");
                    return res.render("login.ejs", { msg: "Invalid username or password." });
                }
                console.log(r[0].userid);
                req.session.userid = r[0].userid;
                console.log("Login user ID stored in session:", r[0].userid);
                // ✅ redirect to dashboard route
                return res.redirect("/dashboard");
        }
        getvalidate();
};


// View Profile
exports.viewprofile = (req, res) => {
    let loginUserId = req.session.userid;

    if (!loginUserId) {
        return res.redirect("/login");
    }

    let proObj = regmodel.getLoginUserProfile(loginUserId);

    proObj.then((profile) => {
        res.render("viewprofile.ejs", { lud: profile[0], msg: "" });
    }).catch((err) => {
        console.error(err);
        res.render("error.ejs", { msg: "Failed to load profile." });
    });
};

// Update Profile
exports.updateProfile = (req, res) => {
    let { name, email, contact, username, password } = req.body;
    let loginUserId = req.session.userid;

    if (!loginUserId) {
        return res.redirect("/login");
    }

    let result = regmodel.updateProfile(username, useremail,  password,contact,type, loginUserId);

    result.then(() => {
        // Reload updated profile
        regmodel.getLoginUserProfile(loginUserId).then((profile) => {
            res.render("viewprofile.ejs", { lud: profile[0], msg: "Profile updated successfully." });
        });
    }).catch((err) => {
        console.error(err);
        res.render("error.ejs", { msg: "Profile update failed." });
    });
};



exports.signuser=(req,res)=>
    {
        const { username, useremail, password, contact, type } = req.body;

        regmodel.saveUser(username,useremail,password,contact,type);
        res.send("sucessfull");

        res.end();
    }



                exports.dashboard = (req, res) => {
                    const loginUserId = req.session.userid;
                
                    if (!loginUserId) {
                        return res.redirect("/login");
                    }
                
                    // Example hardcoded hotels and bookings - you can fetch from DB
                    const hotels = [
                        { id: 1, name: "Hotel Taj", city: "Mumbai", rating: 4.5 },
                        { id: 2, name: "Oberoi Palace", city: "Delhi", rating: 4.8 },
                        { id: 3, name: "The Leela", city: "Bangalore", rating: 4.6 }
                    ];
                
                    const bookings = [
                        { hotel_name: "Hotel Taj", checkin_date: "2025-06-10", status: "Confirmed" },
                        { hotel_name: "Oberoi Palace", checkin_date: "2025-06-15", status: "Pending" }
                    ];
                
                    regmodel.getLoginUserProfile(loginUserId).then(userData => {
                        const user = userData[0];
                        res.render("userDashBoard.ejs", {
                            user: user,
                            hotels: hotels,
                            bookings: bookings
                        });
                    }).catch(err => {
                        console.error(err);
                        res.render("error.ejs", { msg: "Failed to load dashboard." });
                    });
                };
                
 

            
           
        
           
           