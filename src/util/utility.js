import "dotenv/config";
import jwt from "jsonwebtoken";
const jwtKey = process.env.JWT_SECRET_KEY;
import { ResponseError } from "../error/response-error.js";

const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
    });
    if (result.error) {
        throw new ResponseError(400, result.error.message);
    } else {
        return result.value;
    }
};

const signToken = async (user, type) => {
    const expiresIn =
        type === "refresh" ? "48h" : type === "access" ? "5m" : undefined;

    const token = jwt.sign({ id: user.id, username: user.username }, jwtKey, {
        expiresIn: expiresIn,
    });

    return token;
};

const verifyToken = async (token) => {
    try {
        const user = jwt.verify(token, jwtKey);
        return user;
    } catch {
        const user = undefined;
        return user;
    }
};

export { validate, signToken, verifyToken };
