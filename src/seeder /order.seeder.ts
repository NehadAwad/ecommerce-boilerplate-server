import { randomInt } from "crypto";
import { AppDataSource } from "../core/database-config";
import { Order } from "../entity/order.entity";
import { faker } from '@faker-js/faker';
import { OrderItem } from "../entity/order-item.entity";

AppDataSource.initialize()
    .then(async connection => {
        for(let i=0; i < 30; i++) {
            const order = await Order.save({
                first_name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                email: faker.internet.email(),
            });

            for(let j = 0; j< randomInt(1, 5); j++) {
                await OrderItem.save({
                    order,
                    product_title: faker.lorem.words(5),
                    price: randomInt(10, 100),
                    quantity: randomInt(1, 5)
                })
            }
        }
        

        process.exit(0);
    })
    .catch((error) => console.log(error)) 

    // select date_format(o.created_at, '%Y-%m-%d') as date, sum(oi.price * oi.quantity) as sum
    // from admin_ts.order o
    // join admin_ts.order_item oi on o.id = oi.order_id
    // group by date