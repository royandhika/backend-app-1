import { verifyToken } from "../util/utility.js";

const authMiddleware = async (req, res, next) => {
    const accessToken = req.headers["authorization"]?.split(" ")[1];
    const validToken = await verifyToken(accessToken);

    if (!validToken) {
        res.status(401)
            .json({
                errors: "Unauthorized",
            })
            .end();
    } else {
        (req.body.user_id = validToken.id), (req.body.username = validToken.username);
        next();
    }
};

export { authMiddleware };
