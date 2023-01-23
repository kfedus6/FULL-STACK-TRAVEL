const ErrorApi = require("../error/ErrorApi");
const { User, ForgorPass } = require("../models/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const sendEmail = require("../sendEmail");

class UserController {
    static Add = async (req, resp, next) => {
        try {
            const { name, email, telephone, password } = req.body;
            const isEmailTrue = await User.findOne({ where: { email } });
            const reg = /drop|\(|delete|;/g;
            if (reg.test(name) || reg.test(email) || reg.test(telephone) || reg.test(password)) throw ("invalid value");
            if (isEmailTrue != null) return resp.json({ status: 411, message: "email is busy" });
            const cryptPass = await bcrypt.hash(password, 3);
            const res = await User.create({ name: name, email: email, telephone: telephone, password: cryptPass, isAdmin: false });
            const token = await jwt.sign({ id: res.id, email: res.email, surname: res.surname, name: res.name, isAdmin: res.isAdmin }, process.env.SECRET_KEY, { expiresIn: "1y" });
            return resp.json({ status: 200, token });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static Authorize = async (req, resp, next) => {
        try {
            const { email, password } = req.body;
            const reg = /drop|\(|delete|;/g;
            if (reg.test(email)) throw ("invalid value");
            const res = await User.findOne({ where: { email } });
            if (res == null) {
                return resp.json({ status: 415, message: "invalid email" });
            }
            if (await bcrypt.compareSync(password, res.password)) {
                const token = await jwt.sign({ id: res.id, email: res.email, surname: res.surname, name: res.name, isAdmin: res.isAdmin }, process.env.SECRET_KEY, { expiresIn: "1y" });
                return resp.json({ status: 200, token });
            } else return resp.json({ status: 416, message: "invalid password" })
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static IsAuthorize = async (req, resp, next) => {
        try {
            const { token } = req.body;
            const verifyToken = await jwt.verify(token, process.env.SECRET_KEY);
            if (verifyToken == undefined) {
                return resp.json({ status: 420 });
            } else {
                const res = await User.findOne({ where: { email: verifyToken.email } });
                const newToken = await jwt.sign({ id: res.id, email: res.email, surname: res.surname, name: res.name, isAdmin: res.isAdmin }, process.env.SECRET_KEY, { expiresIn: "1y" });
                return resp.json({ status: 200, token: newToken });
            }

        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static ChangePassword = async (req, resp, next) => {
        try {
            const { oldPassword, newPassword, id } = req.body;
            if (!Number.isInteger(id)) throw ("id is not true");
            const user = await User.findOne({ where: { id } });
            if (user.password == null) {
                const cryptNewPassword = await bcrypt.hash(newPassword, 3);
                const res = await User.update({ password: cryptNewPassword }, { where: { id } });
                resp.json({ status: 200 });
            } else {
                if (await bcrypt.compareSync(oldPassword, user.password)) {
                    const cryptNewPassword = await bcrypt.hash(newPassword, 3);
                    const res = await User.update({ password: cryptNewPassword }, { where: { id } });
                    resp.json({ status: 200 });
                } else return resp.json({ status: 415, message: "password is not true" });
                resp.json({ user })
            }
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static GetPhone = async (req, resp, next) => {
        try {
            const { id } = req.user;
            const res = await User.findOne({ attributes: ['telephone'], where: { id } });
            return resp.json({ status: 200, res: res.dataValues.telephone });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static EditEmail = async (req, resp, next) => {
        try {
            const { id } = req.user;
            const { newEmail } = req.body;
            await User.update({ email: newEmail }, { where: { id } });
            const res = await User.findOne({ where: { id } });
            const token = await jwt.sign({ id: res.id, email: res.email, name: res.name, isAdmin: res.isAdmin }, process.env.SECRET_KEY, { expiresIn: "1y" });
            return resp.json({ status: 200, token });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static RegisterInGoogle = async (req, resp, next) => {
        try {
            const { token } = req.body;
            const result = jwt.decode(token);
            if (result.email_verified == true) {
                const isEmailTrue = await User.findOne({ where: { email: result.email } });
                console.log(2);
                if (isEmailTrue != null) return resp.json({ status: 411, message: "email is busy" });
                const res = await User.create({ email: result.email, name: result.given_name, surname: result.family_name });
                const newToken = await jwt.sign({ id: res.id, email: res.email, surname: res.surname, name: res.name, isAdmin: res.isAdmin }, process.env.SECRET_KEY, { expiresIn: "1y" });
                console.log(3);
                return resp.json({ status: 200, token: newToken });
            } else {
                console.log(4);
                return resp.json({ status: 420, message: "email is false" });
            }
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static RegInGoogle = async (req, resp, next) => {
        try {
            const { token } = req.body;
            const tokenDecode = await jwt.decode(token,"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");
            const res = await User.findOne({ where: { email: tokenDecode.email } });
            if (res == null) {
                return resp.json({ status: 415, message: "invalid email" });
            }
            const newToken = await jwt.sign({ id: res.id, email: res.email, surname: res.surname, name: res.name, isAdmin: res.isAdmin }, process.env.SECRET_KEY, { expiresIn: "1y" });
            return resp.json({ status: 200, token: newToken });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static SetNewInfoAboutUser = async (req, resp, next) => {
        try {
            const { id } = req.user;
            const { name, surname, phone } = req.body;

            await User.update({ name: name, surname: surname, telephone: phone }, { where: { id: id } });
            const res = await User.findOne({ where: { id } })
            const token = await jwt.sign({ id: res.id, email: res.email, surname: res.surname, name: res.name, isAdmin: res.isAdmin }, process.env.SECRET_KEY, { expiresIn: "1y" });

            return resp.json({ status: 200, res, token });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static IsPasswordNull = async (req, resp, next) => {
        try {
            const { id } = req.user;
            const user = await User.findOne({ where: { id } });
            const res = user.password == null;
            return resp.json({ status: 200, res });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static ForgorPass=async(req,resp,next)=>{
        try{
            const {email}=req.body;
            const user=await User.findOne({where:{email}});
            if(user==null)return resp.json({status:200,reply:-1});
            const key=uuid.v4();
            console.log(key,user.id)
            const res= await ForgorPass.create({userId:user.id,sekretKey:key});
            console.log(res);
            sendEmail(email,"Для відновлення паролю перейдіть по силці "+process.env.FRONT_URL+"user/forgorPass/"+key+" якщо це не ви то просто проігноруйте це повідмолення.");
            return resp.json({status:200,reply:1})
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    static FotgotPassTrue=async(req,resp,next)=>{
        try{
            console.log(1);
            const {key,newPass}=req.body;
            console.log(key,newPass);
            const {userId}=await ForgorPass.findOne({where:{sekretKey:key}});
            const cryptPass = await bcrypt.hash(newPass, 3);
            const res=await User.update({password:cryptPass},{where:{id:userId}});
            return resp.json({status:200,reply:1});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    static IsForgotPassTrue=async(req,resp,next)=>{
        try{
            const {key}=req.body;
            const forgorPass=await ForgorPass.findOne({where:{sekretKey:key}})
            const res=forgorPass!=null
            return resp.json({status:200,res});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
}

module.exports = UserController;