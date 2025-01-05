import userService from "../service/user-service.js";

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);

        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

// Auth required
const get = async (req, res, next) => {
    try {
        const result = await userService.get(req.body);

        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

const update = async (req, res, next) => {
    try {
        const result = await userService.update(req.body);

        res.status(200).json({
            data: result, 
        });
    } catch (e) {
        next(e);
    }
};

export default {
    register,
    get,
    update
}