const { ScheduleBus, ScheduleBusStatus } = require('../models/models')
const ErrorApi = require('../error/ErrorApi')

class ScheduleBusStatusController {
    async getStatus(req, res, next) {
        try {
            const { id } = req.params

            const scheduleStatus = await ScheduleBusStatus.findAll({ where: { flightId: id } })

            return res.json({ status: 200, res: scheduleStatus })
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }

    async pusStatus(req, res, next) {
        try {
            const { sheduleBusId, id, status } = req.body

            await ScheduleBusStatus.update({ status: status }, { where: { id: id } })

            const newScheduleStatus = await ScheduleBusStatus.findAll({ where: { schedulebusId: sheduleBusId } })

            return res.json({ status: 200, res: newScheduleStatus })
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }

    async pusScheduleBusDate(req, res, next) {
        try {
            const { id, scheduleWithUA, scheduleToUA, scheduleWithRU, scheduleToRU, } = req.body

            const scheduleWith = [scheduleWithUA, scheduleWithRU].join('//')
            const scheduleTo = [scheduleToUA, scheduleToRU].join('//')

            const scheduleBus = await ScheduleBus.update({ scheduleWith: scheduleWith, scheduleTo: scheduleTo }, { where: { id: id } })

            return res.json({ status: 200, res: scheduleBus })
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
}

const scheduleBusStatusController = new ScheduleBusStatusController()
module.exports = scheduleBusStatusController 