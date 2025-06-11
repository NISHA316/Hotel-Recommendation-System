
// .get('/', (req, res) => {
//     res.render('index');
// });
let router=require("express").Router();
let ctrl=require("../controllers/regctrl")
router.get("/",ctrl.homepage);
router.get("/login",ctrl.loginPage)


module.exports=router;