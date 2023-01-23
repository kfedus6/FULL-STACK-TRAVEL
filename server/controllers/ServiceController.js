const ErrorApi = require("../error/ErrorApi")
const { Services } =require("../models/models");

class ServiceController{
    static GetServiceByName=async(req,resp,next)=>{
        try{
            const {name}=req.params;
            const res=await Services.findOne({where:{name}});
            return resp.json({status:200,res});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    static UpdateService=async(req,resp,next)=>{
        try{
            
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
}

module.exports=ServiceController;