import orderService from "../service/order-service.js";

const postOrderItem = async (req, res, next) => {
    try {
        const result = await orderService.postOrderItem(req.body);

        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

export default {
    postOrderItem
}