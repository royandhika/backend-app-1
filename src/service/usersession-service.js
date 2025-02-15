import { prismaClient } from "../app/database.js";
import { validate, signToken, verifyToken } from "../util/utility.js";
import { loginValidation } from "../validation/session-validation.js";
import bcrypt from "bcrypt";
import { ResponseError } from "../error/response-error.js";

const login = async (body) => {
    const loginRequest = validate(loginValidation, body);

    const userExist = await prismaClient.user.findFirst({
        where: {
            username: loginRequest.username,
        },
        select: {
            id: true,
            username: true,
            password: true,
        },
    });
    if (!userExist) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const isValidPassword = await bcrypt.compare(
        loginRequest.password,
        userExist.password
    );
    if (!isValidPassword) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const refreshToken = await signToken(userExist, "refresh");
    const accessToken = await signToken(userExist, "access");

    const result = await prismaClient.userSession.create({
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
            refresh_token: true,
        },
    });
    // Selipkan access_token ke body response
    result.access_token = accessToken;

    return result;
};

const refresh = async (cookie, body) => {
    // Ambil refreshToken di cookie, kalau gaada, ambil refresh_token di body request
    const requestUser = cookie.refresh_token
        ? await verifyToken(cookie.refresh_token)
        : await verifyToken(body.refresh_token);
    const requestRefreshToken = cookie.refresh_token
        ? cookie.refresh_token
        : body.refresh_token;
    // Kalau verifyToken gagal lempar error
    if (!requestUser) {
        throw new ResponseError(401, "Refresh token not valid");
    }

    const isValidRefreshToken = await prismaClient.userSession.findFirst({
        where: {
            user_id: requestUser.id,
            refresh_token: requestRefreshToken,
            is_active: 1,
        },
        select: {
            user_id: true,
        },
    });
    // Kalau di db invalid lempar error
    if (!isValidRefreshToken) {
        throw new ResponseError(401, "Refresh token not valid");
    }

    const newAccessToken = await signToken(requestUser, "access");
    const newRefreshToken = await signToken(requestUser, "refresh");

    // Disable refresh token yang dipakai barusan
    await prismaClient.userSession.updateMany({
        where: {
            refresh_token: requestRefreshToken,
        },
        data: {
            is_active: 0,
        },
    });
    // Buat refresh token baru untuk gantikan yang lama
    const result = await prismaClient.userSession.create({
        data: {
            user_id: requestUser.id,
            refresh_token: newRefreshToken,
            user_agent: body.userAgent,
            ip_address: body.ipAddress,
            is_active: 1,
        },
        select: {
            user_id: true,
            refresh_token: true,
        },
    });
    // Selipkan access_token ke body response
    result.access_token = newAccessToken;

    return result;
};

const logout = async (cookie, body) => {
    const requestUser = cookie.refresh_token
        ? await verifyToken(cookie.refresh_token)
        : await verifyToken(body.refresh_token);
    const requestRefreshToken = cookie.refresh_token
        ? cookie.refresh_token
        : body.refresh_token;
    if (!requestUser) {
        throw new ResponseError(401, "Unauthorized");
    }

    // Disable refresh token yang sekarang dipakai
    return prismaClient.userSession.updateMany({
        where: {
            refresh_token: requestRefreshToken,
        },
        data: {
            is_active: 0,
        },
    });
};

const logoutAll = async (body) => {
    // Disable semua refresh token (all device all ip)
    return prismaClient.userSession.updateMany({
        where: {
            user_id: body.user_id,
            is_active: 1,
        },
        data: {
            is_active: 0,
        },
    });
};

export default {
    login,
    refresh,
    logout,
    logoutAll,
};
