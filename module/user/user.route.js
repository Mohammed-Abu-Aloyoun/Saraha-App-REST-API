const auth = require("../../middlewear/auth");
const userController = require("./controller/user.controller");
const router = require("express").Router();

// upadte password without params
router.get("/updatePassword/",auth(),userController.updatePassword);
// upadte password with params 
router.get("/updatePassword/:id",auth(),userController.updatePassword);

module.exports = router;
