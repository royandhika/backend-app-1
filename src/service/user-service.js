import { prismaClient } from "../app/database.js";
import bcrypt from "bcrypt";
import { registerValidation, updateValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";

const register = async (body) => {
    const registerRequest = validate(registerValidation, body);

    const usernameExist = await prismaClient.user.findFirst({
        where: {
            username: registerRequest.username
        }
    });
    const emailExist = await prismaClient.user.findFirst({
        where: {
            email: registerRequest.email
        }
    });
    const phoneExist = await prismaClient.user.findFirst({
        where: {
            phone: registerRequest.phone
        }
    });

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    if (usernameExist) {
        throw new ResponseError(400, "Username already exist");
    } else if (emailExist) {
        throw new ResponseError(400, "Email already exist");
    } else if (phoneExist) {
        throw new ResponseError(400, "Phone already exist");
    } else {
        return prismaClient.user.create({
            data: {
                ...registerRequest,
                profile: {
                    create: {}
                }
            },
            select: {
                id: true,
                username: true,
            },
        });
    }
};

// Auth middleware required
const getProfile = async (body) => {
    const getRequest = await prismaClient.profile.findFirst({
        where: {
            user_id: body.user_id,
        },
        select: {
            avatar: true,
            firstname: true,
            lastname: true,
            birthdate: true,
            gender: true,
            city: true,
            region: true,
            country: true,
            role: true,
        }
    });

    if (!getRequest) {
        throw new ResponseError(404, "User not found")
    }

    return getRequest;
};

const updateProfile = async (body) => {
    const updateRequest = validate(updateValidation, body);
    const { user_id, username, ...data } = updateRequest

    return prismaClient.profile.update({
        where: {
            user_id: user_id,
        },
        data: data,
        select: {
            avatar: true,
            firstname: true,
            lastname: true,
            birthdate: true,
            gender: true,
            city: true,
            region: true,
            country: true,
            role: true,
        }
    });
};

const getAllProperty = async (query, body) => {

    const {
        sort = "created_at",
        order = "desc",
        limit = "10",
        page = "1"
    } = query;

    const orderBy = {};
    orderBy[sort] = order === "asc" ? "asc" : "desc";


    const limitQuery = parseInt(limit) || 10;
    const pageQuery = parseInt(page) || 1;
    const skip = (pageQuery - 1) * limitQuery;

    const data = await prismaClient.property.findMany({
        where: {
            host_id: body.user_id,
        },
        orderBy: orderBy,
        skip: skip,
        take: limitQuery,
    });

    const totalProperty = await prismaClient.property.count({
        where: {
            host_id: body.user_id,
        }
    });
    const totalPages = Math.ceil(totalProperty / limitQuery);

    return {
        result: data,
        count: totalProperty,
        page: pageQuery,
        totalPages: totalPages
    };
};

const getProperty = async (params, body) => {
    return prismaClient.property.findFirst({
        where: {
            id: params,
            host_id: body.user_id
        }
    });
};

export default {
    register,
    getProfile,
    updateProfile,
    getAllProperty,
    getProperty
}