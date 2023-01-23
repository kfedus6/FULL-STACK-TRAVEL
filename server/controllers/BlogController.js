const ErrorApi = require("../error/ErrorApi");
const { Blog, Novetly, BlogRetaledFlight } = require("../models/models");
const uuid = require("uuid");
const path = require("path");
const { Op } = require("sequelize");

class BlogController {
    static GetAll = async (req, resp, next) => {
        try {
            let { page, limit } = req.query;
            page = page || 1;
            limit = limit || 10;
            const offset = page * limit - limit;;
            let res = await Blog.findAndCountAll({ attributes: ['id', 'name', 'image', 'miniDescription', 'createdAt'], limit: parseInt(limit), offset: parseInt(offset), order: [['id', 'DESC']] });
            for (let i = 0; i < res.rows.length; i++) {
                res.rows[i].name = await res.rows[i].name.split("//");
                res.rows[i].miniDescription = res.rows[i].miniDescription.split("//")
            }
            return resp.json({ status: 200, page, limit, res: res.rows, count: res.count });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static getNovetly = async (req, resp, next) => {
        try {
            let { count } = req.query;
            count = count || 5;
            let res = await Blog.findAll({ attributes: ['id', 'name', 'image', 'miniDescription', 'createdAt'], limit: parseInt(count), order: [['id', 'DESC']] });
            for (let i = 0; i < res.length; i++) {
                res[i].name = await res[i].name.split("//");
                res[i].miniDescription = res[i].miniDescription.split("//")
            }
            return resp.json({ status: 200, res });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static GetWithDescription = async (req, resp, next) => {
        try {
            const { id } = req.query;
            let res = await Blog.findOne({ where: { id } });
            if (res == null) {
                return resp.json({ status: 415, res: null });
            }
            res.name = res.name.split("//");
            res.miniDescription = res.miniDescription.split("//")
            res.description = res.description.split("/*/");
            let blogRetaledFlight = await BlogRetaledFlight.findAll({ where: { blogId: id } });
            for (let i = 0; i < blogRetaledFlight.length; i++) {
                blogRetaledFlight[i].whence = blogRetaledFlight[i].whence.split("//");
                blogRetaledFlight[i].whither = blogRetaledFlight[i].whither.split("//");
            }
            return resp.json({ status: 200, res, blogRetaledFlight });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static Add = async (req, resp, next) => {
        try {
            const { name, descriptionUa, descriptionRu, miniDescription, listFlight } = req.body;
            const description = [descriptionUa, descriptionRu].join("/*/");
            const { image } = req.files;
            const nameImg = uuid.v4() + ".jpg";
            image.mv(path.resolve(__dirname, '..', 'static', nameImg));
            const res = await Blog.create({ image: nameImg, name, description, miniDescription });
            await JSON.parse(listFlight).forEach(x => {
                BlogRetaledFlight.create({ whence: x.whence, whither: x.whither, blogId: res.id });
            });
            return resp.json({ status: 200, res });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static Del = async (req, resp, next) => {
        try {
            const { id } = req.body;
            const res = await Blog.destroy({ where: { id: parseInt(id) } });
            return resp.json({ status: 200, res });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static GetSimilar = async (req, resp, next) => {
        try {
            const { id } = req.query;
            let res = [];
            let limit = 6;
            let count = await Blog.count();
            if (count < limit) {
                let temp = await Blog.findAll({ where: { id: { [Op.ne]: parseInt(id) } } })
                res = [...temp];
            }
            else {
                let tempBefore = await Blog.findAll({
                    where: { id: { [Op.lt]: parseInt(id) } },
                    limit: parseInt(limit / 2), order: [['id', 'DESC']]
                });
                let before = [];
                for (let i = tempBefore.length - 1; i >= 0; i--) {
                    before.push(tempBefore[i]);
                }
                let after = await Blog.findAll({
                    where: { id: { [Op.gt]: parseInt(id) } },
                    limit: parseInt(limit - before.length)
                });
                if (after.length != limit / 2) {
                    let temp = await Blog.findAll({
                        where: { id: { [Op.lt]: parseInt(id) } },
                        limit: parseInt(limit - after.length), order: [['id', 'DESC']]
                    });
                    before = [];
                    for (let i = temp.length - 1; i >= 0; i--) {
                        before.push(temp[i]);
                    }
                }
                res = [...before, ...after];
            }

            for (let i = 0; i < res.length; i++) {
                res[i].name = res[i].name.split("//");
                res[i].description = res[i].description.split("//");
                res[i].miniDescription = res[i].miniDescription.split("//");
            }
            return resp.json({ status: 200, res });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static GetBlogForFlight = async (req, resp, next) => {
        try {
            let { maxCount, finishPosition, startPosition } = req.body;
            let blogRetaledFlight = await BlogRetaledFlight.findAll({
                where: {
                    [Op.or]: [{ whence: startPosition.join('//') }, { whither: startPosition.join('//') },
                    { whence: finishPosition.join('//') }, { whither: finishPosition.join('//') }]
                }
            });
            const res = await Blog.findAll({
                limit: parseInt(maxCount), where: {
                    id: { [Op.or]: [blogRetaledFlight.map(x => x.blogId)] }
                }
            });
            resp.json({ status: 200, res });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
}

module.exports = BlogController;