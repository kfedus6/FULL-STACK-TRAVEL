const Router = require("express")
const router = new Router()
const IsAdminMiddleWare = require("../middleware/IsAdminMiddleWare");

const scheduleBusStatusController = require('../controllers/ScheduleBusStatusController')

router.get('/:id', scheduleBusStatusController.getStatus)
router.put('/status', IsAdminMiddleWare, scheduleBusStatusController.pusStatus)
router.put('/', IsAdminMiddleWare, scheduleBusStatusController.pusScheduleBusDate)

module.exports = router