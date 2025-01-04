import { prismaClient } from "../app/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { registerValidation } from "../validation/user-validation.js";
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

}

export default {
    register
}