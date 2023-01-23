const FAQController = require("../controllers/FAQController");
const IsAdminMiddleWare = require("../middleware/IsAdminMiddleWare");

const rout = require("express")();

rout.post("/add", IsAdminMiddleWare, FAQController.Add);
rout.get("/get", FAQController.Get);
rout.get("/getNovetly", FAQController.GetNovetly);
rout.get("/getSelect", FAQController.GetSelect);
rout.delete("/:id", IsAdminMiddleWare, FAQController.deleteFaq);

module.exports = rout;