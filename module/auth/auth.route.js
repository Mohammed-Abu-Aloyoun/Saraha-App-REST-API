const router = require("express").Router();
const auth = require("../../middlewear/auth");
const authController = require("./controller/auth.controller");
const {signup} = require('./auth.validation');
const validation = require("../../middlewear/validation");
// sign up
router.post("/signup",validation(signup),authController.signup);
// confirm email 
router.get("/confirmEmail/:id",authController.confirmEmail);
// sign in
router.get("/signin",authController.signin);
// forget password 
router.get("/forgetPassword",authController.forgetPassword);
// forget password recover
router.get("/forgetPasswordReover/:id",authController.forgetPasswordReover);
// test
router.get("/test",authController.test);
module.exports = router;
