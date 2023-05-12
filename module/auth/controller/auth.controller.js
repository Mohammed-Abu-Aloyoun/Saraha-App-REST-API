const userModel = require("../../../db/model/user.model");
const bcrypt = require('bcryptjs');
const sendEmail = require("../../../services/email/email");
const jwt = require('jsonwebtoken');
const { resolveContent } = require("nodemailer/lib/shared");
const { nanoid } = require('nanoid');


// sign up
const signup = async (req,res)=>{
           
        const { userName,password,email } = req.body;
        const user = await userModel.findOne({email});
            if(!user){
       
                const hashPassword = await bcrypt.hash(password,+process.env.bcryptSalt);
                const newUser = new userModel({userName,password:hashPassword,email});
                const userSave = await newUser.save();
                    if(userSave){
                            const userId = await jwt.sign({_id:newUser._id},process.env.tokenId);
                        sendEmail('mohmadjhad49@gmail.com','confirmEmail',`${req.protocol}://${req.headers.host}/auth/confirmEmail/${userId}`);
                        res.json({msg:"add new user"});
                    }           
                    else 
                        res.json({msg:"faild to add user"});
            }
            else 
                res.json({msg:"email exist"});
            

}

// confirm email 

const confirmEmail =  async (req,res)=>{
        const { id } = req.params;
            const decode =  jwt.verify(id,process.env.tokenId);
                if(!decode)
                    res.json({msg:'this token invaild'});
                else {
                    const id = decode._id;
                        const matchEmail = await userModel.findById(id);
                            if(matchEmail.confirmEmail){
                                res.json({msg:"this email confirmed"});
                            }else{
                                const updateUser = await userModel.findByIdAndUpdate({_id:id},{confirmEmail:true});
                                res.json({msg:"the email been confirm"});
                            }
            
                }

            
}

// sign in 
const signin = async (req,res)=>{
                
        const { email,password } = req.body;
            const matchEmail = await userModel.findOne({email});
        if(!matchEmail)
            res.json({msg:"this email not exist"});
        else {
            const matchPass = await bcrypt.compare(password,matchEmail.password);
                if(!matchPass)
                    res.json({msg:'email or password not correct'});
                else {
                        if(!matchEmail.confirmEmail) 
                            res.json({msg:'this email not confirm'});
                        else {
                            const id = matchEmail._id;
                                const token = await jwt.sign({_id:id},process.env.tokenSignin);
                                res.json({msg:"sucss sign in",token});
                        }
                   
                }
        }
            
}

// forget password
const forgetPassword = async (req,res)=>{
 
    const { email } = req.body;
        
            const user = await userModel.findOne({email});
                const token = await jwt.sign({_id:user._id},process.env.tokenForgetPass);
                sendEmail('mohmadjhad49@gmail.com','forget password',`${req.protocol}://${req.headers.host}/auth/forgetPasswordReover/${token}`);
        res.json({msg:"if your email exist we send you a link for recover your account"});

}
// forget password recover
const forgetPasswordReover = (req,res)=>{
    const { id } = req.params;
    try{     
        const decode = jwt.verify(id,process.env.tokenForgetPass);
        res.redirect(`${req.protocol}://${req.headers.host}/user/updatePassword/${id}`);

    }catch(error) {
            res.json({msg:"invaild token"});
    }

       
}
const test =(req,res)=>{
   
    const code = nanoid(4);
            console.log(code);
                res.json("test");
}

module.exports = { signup,confirmEmail,signin,forgetPassword,forgetPasswordReover,test }
