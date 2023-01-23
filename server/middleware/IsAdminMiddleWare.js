const jwt = require("jsonwebtoken");
const ErrorApi = require("../error/ErrorApi");

module.exports =async (req, resp, next) => {
    try{
        const result=req.headers.authorization.split(' ')[1];
        const isTokenTrue=await jwt.verify(result,process.env.SECRET_KEY);
        
        if(isTokenTrue){
            const user=await jwt.decode(result);
            if(user.isAdmin){
                next();
            }
        }
        
    } catch (err) {
        return next(ErrorApi.noAuth(err.message));
    }
}