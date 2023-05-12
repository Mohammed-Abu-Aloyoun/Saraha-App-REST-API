const messageModel = require("../../../db/model/message.model");
const userModel = require("../../../db/model/user.model");


const sendMessage =  async (req,res)=>{
    const { id } = req.params;
     const  { message } =req.body;
        const user = await userModel.findById({_id:id});
            if(!user)
                res.json({msg:"this user unavailable"});
            else {
                const newMessage = new messageModel({text:message,reciverid:id});
                const  saveMessage = await newMessage.save();
                    if(saveMessage)
                        res.json({msg:"add new message"});
                    else 
                        res.json({msg:"faild add message"}); 
            }

}

const messageList = async (req,res)=>{
        const id = req.userId;
          
        const message = await messageModel.find({reciverid:id});
            if(Object.keys(message).length == 0 )
                res.json({msg:"the user dont have messages"});
            else {
                res.json({msg:"sucss",message});
            } 
}


module.exports = { sendMessage,messageList };