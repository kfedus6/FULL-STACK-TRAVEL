const ResponceController = require("../controllers/ResponceController");
const IsAdminMiddleWare = require("../middleware/IsAdminMiddleWare");

const rout=require("express")();

rout.get("/getNovetly",ResponceController.getNovetly);
rout.post("/add",IsAdminMiddleWare,ResponceController.Add);
rout.delete("/delete/:id",IsAdminMiddleWare,ResponceController.Del)

module.exports=rout;