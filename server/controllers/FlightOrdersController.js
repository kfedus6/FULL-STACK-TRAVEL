const { FlightOrder, Flight } = require("../models/models");
const ErrorApi = require("../error/ErrorApi");

class FlightOrdersController {
    static Add = async (req, resp, next) => {
        try {
            const { flightId, price, surename, name, email, countPersons, countChildren, phone, date, countPersonsBack, countChildrenBack, dateBack, userId } = req.body;
            let user = req.user;
            let res;
            if (userId == 0)
                res = await FlightOrder.create({ price, surename, name, email, countPersons, countChildren, phone, date, countPersonsBack, countChildrenBack, dateBack, flightId });
            else res = await FlightOrder.create({ price, surename, name, email, countPersons, countChildren, phone, date, countPersonsBack, countChildrenBack, dateBack, flightId, userId });
            return resp.json({ status: 200, res });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static getOrders = async (req, resp, next) => {
        try {
            let { page, limit } = req.query
            if (page === undefined) {
                page = 1
            }
            if (limit === undefined) {
                limit = 2
            }

            const offset = page * limit - limit

            const res = await FlightOrder.findAndCountAll({ limit: Number(limit), offset: Number(offset) });

            return resp.json({ status: 200, res });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static SetStatus = async (req, resp, next) => {
        try {
            let { status, id, page, limit, countTicket } = req.body;
            page = page | 1;
            limit = limit | 5;
            await FlightOrder.update({ status: status, countTicket }, { where: { id } });
            const response = await FlightOrder.findOne({ where: { id } });
            if (status) {
                const flight = await Flight.findOne({ where: { id: response.flightId } });
                const countFreePlace = flight.countFreePlace - countTicket;
                await Flight.update({ countFreePlace }, { where: { id: flight.id } });
            } else {
                const flight = await Flight.findOne({ where: { id: response.flightId } });
                const countFreePlace = parseInt(flight.countFreePlace) + parseInt(countTicket);
                await Flight.update({ countFreePlace }, { where: { id: flight.id } });
            }
            const offset = page * limit - limit

            const res = await FlightOrder.findAndCountAll({ limit: Number(limit), offset: Number(offset) });

            return resp.json({ status: 200, res });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static setStatusPayment = async (req, resp, next) => {
        try {
            let { statusPayment, id, page, limit, countTicket } = req.body;
            page = page | 1;
            limit = limit | 5;
            await FlightOrder.update({ statusPayment: statusPayment }, { where: { id } });
            const offset = page * limit - limit

            const res = await FlightOrder.findAndCountAll({ limit: Number(limit), offset: Number(offset) });

            return resp.json({ status: 200, res });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static setStatusPrePayment = async (req, resp, next) => {
        try {
            let { statusPrePayment, id, page, limit, countTicket } = req.body;
            page = page | 1;
            limit = limit | 5;
            await FlightOrder.update({ statusPrepayment: statusPrePayment }, { where: { id } });
            const offset = page * limit - limit

            const res = await FlightOrder.findAndCountAll({ limit: Number(limit), offset: Number(offset) });

            return resp.json({ status: 200, res });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static setStatusSuccess = async (req, resp, next) => {
        try {
            let { statusSuccess, id, page, limit, countTicket } = req.body;
            page = page | 1;
            limit = limit | 5;
            await FlightOrder.update({ statusSuccess: statusSuccess }, { where: { id } });
            const offset = page * limit - limit

            const res = await FlightOrder.findAndCountAll({ limit: Number(limit), offset: Number(offset) });

            return resp.json({ status: 200, res });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static deleteOrder = async (req, resp, next) => {
        try {
            const { id } = req.params
            await FlightOrder.destroy({ where: { id: id } })
            const res = await FlightOrder.findAndCountAll({ limit: Number(5), offset: Number(0) });
            return resp.json({ status: 200, res });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }

    static getUserFlight = async (req, resp, next) => {
        try {
            const userId = req.user.id;
            const res = await FlightOrder.findAll({ where: { userId } });
            return resp.json({ status: 200, res })
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }

    static getUserOrders = async (req, res, next) => {
        try {
            const userId = req.user.id
            const userOrders = await FlightOrder.findAll({ where: { userId } })
            let flightOrders = []
            for (let i = 0; i < userOrders.length; i++) {
                let flight = await Flight.findOne({ where: { id: userOrders[i].flightId } })
                flight.startPosition = flight.startPosition.split("//");
                flight.finishPosition = flight.finishPosition.split("//");
                flight.streetStartPosition = flight.streetStartPosition.split("//");
                flight.streetFinishPosition = flight.streetFinishPosition.split("//");
                flight.description = flight.description.split("/*/");
                flightOrders.push(flight)
            }
            return res.json({ status: 200, flightOrders })
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
}

module.exports = FlightOrdersController