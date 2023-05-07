import { randomInt } from "crypto";
import { AppDataSource } from "./src/core/database-config";
import { Order } from "./src/entity/order.entity";
import { faker } from '@faker-js/faker';
import { OrderItem } from "./src/entity/order-item.entity";

AppDataSource.initialize()
    .then(async connection => {
        for(let i=0; i < 30; i++) {
            const order = await Order.save({
                // title: faker.name.firstName(),
                // description: faker.lorem.words(20),
                // image: faker.image.abstract(200, 200, true),
                // price: faker.datatype.float()
                first_name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                email: faker.internet.email()
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