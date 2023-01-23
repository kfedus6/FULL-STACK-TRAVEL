const BlogController = require("../controllers/BlogController");
const IsAdminMiddleWare = require("../middleware/IsAdminMiddleWare");

const rout=require("express")();

rout.get("/getAll",BlogController.GetAll);
rout.get("/getNovetly",BlogController.getNovetly);
rout.get("/getDescription",BlogController.GetWithDescription);
rout.post("/add",IsAdminMiddleWare,BlogController.Add);
rout.delete("/del",IsAdminMiddleWare,BlogController.Del);
rout.get("/getSimilar",BlogController.GetSimilar);
rout.post("/getForFlight",BlogController.GetBlogForFlight);

module.exports=rout;