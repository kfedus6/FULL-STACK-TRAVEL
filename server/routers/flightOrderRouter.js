const IsAdminMiddleWare = require("../middleware/IsAdminMiddleWare");
const flightOrdersController = require('../controllers/FlightOrdersController')
const AuthMiddleWare = require("../middleware/AuthMiddleWare");

const rout = require("express")();

rout.post("/add", flightOrdersController.Add);
rout.get("/getOrders", IsAdminMiddleWare, flightOrdersController.getOrders);
rout.put("/setStatus", IsAdminMiddleWare, flightOrdersController.SetStatus);
rout.put("/setStatusPayment", IsAdminMiddleWare, flightOrdersController.setStatusPayment);
rout.put("/setStatusPrePayment", IsAdminMiddleWare, flightOrdersController.setStatusPrePayment);
rout.put("/setStatusSuccess", IsAdminMiddleWare, flightOrdersController.setStatusSuccess);
rout.delete("/:id", IsAdminMiddleWare, flightOrdersController.deleteOrder);
rout.get("/getUserHistory", AuthMiddleWare, flightOrdersController.getUserFlight);
rout.get("/getOrdersAccount", AuthMiddleWare, flightOrdersController.getUserOrders)

module.exports = rout;