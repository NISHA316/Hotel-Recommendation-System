let router = require("express").Router();
let ctrl = require("../controllers/regctrl.js"); // ✅ This is correct
let multer=require("multer");
let path=require("path");
router.get("/", ctrl.homepage);
router.get("/login", ctrl.loginPage);
// Handle POST /signup
// router.post('/signup', (req, res) => {
//     const { username, useremail, password, contact, type } = req.body;
//     console.log('Signup Data:', req.body);
//     res.send('Signup successful');
//   });
router.post("/signup",ctrl.signuser);
// router.post("/login",ctrl.loginPage);
router.post("/validate", ctrl.validateUser);          
router.post("/updateProfile", ctrl.updateProfile);    
router.get("/dashboard", ctrl.dashboard);



// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, "public/images");  // <- use your custom folder here
//   },
//   filename: function (req, file, cb) {
//       cb(null, Date.now() + path.extname(file.originalname)); // e.g., 162123123.png
//   }
// });

// // Create the upload middleware
// const upload = multer({ storage: storage });


module.exports = router;


