// dotenv
require('dotenv').config()

// express
const express = require("express");
const app = express();
app.use(express.json());

// data base
const connect = require("./db/connection");
connect();

// router
const indexRouter =require("./module/index.route");
app.use(`/user`,indexRouter.userRouter);
app.use(`/message`,indexRouter.messageRouter);
app.use(`/auth`,indexRouter.authRouter);


// page not found
app.get("*",(req,res)=>{
        res.json({msg:"ops this page not found"});
});


app.listen(3000,_=>console.log("server working ...."));