const ErrorApi = require("../error/ErrorApi");
const { FAQ } = require("../models/models");

class FAQController {
    static Get = async (req, resp, next) => {
        try {
            let { page, limit } = req.query;
            page = page || 1;
            limit = limit || 10;
            const offset = page * limit - limit;
            let res = await FAQ.findAndCountAll({ limit: parseInt(limit), offset: parseInt(offset) });
            for (let i = 0; i < res.rows.length; i++) {
                res.rows[i].name = await res.rows[i].name.split("//");
                res.rows[i].description = await res.rows[i].description.split("//");
            }
            return resp.json({ status: 200, page, limit, res: res.rows, count: res.count });

        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static Add = async (req, resp, next) => {
        try {
            const { name, description } = req.body;
            const res = await FAQ.create({ name, description });
            resp.json({ status: 200, res });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static GetNovetly = async (req, resp, next) => {
        try {
            let { limit } = req.query;
            limit = limit || 5;
            let res = await FAQ.findAll({limit: parseInt(limit), order: [['id', 'DESC']] })

            for (let i = 0; i < res.length; i++) {
                res[i].name = res[i].name.split("//");
                res[i].description=res[i].description.split("//");
            }

            return resp.json({ status: 200, res });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static GetSelect = async (req, resp, next) => {
        try {
            const { id } = req.query;
            let res = await FAQ.findOne({ where: { id } });
            if (res == null) {
                return resp.json({ status: 200, res: null });
            }
            res.name = res.name.split("//");
            res.description = res.description.split("//");
            resp.json({ status: 200, res });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static deleteFaq = async (req, resp, next) => {
        try {
            const { id } = req.params;
            await FAQ.destroy({ where: { id } });
            let res = await FAQ.findAll()
            for (let i = 0; i < res.length; i++) {
                res.rows[i].name = await res.rows[i].name.split("//");
                res.rows[i].description = await res.rows[i].description.split("//");
            }
            return resp.json({ status: 200, res });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
}

module.exports = FAQController;