import { prismaClient } from "../app/database.js"

const post = async (body) => {
    const { user_id, username, ...requestBody } = body;

    return prismaClient.property.create({
        data: {
            ...requestBody,
            host_id: user_id
        },
        select: {
            id: true,
            host_id: true,
            title: true,
        }
    });
};

const get = async (params) => {
    return prismaClient.property.findFirst({
        where: {
            id: params
        }
    });
};

const getAll = async (query) => {
    const {
        city,
        sort = "price",
        order = "desc",
        limit = "10",
        page = "1"
    } = query;

    const where = {};
    if (city) {
        where.city = city;
    };

    const orderBy = {};
    orderBy[sort] = order === "asc" ? "asc" : "desc";

    const limitQuery = parseInt(limit) || 10;
    const pageQuery = parseInt(page) || 1;
    const skip = (pageQuery - 1) * limitQuery;

    const data = await prismaClient.property.findMany({
        where,
        orderBy,
        skip,
        take: limitQuery,
    });

    const totalProperty = await prismaClient.property.count({ where });
    const totalPages = Math.ceil(totalProperty / limitQuery);

    return {
        result: data,
        count: totalProperty,
        page: pageQuery,
        totalPages: totalPages
    };
};

const update = async (params, body) => {
    const { user_id, username, ...requestBody } = body;

    return prismaClient.property.update({
        where: {
            id: params,
            host_id: user_id,
        },
        data: requestBody
    });
};

const remove = async (params, body) => {
    return prismaClient.property.delete({
        where: {
            id: params,
            host_id: body.user_id
        }
    });
}

export default {
    post,
    get,
    getAll,
    update,
    remove
}