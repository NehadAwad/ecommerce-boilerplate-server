import { Request, Response } from "express";
import { Order } from "../entity/order.entity";
import { Parser } from "json2csv";
import { OrderItem } from "../entity/order-item.entity";

export const Orders =async (req: Request, res: Response) => {
    const take = 15;
    const page = parseInt(req.query.page as string || '1')
    const [data, total] = await Order.findAndCount({
        take,
        skip: (page - 1) * take,
        relations: ['order_items']
    });
    res.send({
        data: data.map((order: Order) => ({
            id: order.id,
            name: order.name,
            email: order.email,
            total: order.total,
            created_at: order.created_at,
            order_items: order.order_items  
        })),
        meta: {
            total,
            page,
            last_page: Math.ceil(total/take)
        }
    });
}

export const Export =async (req:  Request, res: Response) => {
     const parser = new Parser({
        fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity']
     });

     const orders = await Order.find({
        relations: ['order_items']
     });

     const json = [];

     orders.forEach((order: Order) => {
        json.push({
            ID: order.id,
            Name: order.name,
            Email: order.email,
            'Product Title': '',
            Price: '',
            Quantity: '',
        });

        order.order_items.forEach((item: OrderItem) => {
            json.push({
                ID: '',
                Name: '',
                Email: '',
                'Product Title': item.product_title,
                Price: item.price,
                Quantity: item.quantity,
            })
        })
     })

     const csv = parser.parse(json);

     res.header('Content-Type', 'text/csv');
     res.attachment('orders.csv');
     res.send(csv);
}