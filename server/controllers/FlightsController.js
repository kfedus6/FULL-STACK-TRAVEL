const { Flight, ParamsFlight, ScheduleBus, ScheduleBusStatus } = require('../models/models');
const ErrorApi = require('../error/ErrorApi');
const uuid = require("uuid");
const path = require("path");
const { Op } = require('sequelize');

class FlightsController {
    async postFlights(req, res, next) {
        try {
            const { price, childPrice, startPositionUA, startPositionRU, finishPositionUA, finishPositionRU,
                streetStartPositionUA, streetStartPositionRU, streetFinishPositionUA, streetFinishPositionRU,
                startDate, finishDate, startTime, finishTime, timeFlightUA, timeFlightRU, countFreePlace,
                descriptionUA, descriptionRU, isWifi, isWC, is220V, isMultimedia,
                isAirConditioning, map, countryStartUA, countryStartRU, countryFinishtUA, countryFinishtRU } = req.body;
            const timeFlight = [timeFlightUA, timeFlightRU].join("//");
            const startPosition = [startPositionUA, startPositionRU].join("//");
            const finishPosition = [finishPositionUA, finishPositionRU].join("//");
            const streetStartPosition = [streetStartPositionUA, streetStartPositionRU].join("//");
            const streetFinishPosition = [streetFinishPositionUA, streetFinishPositionRU].join("//");
            const description = [descriptionUA, descriptionRU].join("/*/");
            const countryStart = [countryStartUA, countryStartRU].join("//");
            const countryFinish = [countryFinishtUA, countryFinishtRU].join("//");
            let { flagStartImg, flagFinishImg } = req.files;
            let flight;

            if (flagStartImg != null && flagStartImg != undefined) {
                const nameImgStart = uuid.v4() + ".jpg";
                const nameImgFinish = uuid.v4() + ".jpg";
                flagStartImg.mv(path.resolve(__dirname, '..', 'static', nameImgStart));
                flagFinishImg.mv(path.resolve(__dirname, '..', 'static', nameImgFinish));

                flight = await Flight.create({
                    price: price,
                    childPrice: childPrice,
                    flagStart: nameImgStart,
                    flagFinish: nameImgFinish,
                    startPosition: startPosition,
                    finishPosition: finishPosition,
                    streetStartPosition: streetStartPosition,
                    streetFinishPosition: streetFinishPosition,
                    startDate: startDate,
                    finishDate: finishDate,
                    startTime: startTime,
                    finishTime: finishTime,
                    timeFlight: timeFlight,
                    countFreePlace: countFreePlace,
                    description: description,
                    map: map,
                    countryStart: countryStart,
                    countryFinish: countryFinish
                })
            }
            else {
                flight = await Flight.create({
                    price: price,
                    childPrice: childPrice,
                    startPosition: startPosition,
                    finishPosition: finishPosition,
                    streetStartPosition: streetStartPosition,
                    streetFinishPosition: streetFinishPosition,
                    startDate: startDate,
                    finishDate: finishDate,
                    startTime: startTime,
                    finishTime: finishTime,
                    timeFlight: timeFlight,
                    countFreePlace: countFreePlace,
                    description: description,
                    map: map,
                    countryStart: countryStart,
                    countryFinish: countryFinish
                })
            }
            const params = await ParamsFlight.create({
                isWifi: isWifi, isWC: isWC, is220V: is220V,
                isMultimedia: isMultimedia, isAirConditioning: isAirConditioning, flightId: flight.id
            });
            const scheduleBus = await ScheduleBus.create({
                scheduleWith: "12.08.2022", scheduleTo: "25.08.2022", monday: "Пн",
                tuesday: "Вт", wednesday: "Ср", thursday: "Чт", friday: "Пт", suturday: "Cб", sunday: "Нд//Вс", flightId: flight.id
            });

            for (let i = 0; i < 31; i++) {
                const scheduleBusStatus = await ScheduleBusStatus.create({ scheduleBusId: scheduleBus.id, flightId: flight.id })
            }

            return res.json({ res: flight, status: 200 });

        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }

    async getSortFlights(req, res, next) {
        try {
            let { inOneDirection, inTwoDirections, startPosition, finishPosition, startDate, finishDate, countFreePlace, limit, page } = req.query
            countFreePlace = parseInt(countFreePlace);
            console.log('startPosition', startPosition)
            console.log('finishPosition', finishPosition)
            console.log('startDate', startDate)
            console.log('finishDate', finishDate)
            console.log('ONE', inOneDirection)
            console.log('TWO', inTwoDirections)
            if (limit === undefined) {
                limit = 5
            }

            if (page === undefined) {
                page = 1
            }
            let offset = page * limit - limit
            let arrFlights = {};// = { count: 0, rows: [] }

            if (inOneDirection == 'true') {
                if (!startPosition && !finishPosition && !startDate) {
                    arrFlights = await Flight.findAndCountAll({
                        where: {
                            countFreePlace: { [Op.gte]: countFreePlace },
                            countFreePlace: { [Op.gte]: countFreePlace }
                        },
                        limit: Number(limit), offset: Number(offset), order: [['id', 'DESC']]
                    })

                } else if (startPosition && !finishPosition && !startDate) {
                    const regStartPosition = `(^${startPosition})|(\/\/${startPosition}$)`;
                    arrFlights = await Flight.findAndCountAll({ where: { startPosition: { [Op.regexp]: regStartPosition }, countFreePlace: { [Op.gte]: countFreePlace } }, limit: Number(limit), offset: Number(offset), order: [['id', 'DESC']] })

                } else if (startPosition && finishPosition && !startDate) {
                    const regStartPosition = `(^${startPosition})|(\/\/${startPosition}$)`;
                    const regFinishPosition = `(^${finishPosition})|(\/\/${finishPosition}$)`;
                    arrFlights = await Flight.findAndCountAll({ where: { startPosition: { [Op.regexp]: regStartPosition }, finishPosition: { [Op.regexp]: regFinishPosition }, countFreePlace: { [Op.gte]: countFreePlace } }, limit: Number(limit), offset: Number(offset), order: [['id', 'DESC']] })

                } else if (startPosition && finishPosition && startDate && !finishDate) {
                    const regStartPosition = `(^${startPosition})|(\/\/${startPosition}$)`;
                    const regFinishPosition = `(^${finishPosition})|(\/\/${finishPosition}$)`;
                    arrFlights = await Flight.findAndCountAll({
                        where: {
                            startPosition: { [Op.regexp]: regStartPosition }, finishPosition: { [Op.regexp]: regFinishPosition },
                            startDate: startDate, countFreePlace: { [Op.gte]: countFreePlace }
                        },
                        limit: Number(limit), offset: Number(offset), order: [['id', 'DESC']]
                    })
                } else if (startDate && !startPosition && !finishPosition) {
                    arrFlights = await Flight.findAndCountAll({ where: { startDate: startDate, countFreePlace: { [Op.gte]: countFreePlace } }, limit: Number(limit), offset: Number(offset), order: [['id', 'DESC']] })

                } else if (startDate && startPosition && !finishPosition) {
                    const regStartPosition = `(^${startPosition})|(\/\/${startPosition}$)`;
                    const regFinishPosition = `(^${finishPosition})|(\/\/${finishPosition}$)`;
                    arrFlights = await Flight.findAndCountAll({
                        where: {
                            startDate: startDate,
                            startPosition: { [Op.regexp]: regStartPosition },
                            finishPosition: { [Op.regexp]: regFinishPosition },
                            countFreePlace: { [Op.gte]: countFreePlace }
                        },
                        limit: Number(limit), offset: Number(offset), order: [['id', 'DESC']]
                    })
                }

            } else if (inTwoDirections == 'true') {
                if (!startPosition && !finishPosition && !startDate) {
                    arrFlights = await Flight.findAndCountAll({
                        where: {
                            countFreePlace: { [Op.gte]: countFreePlace },
                            countFreePlace: { [Op.gte]: countFreePlace }
                        },
                        limit: Number(limit), offset: Number(offset), order: [['id', 'DESC']]
                    })
                } else if (startPosition && !finishPosition && !startDate) {
                    const regStartPosition = `(^${startPosition})|(\/\/${startPosition}$)`;
                    arrFlights = await Flight.findAndCountAll({ where: { startPosition: { [Op.regexp]: regStartPosition }, countFreePlace: { [Op.gte]: countFreePlace } }, limit: Number(limit), offset: Number(offset), order: [['id', 'DESC']] })
                    const backArrFlights = await Flight.findAndCountAll({ where: { finishPosition: { [Op.regexp]: regStartPosition }, countFreePlace: { [Op.gte]: countFreePlace } }, limit: Number(limit), offset: Number(offset), order: [['id', 'DESC']] })
                    arrFlights.count = arrFlights.count + backArrFlights.count
                    for (let i = 0; i < backArrFlights.rows.length; i++) {
                        arrFlights.rows.push(backArrFlights.rows[i])
                    }
                } else if (startPosition && finishPosition && !startDate) {
                    const regStartPosition = `(^${startPosition})|(\/\/${startPosition}$)`;
                    const regFinishPosition = `(^${finishPosition})|(\/\/${finishPosition}$)`;
                    arrFlights = await Flight.findAndCountAll({ where: { startPosition: { [Op.regexp]: regStartPosition }, finishPosition: { [Op.regexp]: regFinishPosition }, countFreePlace: { [Op.gte]: countFreePlace } }, limit: Number(limit), offset: Number(offset), order: [['id', 'DESC']] })
                    const backArrFlights = await Flight.findAndCountAll({ where: { startPosition: { [Op.regexp]: regFinishPosition }, finishPosition: { [Op.regexp]: regStartPosition }, countFreePlace: { [Op.gte]: countFreePlace } }, limit: Number(limit), offset: Number(offset), order: [['id', 'DESC']] })
                    arrFlights.count = arrFlights.count + backArrFlights.count
                    for (let i = 0; i < backArrFlights.rows.length; i++) {
                        arrFlights.rows.push(backArrFlights.rows[i])
                    }
                } else if (startPosition && finishPosition && startDate && !finishDate) {
                    const regStartPosition = `(^${startPosition})|(\/\/${startPosition}$)`;
                    const regFinishPosition = `(^${finishPosition})|(\/\/${finishPosition}$)`;
                    arrFlights = await Flight.findAndCountAll({
                        where: {
                            startPosition: { [Op.regexp]: regStartPosition }, finishPosition: { [Op.regexp]: regFinishPosition },
                            startDate: startDate, countFreePlace: { [Op.gte]: countFreePlace }
                        },
                        limit: Number(limit), offset: Number(offset), order: [['id', 'DESC']]
                    })
                    const backArrFlights = await Flight.findAndCountAll({
                        where: {
                            startPosition: { [Op.regexp]: regFinishPosition }, finishPosition: { [Op.regexp]: regStartPosition },
                            startDate: startDate, countFreePlace: { [Op.gte]: countFreePlace }
                        },
                        limit: Number(limit), offset: Number(offset), order: [['id', 'DESC']]
                    })
                    arrFlights.count = arrFlights.count + backArrFlights.count
                    for (let i = 0; i < backArrFlights.rows.length; i++) {
                        arrFlights.rows.push(backArrFlights.rows[i])
                    }
                } else if (startPosition && finishPosition && startDate && finishDate) {
                    const regStartPosition = `(^${startPosition})|(\/\/${startPosition}$)`;
                    const regFinishPosition = `(^${finishPosition})|(\/\/${finishPosition}$)`;
                    arrFlights = await Flight.findAndCountAll({
                        where: {
                            startPosition: { [Op.regexp]: regStartPosition }, finishPosition: { [Op.regexp]: regFinishPosition },
                            startDate: startDate, countFreePlace: { [Op.gte]: countFreePlace }
                        },
                        limit: Number(limit), offset: Number(offset), order: [['id', 'DESC']]
                    })
                    const backArrFlights = await Flight.findAndCountAll({
                        where: {
                            startPosition: { [Op.regexp]: regFinishPosition }, finishPosition: { [Op.regexp]: regStartPosition },
                            startDate: finishDate, countFreePlace: { [Op.gte]: countFreePlace }
                        },
                        limit: Number(limit), offset: Number(offset), order: [['id', 'DESC']]
                    })
                    arrFlights.count = arrFlights.count + backArrFlights.count
                    for (let i = 0; i < backArrFlights.rows.length; i++) {
                        arrFlights.rows.push(backArrFlights.rows[i])
                    }
                }
            }

            for (let i = 0; i < arrFlights.rows.length; i++) {
                arrFlights.rows[i].startPosition = arrFlights.rows[i].startPosition.split("//");
                arrFlights.rows[i].finishPosition = arrFlights.rows[i].finishPosition.split("//");
                arrFlights.rows[i].streetStartPosition = arrFlights.rows[i].streetStartPosition.split("//");
                arrFlights.rows[i].streetFinishPosition = arrFlights.rows[i].streetFinishPosition.split("//");
                arrFlights.rows[i].description = arrFlights.rows[i].description.split("//")
            }
            return res.json({ status: 200, res: arrFlights })
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }

    async getFlight(req, res, next) {
        try {
            const { id } = req.params
            let flight = await Flight.findOne({ where: { id: parseInt(id) }, include: [{ as: 'params', model: ParamsFlight }, { as: 'schefule', model: ScheduleBus }] });
            flight.startPosition = flight.startPosition.split("//");
            flight.finishPosition = flight.finishPosition.split("//");
            flight.streetStartPosition = flight.streetStartPosition.split("//");
            flight.streetFinishPosition = flight.streetFinishPosition.split("//");
            flight.description = flight.description.split("/*/");
            flight.schefule[0].sunday = flight.schefule[0].sunday.split("//");
            flight.schefule[0].scheduleTo = flight.schefule[0].scheduleTo.split('//')
            flight.schefule[0].scheduleWith = flight.schefule[0].scheduleWith.split('//')
            let status = await ScheduleBusStatus.findAll({ where: { scheduleBusId: flight.schefule[0].id } });

            return res.json({ status: 200, res: { flight, status } });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }

    async deleteFlight(req, res, next) {
        try {
            const { id } = req.params

            const flight = await Flight.findOne({ where: { id } })

            await ParamsFlight.destroy({ where: { flightId: id } })

            await ScheduleBus.destroy({ where: { flightId: id } })

            await ScheduleBusStatus.destroy({ where: { flightId: id } })

            await Flight.destroy({ where: { id } })

            return res.json({ status: 200, res: flight })
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }

    async search(req, resp, next) {
        try {
            let { language, value, isStartPosition } = req.query;
            isStartPosition = isStartPosition == 'true' ? true : false;
            const reg = `${value}`;
            let noSortArray;
            if (isStartPosition) {
                noSortArray = await Flight.findAll({ attributes: ['startPosition'], where: { startPosition: { [Op.regexp]: reg } } });
            } else {
                noSortArray = await Flight.findAll({ attributes: ['finishPosition'], where: { finishPosition: { [Op.regexp]: reg } } });
            }
            for (let i = 0; i < noSortArray.length; i++) {
                if (isStartPosition) noSortArray[i].startPosition = noSortArray[i].startPosition.split("//")[language];
                else noSortArray[i].finishPosition = noSortArray[i].finishPosition.split("//")[language];
            }
            let res = [];
            const isElemUnique = (idx, array) => {
                for (let i = 0; i < idx; i++) {
                    if (isStartPosition && array[i].startPosition === array[idx].startPosition) return false
                    if (!isStartPosition && array[i].finishPosition === array[idx].finishPosition) return false
                }
                return true;
            }
            for (let i = 0; i < noSortArray.length; i++) {
                if (isElemUnique(i, noSortArray)) {
                    if (isStartPosition) {
                        res.push({ title: noSortArray[i].startPosition });
                    } else res.push({ title: noSortArray[i].finishPosition });
                }
            }
            if (res.length > 10) res.splice(10, res.length);
            return resp.json({ status: 200, res });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }

    async updateFlight(req, res, next) {
        try {
            let { id, price, maps, startPosition, finishPosition, startSreerPosition, finishStreetPosition, startDate, finishDate, startTime, finishTime, countFreePlace } = req.body
            await Flight.update({
                startPosition: startPosition,
                finishPosition: finishPosition,
                startStreerPosition: startSreerPosition,
                finishStreetPosition: finishStreetPosition,
                startDate: startDate,
                finishDate: finishDate,
                startTime: startTime,
                finishTime: finishTime,
                countFreePlace: countFreePlace,
                price: price,
                map: maps
            }, { where: { id: id } })
            return res.json({ status: 200 })

        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }

    async statusFlight(req, res, next) {
        try {
            const { id } = req.params
            let { currentFlight, limit, page } = req.body

            if (limit === undefined) {
                limit = 3
            }

            if (page === undefined) {
                page = 1
            }
            let offset = page * limit - limit
            let arrFlights = {};// = { count: 0, rows: [] }

            Flight.update({ currentFlight: currentFlight }, { where: { id: id } })

            arrFlights = await Flight.findAndCountAll({ limit: Number(limit), offset: Number(offset), order: [['id', 'DESC']] })

            for (let i = 0; i < arrFlights.rows.length; i++) {
                arrFlights.rows[i].startPosition = arrFlights.rows[i].startPosition.split("//");
                arrFlights.rows[i].finishPosition = arrFlights.rows[i].finishPosition.split("//");
                arrFlights.rows[i].streetStartPosition = arrFlights.rows[i].streetStartPosition.split("//");
                arrFlights.rows[i].streetFinishPosition = arrFlights.rows[i].streetFinishPosition.split("//");
                arrFlights.rows[i].description = arrFlights.rows[i].description.split("//")
            }

            return res.json(({ status: 200, res: arrFlights }))
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }

    async getRelinkBlocks(req, resp, next) {
        try {
            const getCityForRegular = (value) => {
                let res = value.split("//");
                res = res.join("\\/\\/");
                console.log(res);
                return res;
            }
            const { id } = req.params;
            let { startPosition, finishPosition } = await Flight.findOne({ attributes: ['startPosition', 'finishPosition'], where: { id } });
            let resStartPosition = [];
            let withStartPosition = [finishPosition];
            for (let i = 0; i < 8; i++) {
                let regStartPosition = "^(?!^(";
                for (let i = 0; i < withStartPosition.length; i++) {
                    if (i == 0) regStartPosition += getCityForRegular(withStartPosition[i]);
                    else regStartPosition += "|" + getCityForRegular(withStartPosition[i]);
                }
                regStartPosition += ")$).+";
                let f = await Flight.findOne({
                    where: {
                        startPosition,
                        finishPosition: { [Op.regexp]: regStartPosition },
                        countFreePlace: { [Op.gte]: 1 }
                    }
                })
                if (f != null) {
                    withStartPosition.push(f.finishPosition);
                    resStartPosition.push({ finishPosition: f.finishPosition, id: f.id });
                } else break
            }
            let resFinishPosition = [];
            let withFinishPosition = [startPosition];
            for (let i = 0; i < 8; i++) {
                let reg = "^(?!^(";
                for (let i = 0; i < withFinishPosition.length; i++) {
                    if (i == 0) reg += getCityForRegular(withFinishPosition[i]);
                    else reg += "|" + getCityForRegular(withFinishPosition[i]);
                }
                reg += ")$).+";
                let res = await Flight.findOne({
                    where: {
                        finishPosition,
                        startPosition: { [Op.regexp]: reg },
                        countFreePlace: { [Op.gte]: 1 }
                    }
                })
                if (res != null) {
                    withFinishPosition.push(res.startPosition);
                    resFinishPosition.push({ startPosition: res.startPosition, id: res.id });
                } else break;
            }
            return resp.json({ status: 200, res: { startPosition: resStartPosition, finishPosition: resFinishPosition } });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }

    async patchChildPrice(req, res, next) {
        try {
            const { childPrice } = req.body
            const { id } = req.params

            await Flight.update({ childPrice: childPrice }, { where: { id: id } })

            return res.json({ status: 200 })
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
}

const flightsController = new FlightsController();
module.exports = flightsController;
