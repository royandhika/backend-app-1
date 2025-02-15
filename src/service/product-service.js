import { prismaClient } from "../app/database.js";

const postProduct = async (body) => {
    return prismaClient.product.create({
        data: body,
        select: {
            id: true,
            title: true,
        },
    });
};

const getProduct = async (query) => {
    const {
        gender,
        category,
        sort = "created_at",
        order = "desc",
        limit = "10",
        page = "1",
    } = query;

    const where = {};
    if (gender && category) {
        where.gender = gender;
        where.category = category;
    } else if (category) {
        where.category = category;
    } else if (gender) {
        where.gender = category;
    }

    const orderBy = {};
    orderBy[sort] = order === "asc" ? "asc" : "desc";

    const limitQuery = parseInt(limit);
    const pageQuery = parseInt(page);
    const skip = (pageQuery - 1) * limitQuery;

    const data = await prismaClient.product.findMany({
        where,
        orderBy,
        skip,
        take: limitQuery,
        include: {
            productimage: {
                where: { is_thumbnail: 1 },
                select: {
                    url: true,
                },
            },
            productvariant: {
                select: {
                    orderitem: {
                        select: {
                            productreview: {
                                select: {
                                    rating: true,
                                }
                            }
                        }
                    },
                },
            },
        },
    });

    const totalProducts = await prismaClient.product.count({ where });
    const totalPages = Math.ceil(totalProducts / limitQuery);

    return {
        result: data,
        count: totalProducts,
        page: pageQuery,
        totalPages: totalPages,
    };
};

const getProductDetail = async (params) => {
    return prismaClient.product.findFirst({
        where: {
            id: parseInt(params),
        },
        select: {
            title: true,
            description: true,
            base_price: true,
            category: true,
            gender: true,
            tags: true,
            productvariant: {
                select: {
                    size: true,
                    // colour: true,
                    colour: {
                        select: {
                            name: true,
                            hex: true,
                        },
                    },
                    stock: true,
                    reserved_stock: true,
                    price: true,
                    orderitem: {
                        select: {
                            productreview: {
                                select: {
                                    rating: true
                                }
                            }
                        }
                    }
                },
            },
            productimage: {
                select: {
                    url: true,
                    is_thumbnail: true,
                },
            },
            // productreview: true
            // productreview: {
            //     select: {
            //         user_id: true,
            //         rating: true,
            //         comment: true,
            //     },
            // },
        },
    });
};

export default {
    postProduct,
    getProduct,
    getProductDetail,
};
