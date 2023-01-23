const NovetlyController = require("../controllers/NovetlyControler");
const IsAdminMiddleWare = require("../middleware/IsAdminMiddleWare");

const rout = require("express")();

rout.get("/", NovetlyController.Get);
rout.post("/", IsAdminMiddleWare, NovetlyController.Add);
rout.delete("/:id",IsAdminMiddleWare,NovetlyController.Del);

module.exports = rout;