import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { signToken, verifyToken } from "../util/token.js";
import { loginValidation } from "../validation/session-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";

const login = async (request) => {
    const loginRequest = validate(loginValidation, request);

    const userExist = await prismaClient.user.findFirst({
        where: {
            username: loginRequest.username
        },
        select: {
            id: true,
            username: true,
            password: true
        }
    });
    if (!userExist) {
        throw new ResponseError(401, "Username or password wrong");
    };
    
    const isValidPassword = await bcrypt.compare(loginRequest.password, userExist.password);
    if (!isValidPassword) {
        throw new ResponseError(401, "Username or password wrong");
    };

    const refreshToken = await signToken(userExist, "refresh");
    const accessToken = await signToken(userExist, "access");

    const result = await prismaClient.session.create({
        data: {
            user_id: userExist.id,
            refresh_token: refreshToken,
            user_agent: loginRequest.userAgent,
            ip_address: loginRequest.ipAddress,
            is_active: 1,
        },
        select: {
            id: true,
            user_id: true,
            refresh_token: true
        }
    });

    result.access_token = accessToken;

    return result;
};

const refresh = async (request) => {
    const user = request.refreshToken ? await verifyToken(request.refreshToken) : undefined;
    if (!user) {
        throw new ResponseError(401, "Unauthorized");
    };

    const result = await prismaClient.session.findFirst({
        where: {
            refresh_token: request.refreshToken,
            is_active: 1,
        },
        select: {
            user_id: true,
        }
    });
    if (!result) {
        throw new ResponseError(401, "Unauthorized");
    };

    const newAccessToken = await signToken(user, "access");
    result.access_token = newAccessToken;

    return result;
}

const logout = async (request) => {
    // const user = request.refreshToken ? await verifyToken(request.refreshToken) : undefined;

    return prismaClient.session.updateMany({
        where: {
            refresh_token: request.refreshToken
        },
        data: {
            is_active: 0
        }
    });
}

const logoutAll = async (request) => {
    return prismaClient.session.updateMany({
        where: {
            user_id: request.user_id,
            is_active: 1,
        },
        data: {
            is_active: 0
        }
    });
};

export default {
    login,
    refresh,
    logout,
    logoutAll
}