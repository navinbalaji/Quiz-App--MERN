const jwt=require('jsonwebtoken');


function authenticate(req,res,next){
    if(req.headers.authorization){ 
        jwt.verify(req.headers.authorization,"navinsecretkey",(err,decoded)=>{
            if(decoded==undefined){
                res.status(401).json({
                    message:"Unauthorized"
               })
            }else{
                next();
            }
        })
    }else{
        res.status(401).json({
             message:"Unauthorized"
        })
    }
}

module.exports={authenticate};