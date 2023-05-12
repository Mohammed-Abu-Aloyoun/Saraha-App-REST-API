const validation = (schema) =>{
        return (req,res,next) =>{
       const validationResult = schema.body.validate(req.body,{abortEarly:false});
                if(validationResult.error)
                        res.json({msg:'valdiation errro',error:validationResult.error.details});
                else
                      next();


        }
}

module.exports = validation;
