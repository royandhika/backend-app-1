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

// Auth middleware required
const getProfile = async (req, res, next) => {
    try {
        const result = await userService.getProfile(req.body);

        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const result = await userService.updateProfile(req.body);

        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

const postAddress = async (req, res, next) => {
    try {
        const result = await userService.postAddress(req.body);

        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

const getAddress = async (req, res, next) => {
    try {
        const result = await userService.getAddress(req.body);

        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

const getAllProperty = async (req, res, next) => {
    try {
        const { result, count, page, totalPages } =
            await userService.getAllProperty(req.query, req.body);

        res.status(200).json({
            meta: {
                page: page,
                total_pages: totalPages,
                count: count,
            },
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

const getProperty = async (req, res, next) => {
    try {
        const result = await userService.getProperty(
            req.params.propertyId,
            req.body
        );

        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

export default {
    register,
    getProfile,
    updateProfile,
    postAddress,
    getAddress,
    getAllProperty,
    getProperty,
};
