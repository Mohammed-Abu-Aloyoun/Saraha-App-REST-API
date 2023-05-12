const bcrypt = require('bcryptjs');
const userModel = require('../../../db/model/user.model');
const jwt = require('jsonwebtoken');

const updatePassword = async (req,res)=>{

    const _id = req.userId;
       
        const { oldPassword,newPassword } = req.body;
            const user= await userModel.findById(_id);        
        const match = await bcrypt.compare(oldPassword,user.password);
                if(!match) 
                    res.json({msg:"the password not correct"});
                else{
                        const encode = await bcrypt.hash(newPassword,+process.env.bcryptSalt);
                    const updateUser = await userModel.findByIdAndUpdate(_id,{password:encode });
                        if(updateUser)
                            res.json({msg:"upadte sucssful"});
                        else
                            res.json({msg:"udpate faild"});
                }
                


}



module.exports = { updatePassword };
