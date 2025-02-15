import { prismaClient } from "../app/database.js";

const postOrderItem = async (body) => {
    const { username, user_id, address_id, orderitem } = body;

    const listVariantId = orderitem.map((item) => item.product_variant_id);

    const productPrice = await prismaClient.productVariant.findMany({
        where: {
            id: {
                in: listVariantId,
            },
        },
        select: {
            id: true,
            stock: true,
            reserved_stock: true,
            price: true,
        },
    });

    let orderItemBody = orderitem.map((item) => ({
        ...item,
        price: productPrice.find((itemPrice) => itemPrice.id === item.product_variant_id)?.price || 0,
    }));

    const totalPrice = orderItemBody.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const orderBody = {
        address_id,
        user_id,
        total: totalPrice,
    };

    const result = await prismaClient.order.create({
        data: orderBody,
        select: {
            id: true,
            address_id: true,
            user_id: true,
            status: true,
            total: true,
        },
    });

    orderItemBody = orderItemBody.map((item) => ({
        ...item,
        order_id: result.id,
    }));

    const resultOrderItem = await prismaClient.orderItem.createMany({
        data: orderItemBody,
    })

    return resultOrderItem;
    // console.log(totalPrice);
    // console.log(orderitem);
    // console.log(productPrice);
    // console.log(productPriceQty);
    // console.log(productPrice);

    // const productPrice = await prismaClient.productVariant.findMany({
    //     where: {

    //     }
    // })
    // const result = await prismaClient.$transaction(async (tx) => {
    //     const qOrder = await tx.order.create({
    //         data: {
    //             address_id,
    //             user_id,
    //             total,
    //         },
    //     });

    //     const qOrderItem = orderitem.map((item) => ({
    //         order_id: qOrder.id,
    //         product_variant_id: item.product_variant_id,
    //         quantity: item.quantity,
    //         price: x,
    //     }));
    // });
    // return prismaClient.order.createMany({
    //     data: postRequest,
    //     select: {
    //         id: true,
    //         user_id: true,
    //         address_id: true,
    //         status: true,
    //         total: true,
    //         orderitem: {
    //             select: {
    //                 product_variant_id: true,
    //                 quantity: true,
    //                 price: true,
    //                 // productvariant: {
    //                 //     select: {

    //                 //     }
    //                 // }
    //             },
    //         },
    //     },
    // });
};

export default {
    postOrderItem,
};
