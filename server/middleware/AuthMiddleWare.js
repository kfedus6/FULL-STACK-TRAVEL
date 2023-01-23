const jwt = require("jsonwebtoken");
const ErrorApi = require("../error/ErrorApi");

module.exports = async (req, resp, next) => {
    try {
        console.log(req.headers);
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return resp.status(200).json({ status: 400, message: "not authorization" });
        }
        const result = await jwt.verify(token, process.env.SECRET_KEY);
        if (!result) {
            return resp.status(200).json({ status: 400, message: "token is not true" });
        }
        req.user = result
        next()
    }
    catch (err) {
        return next(ErrorApi.noAuth(err.message));
    }
}