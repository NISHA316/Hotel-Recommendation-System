let express = require("express");
let regmodel = require("../models/regModel.js");
const regService = require("../services/regService.js");
const db = require("../config/db");
// Homepage
exports.homepage = (req, res) => {
    res.render("index.ejs");
};

// Login Page button  
 exports.loginPage = (req, res) => {
     res.render("login.ejs", { msg: "" });
 };




 exports.Registerpage = (req, res) => { //registration.
     res.render("Register.ejs",{msg:""})
 };
    //registarion page
//     const { username, useremail, password, contact, type } = req.body;
//     console.log("Received Data:", req.body);
//     regmodel.saveUser(username, useremail, password, contact, type)
//         .then(result => {
//             console.log("User registered:", result);
//             res.render("login", { msg: "Registration successful!" });
//         })
//         .catch(err => {
//             console.error("Error registering user:", err);
//             res.render("signup", { msg: "Registration failed. Try again." });
//         });
// };

exports.saveuser=(req,res)=>
    {
        console.log("hello");
        let{username,useremail,password,contact,type}=req.body;
            async function getuser()
            {
                let result=await regmodel.saveUser(username,useremail,password,contact,type);
                console.log(result);
                if(result==="done")
                    {
                        res.render("login.ejs");
                    }
                    else
                    {
                        res.render("Register.ejs",{msg:"Registration failed"});
                    }
            }

            getuser();
        
    };


//login the page
exports.validateUser = async (req, res) => {
    const { username, password, type } = req.body;
    try {
      const result = await regmodel.validateUserFromDB(username, password, type);
        console.log(result);
      if (result.length === 0) {
        return res.render("login.ejs", { msg: "Invalid credentials or role." });
      }
  
      const user = result[0];
  
      // Store user info in session
      req.session.userid = user.userid;
      req.session.role = user.type;
  
      // Redirect based on user type
      if (user.type.toLowerCase() === "admin") {
        return res.redirect("/admindashbord");
      } else if (user.type.toLowerCase() === "user") {
        return res.redirect("/userDashBoard");
      } else {
        return res.render("login.ejs", { msg: "Unknown role selected." });
      }
  
    } catch (err) {
      console.error("Login error:", err);
      return res.render("login.ejs", { msg: "Server error." });
    }
  };
  
 exports.Userdashboard = (req, res) => {

    console.log("req.session", req.session);
     if (!req.session.userid || req.session.role !== "User") {
        //  return res.redirect("/userDashBord.js");

        return res.render("login.ejs");
        
     }

     res.render("userDashboard.ejs", { adminname: "admin" });
 };

 
 exports.adminDashbord = (req, res) => {
    console.log("req.session", req.session);

    // Check if user is not logged in or not an admin
    if (!req.session.userid || req.session.role !== "admin") {
        console.log("authentication failed");
        return res.redirect("/login"); // redirect to login if not admin
    }

    res.render("adminDashBord.ejs", { adminname: "Admin" }); // render the admin dashboard
};


 exports.updateProfile = (req, res) => {
     let { username, useremail, contact,password, type } = req.body;
     let loginUserId = req.session.userid;

     if (!loginUserId) {
         return res.redirect("/login");
     }

     let result = regmodel.updateProfile(username, useremail, password, contact, type, loginUserId);

     result.then(() => {
        regmodel.getLoginUserProfile(loginUserId).then((profile) => {
           res.render("viewprofile.ejs", { lud: profile[0], msg: "Profile updated successfully." });
         });
     }).catch((err) => {
         console.error(err);
         res.render("error.ejs", { msg: "Profile update failed." });
     });
 };



















// //  exports.validateUser = (req, res) => {
// //      let username=req.body.username;
// //      let password=req.body.password;
// //       console.log(username);
// //       async function getvalidate()
// //           {
// //               let r = await regmodel.validateUserFromDB(username, password);
// //               console.log(r);
           
// //                  if (r.length === 0) {
// //                       console.log("invalid");
// //                       return res.render("login.ejs", { msg: "Invalid username or password." });
// //                   }
// //                   console.log(r[0].userid);
// //                   req.session.userid = r[0].userid;
// //                  console.log("Login user ID stored in session:", r[0].userid);
// //                   // ✅ redirect to dashboard route
// //                   return res.redirect("/dashboard");
// //           }
// //           getvalidate();
// //  };






// // exports.adminDashbord=(req, res) => {
// //     if (!req.session.userid || req.session.role !== "admin") {
// //       return res.redirect("/login");
// //     }
  
// //     res.render("adminDashboard.ejs", { adminname: "Admin" });
// //   };
  

// //   exports.validateUser = (req, res) => {
// //     const { username, password, type } = req.body;

// //     async function getvalidate() {
// //         let result = await regmodel.validateUserFromDB(username, password, type);

// //         if (result.length === 0) {
// //             return res.render("login.ejs", { msg: "Invalid credentials or role." });
// //         }

// //         const user = result[0];
// //         req.session.userid = user.userid;
// //         req.session.role = user.type;

// //         if (user.type === "admin") {
// //             return res.redirect("/admin/dashboard");
// //         } else if (user.type === "guest") {
// //             return res.redirect("/dashboard");
// //         } else {
// //             return res.render("login.ejs", { msg: "Unknown role." });
// //         }
// //     }

// //     getvalidate();
// // };


// // // View Profile
// // exports.viewprofile = (req, res) => {
// //     let loginUserId = req.session.userid;

// //     if (!loginUserId) {
// //         return res.redirect("/login");
// //     }

// //     let proObj = regmodel.getLoginUserProfile(loginUserId);

// //     proObj.then((profile) => {
// //         res.render("viewprofile.ejs", { lud: profile[0], msg: "" });
// //     }).catch((err) => {
// //         console.error(err);
// //         res.render("error.ejs", { msg: "Failed to load profile." });
// //     });
// // };

// // // Update Profile
// // exports.updateProfile = (req, res) => {
// //     let { name, useremail, contact, username, password, type } = req.body;
// //     let loginUserId = req.session.userid;

// //     if (!loginUserId) {
// //         return res.redirect("/login");
// //     }

// //     let result = regmodel.updateProfile(username, useremail, password, contact, type, loginUserId);

// //     result.then(() => {
// //         regmodel.getLoginUserProfile(loginUserId).then((profile) => {
// //             res.render("viewprofile.ejs", { lud: profile[0], msg: "Profile updated successfully." });
// //         });
// //     }).catch((err) => {
// //         console.error(err);
// //         res.render("error.ejs", { msg: "Profile update failed." });
// //     });
// // };


// // exports.signUp = async (req, res) => {
// //     try {
// //       const { username, useremail, password, contact, type } = req.body;
  
// //       if (!username || !useremail || !password || !contact || !type) {
// //         return res.status(400).send("All fields are required.");
// //       }
  
// //       await regmodel.saveUser(username, useremail, password, contact, type);
  
// //       res.send("Registration successful!");
// //     } catch (error) {
// //       console.error("Signup Error:", error);
// //       res.status(500).send("Internal Server Error");
// //     }
// //   };


// const conn = require("../config/db");

// exports.saveUser = (username, useremail, password, contact, type) => {
//   const sql = `
//     INSERT INTO usermaster (username, useremail, password, contact, type)
//     VALUES (?, ?, ?, ?, ?)
//   `;

//   return new Promise((resolve, reject) => {
//     conn.query(sql, [username, useremail, password, contact, type], (err, result) => {
//       if (err) return reject(err);
//       resolve(result);
//     });
//   });
// };

  
//                 // exports.dashboard = (req, res) => {
//                 //     const loginUserId = req.session.userid;
                
//                 //     if (!loginUserId) {
//                 //         return res.redirect("/login");
//                 //     }
                
//                 //     // Example hardcoded hotels and bookings - you can fetch from DB
//                 //     const hotels = [
//                 //         { id: 1, name: "Hotel Taj", city: "Mumbai", rating: 4.5 },
//                 //         { id: 2, name: "Oberoi Palace", city: "Delhi", rating: 4.8 },
//                 //         { id: 3, name: "The Leela", city: "Bangalore", rating: 4.6 }
//                 //     ];
                
//                 //     const bookings = [
//                 //         { hotel_name: "Hotel Taj", checkin_date: "2025-06-10", status: "Confirmed" },
//                 //         { hotel_name: "Oberoi Palace", checkin_date: "2025-06-15", status: "Pending" }
//                 //     ];
                
                    

            





//                 //     regmodel.updateProfile(loginUserId).then(userData => {
//                 //         const user = userData[0];
//                 //         res.render("userDashBoard.ejs", {
//                 //             user: user,
//                 //             hotels: hotels,
//                 //             bookings: bookings
//                 //         });
//                 //     }).catch(err => {
//                 //         console.error(err);
//                 //         res.render("error.ejs", { msg: "Failed to load dashboard." });
//                 //     });
//                 // };
                
 

            
           
        
           
           