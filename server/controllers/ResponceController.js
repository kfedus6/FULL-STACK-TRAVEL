const uuid = require("uuid")
const path = require("path");
const ErrorApi = require("../error/ErrorApi");
const { Responce } = require("../models/models");

class ResponceController {
    static getNovetly = async (req, resp, next) => {
        try {
            const res = await Responce.findAll({order: [['id', "DESC"]] });
            resp.json({ status: 200, res });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static Add=async(req,resp,next)=>{
        try{
            const {authorName,description,wheretoWhere}=req.body;
            const { image } = req.files;
            console.log(image);
            const nameImg = uuid.v4() + ".jpg";
            image.mv(path.resolve(__dirname, '..', 'static', nameImg));
            const res=await Responce.create({nameAuthor:authorName,description,wheretoWhere,imageAuthor:nameImg});
            return resp.json({status:200,res});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    static Del=async(req,resp,next)=>{
        try{
            const {id}=req.params;
            const res=await Responce.destroy({where:{id}});
            if(res==1){
                return resp.json({status:200,res});
            }else return resp.json({status:400,res});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
}

module.exports = ResponceController;