
const jwt = require('jsonwebtoken');

const auth = ()=>{
        return (req,res,next)=>{
                const { id } = req.params;
                const { token } =req.headers;
                if(id){
                    try{ 
                        const decode =  jwt.verify(id,process.env.tokenForgetPass);
                            if(!decode)
                                res.json({msg:'inavild token'});
                            else {
                                req.userId = decode._id;
                                next();
                            }
                    }catch(error){
                            res.json({msg:error});
                    }
                }
                else if(token){ 
                if(!token.startsWith("soso__"))
                    res.json({msg:"barer token invaild"});
                else {
                    try{
                        const decode = jwt.verify(token.split("__")[1],process.env.tokenSignin);
                        if(!decode)
                            res.json({msg:"token invaild"});
                        else {
                            req.userId= decode._id;
                            next();
                        }
                    }
                catch(error) {
                    res.json({msg:"invaild token"});
                }        
                }
            }else 
                    res.json({msg:'token in header or parameter not exist'});

        }
    }
          
    

module.exports = auth;
