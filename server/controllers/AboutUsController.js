const ErrorApi = require("../error/ErrorApi");
const { InfoCompany } = require("../models/models");

class AboutUsControllers {
    static Get = async (req, resp, next) => {
        try {
            let res = await InfoCompany.findAll();
            return resp.json({ status: 200, res: res[0] });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static Update = async (req, resp, next) => {
        try {
            const { ua, ru } = req.body;
            const description = [ua, ru].join("//");
            const res = await InfoCompany.update({ description }, { where: { id: 1 } });
            return resp.json({ status: 200, res });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
}

module.exports = AboutUsControllers