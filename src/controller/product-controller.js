import productService from "../service/product-service.js";

const postProduct = async (req, res, next) => {
    try {
        const result = await productService.postProduct(req.body);

        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

const getProduct = async (req, res, next) => {
    try {
        const { result, count, page, totalPages } = await productService.getProduct(req.query);

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

const getProductDetail = async (req, res, next) => {
    try {
        const result = await productService.getProductDetail(req.params.productId);

        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

export default {
    postProduct,
    getProduct,
    getProductDetail,
};
