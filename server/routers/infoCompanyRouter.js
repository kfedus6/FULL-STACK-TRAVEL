const InfoCompanyController = require("../controllers/InfoCompanyController");
const IsAdminMiddleWare = require("../middleware/IsAdminMiddleWare");

const rout = require("express")();

rout.get("/get", InfoCompanyController.Get);
rout.put("/update",IsAdminMiddleWare,InfoCompanyController.Update);

module.exports = rout;