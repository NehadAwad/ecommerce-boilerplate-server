import { AppDataSource } from "../core/database-config";
import { Product } from "../entity/product.entity";
import { faker } from '@faker-js/faker';

AppDataSource.initialize()
    .then(async connection => {
        for(let i=0; i < 30; i++) {
            await Product.save({
                title: faker.name.firstName(),
                description: faker.lorem.words(20),
                image: faker.image.abstract(200, 200, true),
                price: faker.datatype.float()
            });
        }

        process.exit(0);
    })
    .catch((error) => console.log(error)) 