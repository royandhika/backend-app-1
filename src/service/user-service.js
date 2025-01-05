import { prismaClient } from "../app/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { registerValidation, updateValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";

const register = async (request) => {
    const registerRequest = validate(registerValidation, request);

    const userExist = await prismaClient.user.findFirst({
        where: {
            OR: [
                { username: registerRequest.username },
                { email: registerRequest.email }
            ]
        }
    });

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);
    // registerRequest.id = uuid().toString();
    // registerRequest.profile = {
    //     create: {
    //         username: registerRequest.username,
    //         phone: registerRequest.phone
    //     }
    // }

    const register = {
        id: uuid().toString(),
        username: registerRequest.username,
        email: registerRequest.email,
        password: registerRequest.password,
        profile: {
            create: {
                username: registerRequest.username,
                phone: registerRequest.phone,
                role: "user"
            }
        }
    };

    if (userExist) {
        throw new ResponseError(400, "Username or email already exist");
    } else {
        return prismaClient.user.create({
            data: register,
            select: {
                id: true,
                username: true
            }
        });
    }
};

const get = async (request) => {
    const getRequest = await prismaClient.profile.findFirst({
        where: {
            user_id: request.user_id,
        },
        select: {
            username: true,
            avatar: true,
            firstname: true,
            lastname: true,
            birthdate: true,
            gender: true,
            phone: true,
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

const update = async (request) => {
    const updateRequest = validate(updateValidation, request);

    return prismaClient.profile.update({
        where: {
            user_id: request.user_id,
        },
        data: updateRequest,
        select: {
            username: true,
            avatar: true,
            firstname: true,
            lastname: true,
            birthdate: true,
            gender: true,
            phone: true,
            city: true,
            region: true,
            country: true,
            role: true,
        }
    });        
}

export default {
    register,
    get,
    update
}