const UserController = require("../controllers/UserController");
const AuthMiddleWare = require("../middleware/AuthMiddleWare");

const rout = require("express")();

rout.post("/add",UserController.Add);
rout.post("/authorize",UserController.Authorize);
rout.post("/isAuthorize",UserController.IsAuthorize);
rout.post("/changePassword",AuthMiddleWare,UserController.ChangePassword);
rout.get("/getPhone",AuthMiddleWare,UserController.GetPhone);
rout.post("/editEmail",AuthMiddleWare,UserController.EditEmail);
rout.post("/regWithGoogle",UserController.RegInGoogle);
rout.post("/registerWithGoogle",UserController.RegisterInGoogle);
rout.post("/updateInfoForUser",AuthMiddleWare,UserController.SetNewInfoAboutUser);
rout.post("/isPasswordNull",AuthMiddleWare,UserController.IsPasswordNull);
rout.post("/forgotPass",UserController.ForgorPass);
rout.post("/isKeyForgotPassTrue",UserController.IsForgotPassTrue);
rout.post("/forgotPassTrue",UserController.FotgotPassTrue)

module.exports = rout;