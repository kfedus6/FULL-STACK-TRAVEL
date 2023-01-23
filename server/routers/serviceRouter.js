const ServiceController = require("../controllers/ServiceController");

const rout=require("express")();

rout.get("/get",ServiceController.GetServiceByName);

module.exports=rout;