const router = require("express").Router();
const auth = require("../../middlewear/auth");
const messageController = require("./controller/message.controller");

// send message
router.post("/sendMessage/:id",messageController.sendMessage);
// show message
router.get("/messageList",auth(),messageController.messageList);



module.exports = router;
