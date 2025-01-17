import sessionService from "../service/session-service.js";

const login = async (req, res, next) => {
    try {
        req.body.userAgent = req.headers['user-agent'];
        req.body.ipAddress = req.ip;
        console.log(req.ip);
        console.log(req.connection.remoteAddress);
        console.log(req.headers['x-forwarded-for']?.split(',')[0]);
        const result = await sessionService.login(req.body);

        res.cookie('refreshToken', result.refresh_token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            secure: true,
            sameSite: "Strict",
            maxAge: 48 * 60 * 60 * 1000, // Expired 48 jam di cookie
        });

        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

const refresh = async (req, res, next) => {
    try {
        req.body.userAgent = req.headers['user-agent']
        req.body.ipAddress = req.ip
        const result = await sessionService.refresh(req.cookies, req.body);

        res.cookie('refreshToken', result.refresh_token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            secure: true,
            sameSite: "Strict",
            maxAge: 48 * 60 * 60 * 1000, // Expired 48 jam di cookie
        });

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

// Auth middleware required
const logout = async (req, res, next) => {
    try {
        const result = await sessionService.logout(req.cookies, req.body);

        res.clearCookie("refreshToken");
        // clear accessToken di frontend
        res.status(200).json({
            data: result,
            message: "Logout success"
        });
    } catch (e) {
        next(e);
    }
};

const logoutAll = async (req, res, next) => {
    try {
        const result = await sessionService.logoutAll(req.body);

        res.clearCookie("refreshToken");
        // clear accessToken di frontend
        res.status(200).json({
            data: result,
            message: "Logout success"
        });
    } catch (e) {
        next(e);
    }
};

export default {
    login,
    refresh,
    logout,
    logoutAll
}