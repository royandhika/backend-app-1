import propertyService from "../service/property-service.js";

const post = async (req, res, next) => {
    try {
        const result = await propertyService.post(req.body);

        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

const get = async (req, res, next) => {
    try {
        const result = await propertyService.get(req.params.propertyId);

        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

const getAll = async (req, res, next) => {
    try {
        const { result, count, page, totalPages } = await propertyService.getAll(req.query);

        res.status(200).json({
            meta: {
                page: page,
                total_pages: totalPages,
                count: count
            },
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const result = await propertyService.update(req.params.propertyId, req.body);

        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

const remove = async (req, res, next) => {
    try {
        const result = await propertyService.remove(req.params.propertyId, req.body);

        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

export default {
    post,
    get,
    getAll,
    update,
    remove
}