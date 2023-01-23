const AboutUsControllers = require("../controllers/AboutUsController");

const rout=require("express")();

rout.use("/get",AboutUsControllers.Get);
rout.put("/update",AboutUsControllers.Update);

module.exports=rout;