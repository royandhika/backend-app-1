import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { signToken, verifyToken } from "../util/token.js";
import { loginValidation } from "../validation/session-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";

const login = async (body) => {
    const loginRequest = validate(loginValidation, body);

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
    // Selipkan access_token ke body response
    result.access_token = accessToken;

    return result;
};

const refresh = async (cookie, body) => {
    // Ambil refreshToken di cookie, kalau gaada, ambil refresh_token di body request
    const user = cookie.refreshToken ? await verifyToken(cookie.refreshToken) : await verifyToken(body.refresh_token);
    const refreshToken = cookie.refreshToken ? cookie.refreshToken : body.refresh_token;
    if (!user) {
        throw new ResponseError(401, "Unauthorized");
    };

    const isValidRefreshToken = await prismaClient.session.findFirst({
        where: {
            user_id: user.id,
            refresh_token: refreshToken,
            is_active: 1,
        },
        select: {
            user_id: true,
        }
    });
    if (!isValidRefreshToken) {
        throw new ResponseError(401, "Unauthorized");
    };

    const newAccessToken = await signToken(user, "access");
    const newRefreshToken = await signToken(user, "refresh");

    // Disable refresh token yang dipakai barusan
    await prismaClient.session.updateMany({
        where: {
            refresh_token: refreshToken,
        },
        data: {
            is_active: 0,
        }
    });
    // Buat refresh token baru untuk gantikan yang lama
    const result = await prismaClient.session.create({
        data: {
            user_id: user.id,
            refresh_token: newRefreshToken,
            user_agent: body.userAgent,
            ip_address: body.ipAddress,
            is_active: 1,
        },
        select: {
            user_id: true,
            refresh_token: true
        }
    });
    // Selipkan access_token ke body response
    result.access_token = newAccessToken;

    return result;
};

// Auth middleware required
const logout = async (cookie, body) => {
    const user = cookie.refreshToken ? await verifyToken(cookie.refreshToken) : await verifyToken(body.refresh_token);
    const refreshToken = cookie.refreshToken ? cookie.refreshToken : body.refresh_token;
    if (!user) {
        throw new ResponseError(401, "Unauthorized");
    };

    // Disable refresh token yang sekarang dipakai
    return prismaClient.session.updateMany({
        where: {
            refresh_token: refreshToken
        },
        data: {
            is_active: 0
        }
    });
};

const logoutAll = async (body) => {
    // Disable semua refresh token (all device all ip)
    return prismaClient.session.updateMany({
        where: {
            user_id: body.user_id,
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